import unittest
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from planning.enhanced_action_sequence_translator_node import EnhancedActionSequenceTranslatorNode

class TestEnhancedActionSequenceTranslatorNode(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        rclpy.init()

    @classmethod
    def tearDownClass(cls):
        rclpy.shutdown()

    def setUp(self):
        self.node = EnhancedActionSequenceTranslatorNode()

    def tearDown(self):
        self.node.destroy_node()

    def test_node_creation(self):
        self.assertIsNotNone(self.node)
        self.assertEqual(self.node.get_name(), 'enhanced_action_sequence_translator_node')
        # Add more sophisticated tests here once ROS 2 environment is available
        # e.g., check if publishers/subscribers are correctly created

if __name__ == '__main__':
    unittest.main()
