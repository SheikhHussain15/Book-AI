# Chapter 2: Fundamentals of ROS 2

Welcome to the engine room. In the last chapter, we saw the high-level map of our "Mind-in-Motion" stack. Now, we get our hands dirty by learning the most critical piece of that stack: the Robot Operating System (ROS 2).

ROS 2 is the nervous system of our robot. It's a flexible framework for writing robotics software, handling everything from low-level device control to high-level task coordination. This chapter is hands-on; you will write code, run commands, and build a foundational understanding of the entire ROS 2 ecosystem.

## Setting Up Your Workspace

Before we can write code, we need a place to put it. In ROS 2, this is called a **workspace**.

1.  Create a directory for your workspace:
    ```bash
    mkdir -p ros2_ws/src
    cd ros2_ws
    ```
2.  Build the workspace (even though it's empty):
    ```bash
    colcon build
    ```
3.  Source the workspace: Every time you open a new terminal, you need to "source" your workspace to make its packages available.
    ```bash
    source install/setup.bash
    ```

## The Core Concepts: A "Weather Bot" Example

The best way to learn ROS 2 is to build something. We will create a simple "Weather Bot" with two parts: a sensor that publishes the temperature, and a monitor that subscribes to that temperature and displays it.

### 1. Nodes: The Building Blocks

A **Node** is the fundamental unit of computation in ROS 2. Think of it as a single-purpose program in a larger system. Our Weather Bot will have two nodes: a `sensor_node` and a `monitor_node`.

### 2. Topics: The Mailing List

**Topics** are named buses over which nodes exchange messages. They work like a public mailing list. A node can **publish** messages to a topic, and any node that **subscribes** to that topic will receive those messages.

Our `sensor_node` will publish the temperature to a `/temperature` topic. Our `monitor_node` will subscribe to it.

### 3. Messages: The Data Format

A **Message** is the data structure that is sent on a topic. ROS 2 provides many standard message types, and you can create your own. For our `/temperature` topic, we'll use the standard `sensor_msgs/msg/Temperature` message.

### Creating the "Weather Bot" Package

First, let's create a package inside our workspace to hold our code.

```bash
cd src
ros2 pkg create --build-type ament_python weather_bot_py
```

This creates a Python package. Now let's create the nodes.

#### The Sensor Node (Python Publisher)

Inside `weather_bot_py/weather_bot_py`, create a file named `sensor_node.py`:

```python
# weather_bot_py/weather_bot_py/sensor_node.py
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Temperature
import random

class SensorNode(Node):
    def __init__(self):
        super().__init__('sensor_node')
        self.publisher_ = self.create_publisher(Temperature, 'temperature', 10)
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.get_logger().info('Temperature Sensor Node has started.')

    def timer_callback(self):
        msg = Temperature()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.temperature = random.uniform(15.0, 25.0) # Simulate temperature in Celsius
        msg.variance = 0.1
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: {msg.temperature:.2f} C')

def main(args=None):
    rclpy.init(args=args)
    node = SensorNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

#### The Monitor Node (Python Subscriber)

In the same directory, create `monitor_node.py`:

```python
# weather_bot_py/weather_bot_py/monitor_node.py
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Temperature

class MonitorNode(Node):
    def __init__(self):
        super().__init__('monitor_node')
        self.subscription = self.create_subscription(
            Temperature,
            'temperature',
            self.listener_callback,
            10)
        self.get_logger().info('Temperature Monitor Node has started.')

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: {msg.temperature:.2f} C')

def main(args=None):
    rclpy.init(args=args)
    node = MonitorNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

You'll also need to update `setup.py` to make these nodes runnable.

### Building and Running

Go to the root of your workspace (`ros2_ws`) and run `colcon build`. Then source the workspace again.

Now, open two terminals. In both, source your workspace.

In Terminal 1, run the sensor:
`ros2 run weather_bot_py sensor_node`

In Terminal 2, run the monitor:
`ros2 run weather_bot_py monitor_node`

You should see the sensor publishing temperatures and the monitor receiving them!

### 4. Services: The Remote Procedure Call

**Services** are for request-response communication. A **Service Server** node offers a service, and a **Service Client** node can call it. Unlike topics, services are synchronous—the client waits for the server to respond.

Let's add a service to our Weather Bot that lets us reset the sensor's "calibration."

### 5. Actions: The Long-Running Task

**Actions** are for long-running, feedback-producing tasks. Think of telling a robot to "navigate to the kitchen." You want to know its progress along the way and be able to cancel the goal. Actions have three parts: a goal, feedback, and a result.

## The ROS 2 Transform System (tf2)

Robots are all about coordinate frames. Where is the hand relative to the arm? Where is the arm relative to the body? Where is the robot relative to the world?

**tf2** is the system that manages all these coordinate frames. A node can **broadcast** a transform (e.g., "my hand is here, relative to my arm"), and any other node can **listen** for that transform to find out the relationship between any two frames. We will use `rviz2`, the primary ROS 2 visualizer, to see these transforms in 3D.

## Debugging Tools

*   **`ros2` CLI**: Your primary tool. Use `ros2 node list`, `ros2 topic list`, `ros2 topic echo /temperature`, etc., to inspect the system.
*   **`rqt_graph`**: A GUI tool that shows you the node and topic graph. In a new terminal, run `rqt_graph`. You'll see your two nodes and the `/temperature` topic connecting them.
*   **`rviz2`**: A powerful 3D visualizer. We will use this extensively to visualize robot models, sensor data, and transforms.

## The `launch` System

Running each node in a separate terminal is tedious. **Launch files** are Python scripts that let you start and configure a whole system of nodes at once.

Here's a simple launch file to start our Weather Bot:

```python
# weather_bot_py/launch/weather_bot.launch.py
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='weather_bot_py',
            executable='sensor_node',
            name='my_sensor'
        ),
        Node(
            package='weather_bot_py',
            executable='monitor_node',
            name='my_monitor'
        ),
    ])
```

You can now run this with `ros2 launch weather_bot_py weather_bot.launch.py` to start both nodes.

This chapter has been a whirlwind tour of ROS 2's fundamental concepts. Don't worry if it's not all crystal clear yet. In the coming chapters, we will use these tools again and again, and they will become second nature.