from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='perception',
            executable='vslam_object_id_node',
            name='vslam_object_id_node',
            output='screen'
        ),
        Node(
            package='planning',
            executable='llm_interface_node',
            name='llm_interface_node',
            output='screen'
        ),
        Node(
            package='planning',
            executable='action_sequence_translator_node',
            name='action_sequence_translator_node',
            output='screen'
        ),
        Node(
            package='control',
            executable='manipulation_control_node',
            name='manipulation_control_node',
            output='screen'
        )
    ])