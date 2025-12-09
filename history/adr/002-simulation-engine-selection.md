# ADR 002: Simulation Engine Selection

**Status**: Proposed

**Context**: The project requires a simulation environment for the embodied AI system. The choice of simulation engine impacts realism, integration with ROS 2, and available tools for perception and physics.

**Decision**: A specific simulation engine needs to be selected.

**Options**:
- Gazebo
- NVIDIA Isaac Sim

**Consequences**: Gazebo is open-source and widely used in the ROS community, offering good general physics. NVIDIA Isaac Sim offers photorealism, RTX rendering, and tighter integration with Isaac ROS for accelerated perception, but may have a steeper learning curve and higher resource demands. The spec explicitly mentions Isaac Sim, so a rationale for this preference or an alternative choice is needed.
