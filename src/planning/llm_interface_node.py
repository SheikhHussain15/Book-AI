import rclpy
from rclpy.node import Node
from std_msgs.msg import String # Placeholder for command input
from std_msgs.msg import String # Placeholder for action sequence output

class LLMInterfaceNode(Node):
    def __init__(self):
        super().__init__('llm_interface_node')
        self.subscription = self.create_subscription(
            String,
            'natural_language_command',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning
        self.publisher_ = self.create_publisher(String, 'action_sequence', 10)
        self.get_logger().info('LLM Interface Node has been started.')

    def listener_callback(self, msg):
        self.get_logger().info(f'Received command: "{msg.data}"')
        # Placeholder for LLM processing
        if "clean the room" in msg.data.lower():
            action_sequence = "approach_room; detect_objects; pick_up_objects; place_in_bin; repeat;"
        else:
            action_sequence = "unknown_command"
        
        # Publish action sequence
        action_msg = String()
        action_msg.data = action_sequence
        self.publisher_.publish(action_msg)
        self.get_logger().info(f'Publishing action sequence: "{action_msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    llm_interface_node = LLMInterfaceNode()
    rclpy.spin(llm_interface_node)
    llm_interface_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
