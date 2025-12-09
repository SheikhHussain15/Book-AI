# ADR 001: Robot Model Selection

**Status**: Proposed

**Context**: The project requires a robotic model for simulation. The choice of model affects the complexity of the kinematics, control systems, and the overall relevance to the "humanoid robotics" theme.

**Decision**: A specific robot model needs to be selected.

**Options**:
- Unitree Go2 (Quadruped Proxy)
- Unitree G1 (Miniature Humanoid)

**Consequences**: The decision will dictate the focus of the control and manipulation tasks. A humanoid model is more complex but more aligned with the project's title. A quadruped is simpler and more robust for basic locomotion.
