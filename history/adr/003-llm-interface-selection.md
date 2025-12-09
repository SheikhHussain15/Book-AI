# ADR 003: LLM Interface Selection

**Status**: Proposed

**Context**: The project requires an interface to integrate Large Language Models (LLMs) for cognitive planning and natural language command processing. The choice of interface affects ease of integration with ROS 2 and overall system architecture.

**Decision**: A specific approach for LLM integration needs to be selected.

**Options**:
- Direct API call for planning (e.g., Python agent)
- Dedicated ROS 2 interface package (e.g., ROS-GPT bridge)

**Consequences**: A direct API call might offer simpler initial prototyping but could lack the robustness and benefits of native ROS 2 communication patterns (topics, services, parameters). A dedicated ROS 2 package would provide better integration with the ROS 2 ecosystem but requires developing and maintaining a custom package. The "ROS 2 Integration" success criteria in the plan leans towards a native ROS 2 approach.
