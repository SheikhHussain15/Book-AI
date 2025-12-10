# Chapter 10: Capstone Phase 1: Building the Butler in Simulation

Congratulations! You've traversed the landscapes of ROS 2, explored advanced simulators, built vision systems, integrated VLA models, and even given your robot the power of conversation. Now, all that knowledge culminates in our capstone project: the **Autonomous Humanoid Butler**.

This chapter is the first of a two-part capstone. Our goal here is ambitious: **By the end of this chapter, you will have a simulated humanoid robot that can understand and execute spoken commands within a virtual apartment, entirely within NVIDIA Isaac Sim.**

We will design an environment, develop modular "Agent Skills," and use Behavior Trees to orchestrate these skills into intelligent, goal-driven behaviors.

## Project Vision: The Intelligent Home Assistant

Imagine a humanoid robot that can:
*   Navigate to specific rooms in an apartment.
*   Find and identify objects.
*   Pick up objects.
*   Respond to your commands in natural language.
*   Perform sequences of actions to fulfill complex requests.

This chapter will build the complete software stack for this butler in the safe, powerful environment of Isaac Sim.

## 1. Environment Design in NVIDIA Isaac Sim

Our butler needs a home. We will create a simple, yet functional, virtual apartment in Isaac Sim.

1.  **Setting up the Scene**: Use Isaac Sim's USD stage editor to create walls, a floor, and basic lighting.
2.  **Adding Furniture**: Place essential items like a `kitchen_table`, a `sofa`, and a `bookshelf` in designated `room_locations`.
3.  **Populating with Objects**: Place objects that the robot will interact with, such as a `key_set`, a `water_bottle`, and a `remote_control`. These objects should have semantic labels (e.g., `object_type: water_bottle`) for our perception system.

*(Screenshot: The designed virtual apartment in Isaac Sim with furniture and target objects.)*

## 2. Developing Agent Skills

Central to our butler's design is the concept of **Agent Skills**. These are modular, reusable pieces of functionality that abstract away the low-level robotics details. Each skill will have a clear input and output, allowing them to be easily composed. We'll implement each as a ROS 2 Action Server.

### `Skill_NavigateTo(room)`

*   **Description**: Moves the robot to a specified room or location.
*   **Implementation**: Utilizes ROS 2 navigation stack (Nav2) with a pre-built map of the apartment. The Action Server takes the `room_name` (e.g., "kitchen") as a goal and publishes navigation commands.
*   **ROS Interface**: `robot_skills/action/NavigateTo`

### `Skill_ScanFor(object)`

*   **Description**: Commands the robot to visually search for a specified object in its current location.
*   **Implementation**: The Action Server takes `object_name` (e.g., "water_bottle") as a goal. It triggers the perception node (Chapter 6) and guides the robot's head/torso to scan the environment. Returns the `pose` of the detected object.
*   **ROS Interface**: `robot_skills/action/ScanFor`

### `Skill_PickUp(object_pose)`

*   **Description**: Commands the robot to approach and grasp an object at a given pose.
*   **Implementation**: Takes the `object_pose` (from `Skill_ScanFor`) as a goal. Uses inverse kinematics to calculate joint trajectories for the arm and commands the gripper to close.
*   **ROS Interface**: `robot_skills/action/PickUp`

### `Skill_PlaceAt(location)`

*   **Description**: Places a held object at a specified location (e.g., on a table, in a box).
*   **Implementation**: Takes `target_location_pose` as a goal. Plans arm trajectory and opens the gripper.
*   **ROS Interface**: `robot_skills/action/PlaceAt`

### `Skill_Follow(person_id)` (Optional)

*   **Description**: Enables the robot to follow a specified person using vision.
*   **Implementation**: Uses a tracking algorithm and navigation.
*   **ROS Interface**: `robot_skills/action/Follow`

*(Code Snippet: A simplified Python code showing the `Skill_NavigateTo` Action Server structure.)*

## 3. Orchestration with Behavior Trees

With our Agent Skills defined, we need a way to combine them into complex, robust behaviors. **Behavior Trees** (`BehaviorTree.CPP`) are a powerful tool for this. They allow us to visually and logically define sequences, conditions, and fallback behaviors, making task planning intuitive and robust.

### Behavior Tree Basics (`BehaviorTree.CPP`)

*   **Nodes**: Selector (`?`), Sequence (`->`), Parallel (`=>`), Condition (`[]`), Action (`<>`).
*   **Execution**: From left to right, top to bottom.
*   **States**: Success, Failure, Running.

### Example: "Find My Keys and Bring Them to Me"

Let's design a Behavior Tree for a common request.

```xml
<!-- simple_butler_bt.xml -->
<root BTCPP_format="4">
  <BehaviorTree Name="ButlerTask">
    <Sequence>
      <Action ID="SayHello"          server_name="conversation_server" goal="{user_command}"/>
      <Action ID="NavigateToRoom"    room="living_room" />
      <Action ID="ScanForObject"     object="key_set"   detected_pose="{keys_pose}"/>
      <Condition ID="IsObjectFound"  pose="{keys_pose}"/>
      <Sequence>
        <Action ID="PickUpObject"    pose="{keys_pose}"/>
        <Action ID="NavigateToRoom"    room="user_location"/>
        <Action ID="PlaceAtLocation" location="user_hand"/>
      </Sequence>
      <Fallback>
        <Action ID="SayTaskComplete" server_name="conversation_server" message="Here are your keys."/>
        <Action ID="SayNotFound"     server_name="conversation_server" message="Sorry, I couldn't find your keys."/>
      </Fallback>
    </Sequence>
  </BehaviorTree>
</root>
```

This XML snippet shows how `BehaviorTree.CPP` defines the logic:
1.  Say hello (using the conversational system from Ch 8).
2.  Navigate to the living room.
3.  Scan for the key set (using the perception/VLA from Ch 6/7).
4.  If found, pick up the keys and bring them to the user.
5.  If not found, report failure.

## 4. Integration: All Chapters Come Together

This capstone pulls from every previous chapter:
*   **Isaac Sim (Ch 5)**: Provides the realistic environment and physics.
*   **ROS 2 (Ch 2)**: The communication backbone.
*   **Perception (Ch 6)**: `Skill_ScanFor` relies on it.
*   **VLA Models (Ch 7)**: The underlying intelligence for understanding `ScanFor` or `PickUp` goals.
*   **Conversational Robotics (Ch 8)**: The user interface.
*   **`ros2_control` (Ch 3)**: For low-level joint control of the humanoid.

By orchestrating these components with Behavior Trees, we achieve a level of autonomy that goes far beyond simple teleoperation. Your simulated butler is now capable of intelligent, goal-driven behavior.

This concludes the first phase of our capstone. Your humanoid now has a mind, the ability to see, understand, and plan actions in a rich simulated environment. In the next chapter, we face the ultimate challenge: bringing this intelligent agent to life on a real, physical robot.