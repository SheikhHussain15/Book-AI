# Chapter 3: Simulating Humanoids in Gazebo

In the previous chapter, we learned the language of ROS 2. Now, we'll give our ROS 2 system a body and a world to live in. Welcome to Gazebo, the workhorse of the ROS ecosystem and your first step into robotics simulation.

Gazebo is a 3D rigid-body dynamics simulator. In simpler terms, it's a virtual world with a physics engine where we can build, test, and interact with our robots as if they were real. It's not as visually fancy as a modern video game, but it is deeply integrated with ROS and provides a robust platform for testing control algorithms and sensor integrations.

*(Screenshot: A picture of the Gazebo interface with a simple robot in an empty world.)*

## URDF: Describing Your Robot's Body

To put a robot in Gazebo, we first need to describe it. The standard format for this in ROS is the **Unified Robot Description Format (URDF)**. An URDF file is an XML file that describes the robot's physical structure as a tree of **links** (the rigid parts) and **joints** (the connections between links).

Let's create a very simple "humanoid": a torso with a single arm that can rotate.

Create a new package for our robot description:
`ros2 pkg create --build-type ament_cmake simple_humanoid_description`

Inside `simple_humanoid_description`, create a `urdf` directory and a file named `single_arm_humanoid.urdf`:

```xml
<!-- simple_humanoid_description/urdf/single_arm_humanoid.urdf -->
<robot name="single_arm_humanoid">
  <link name="torso">
    <visual>
      <geometry>
        <box size="0.4 0.2 0.8"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.4 0.2 0.8"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="10"/>
      <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
    </inertial>
  </link>

  <link name="arm">
    <visual>
      <geometry>
        <cylinder length="0.5" radius="0.05"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.5" radius="0.05"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1"/>
      <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
    </inertial>
  </link>

  <joint name="shoulder_joint" type="revolute">
    <parent link="torso"/>
    <child link="arm"/>
    <origin xyz="0 0.2 0.3" rpy="0 0 0"/>
    <axis xyz="1 0 0"/>
    <limit effort="100" lower="-1.57" upper="1.57" velocity="1.0"/>
  </joint>
</robot>
```

**Note on SDF**: You may also encounter the **Simulation Description Format (SDF)**. SDF is Gazebo's native format and is more powerful than URDF (it can describe entire worlds, not just robots). ROS tools, however, primarily work with URDF. Often, the URDF is converted to SDF internally by Gazebo.

## `ros2_control`: The Universal Controller

How do we command the `shoulder_joint` we just defined? We use `ros2_control`. This is a critical framework that provides a hardware abstraction layer for your robot. You write your high-level control code once, and the `ros2_control` framework handles the specifics of whether it's talking to a real motor or a simulated joint.

To use it with Gazebo, we need to add a special Gazebo plugin to our URDF. This plugin tells Gazebo that our robot's joints will be managed by `ros2_control`.

## Spawning and Controlling the Humanoid

Putting it all together involves a few moving parts:

1.  **A Launch File**: This will start Gazebo, load our URDF, and spawn the robot model into the simulation.
2.  **Controller Configuration (YAML)**: A YAML file that defines which controllers to use for which joints.
3.  **Spawning the Controller**: A node that loads the controllers defined in the YAML file and connects them to the robot's joints.

Here is an example of what a controller configuration file looks like. Let's call it `simple_controllers.yaml`:

```yaml
controller_manager:
  ros__parameters:
    update_rate: 100

    joint_state_broadcaster:
      type: joint_state_broadcaster/JointStateBroadcaster

    joint_trajectory_controller:
      type: joint_trajectory_controller/JointTrajectoryController

joint_trajectory_controller:
  ros__parameters:
    joints:
      - shoulder_joint
    command_interfaces:
      - position
    state_interfaces:
      - position
      - velocity
```

This configuration sets up two standard controllers:
*   `joint_state_broadcaster`: This reads the state of all joints (position, velocity) and publishes them on the `/joint_states` topic.
*   `joint_trajectory_controller`: This provides a ROS 2 Action interface to command one or more joints to follow a trajectory.

Now, we can write a launch file that starts Gazebo, loads our robot, and starts these controllers.

*(Screenshot: A picture of `rviz2` showing the humanoid model. A separate window shows a terminal with a command to send a joint goal.)*

With everything running, you can now send a command to the arm!

```bash
# Send a goal to the joint trajectory controller to move the shoulder_joint to 1.0 radian
ros2 action send_goal /joint_trajectory_controller trajectory_msgs/action/FollowJointTrajectory '{trajectory: {joint_names: ["shoulder_joint"], points: [{positions: [1.0], time_from_start: {sec: 2}}]}}'
```

You should see the arm of your simple humanoid move in Gazebo!

## Reading Sensor Data

Let's add an IMU (Inertial Measurement Unit) sensor to our robot's torso to measure its orientation. We add this to the URDF using a special Gazebo sensor plugin.

```xml
<!-- Add this inside the <robot> tag in your URDF -->
<gazebo reference="torso">
  <sensor name="imu_sensor" type="imu">
    <always_on>true</always_on>
    <update_rate>100</update_rate>
    <plugin name="gazebo_ros_imu_sensor" filename="libgazebo_ros_imu_sensor.so">
      <ros>
        <namespace>/demo</namespace>
        <remapping>~/out:=imu</remapping>
      </ros>
    </plugin>
  </sensor>
</gazebo>
```

After relaunching the simulation, you can now "listen" to the IMU data on a ROS 2 topic:

```bash
ros2 topic echo /demo/imu
```

This chapter was a major step. You have learned how to describe a robot, place it in a simulated world, and control its joints using standard ROS 2 interfaces. You've bridged the gap between pure software and a "physical" (albeit simulated) entity. In the next chapters, we will explore more advanced simulators that allow for even greater realism.