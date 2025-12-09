import unittest
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from planning.enhanced_llm_interface_node import EnhancedLLMInterfaceNode

class TestEnhancedLLMInterfaceNode(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        rclpy.init()

    @classmethod
    def tearDownClass(cls):
        rclpy.shutdown()

    def setUp(self):
        self.node = EnhancedLLMInterfaceNode()

    def tearDown(self):
        self.node.destroy_node()

    def test_node_creation(self):
        self.assertIsNotNone(self.node)
        self.assertEqual(self.node.get_name(), 'enhanced_llm_interface_node')
        # Add more sophisticated tests here once ROS 2 environment is available
        # e.g., check if publishers/subscribers are correctly created

if __name__ == '__main__':
    unittest.main()
