import unittest
import rclpy
from std_msgs.msg import String
import time

class TestCleanRoomVLA(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        rclpy.init()

    @classmethod
    def tearDownClass(cls):
        rclpy.shutdown()

    def setUp(self):
        self.node = rclpy.create_node('test_clean_room_vla')
        self.command_publisher = self.node.create_publisher(String, 'natural_language_command', 10)
        self.feedback_subscriber = self.node.create_subscription(
            String,
            'robot_feedback',
            self.feedback_callback,
            10
        )
        self.feedback_messages = []

    def tearDown(self):
        self.node.destroy_node()

    def feedback_callback(self, msg):
        self.feedback_messages.append(msg.data)

    def test_clean_room_sequence(self):
        # Give the command
        command_msg = String()
        command_msg.data = "Clean the room"
        self.command_publisher.publish(command_msg)
        self.node.get_logger().info(f"Published command: {command_msg.data}")

        # Allow some time for the sequence to execute in the simulated environment
        # In a real integration test, this would involve checking for specific robot states
        # or sensor feedback over time.
        time.sleep(5) 

        # Verify feedback (placeholder for actual validation)
        # For this placeholder, we just check if any feedback was received.
        self.assertGreater(len(self.feedback_messages), 0, "No robot feedback received.")
        self.node.get_logger().info(f"Received feedback: {self.feedback_messages}")

        # Example of a more specific check (if the nodes were fully implemented)
        # self.assertIn("room_cleaned_successfully", self.feedback_messages, "Room cleaning not confirmed.")

if __name__ == '__main__':
    unittest.main()
