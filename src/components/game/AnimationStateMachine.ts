// 8-Directional Animation State Machine with Smooth Weight Blending
export type MovementDirection8Way = 
  | 'NONE'
  | 'FORWARD'
  | 'FORWARD_LEFT'
  | 'FORWARD_RIGHT'
  | 'BACKWARD'
  | 'BACKWARD_LEFT'
  | 'BACKWARD_RIGHT'
  | 'LEFT'
  | 'RIGHT';

export type CharacterActionState =
  | 'IDLE'
  | 'WALK_FORWARD'
  | 'WALK_BACKWARD'
  | 'WALK_LEFT'
  | 'WALK_RIGHT'
  | 'WALK_DIAGONAL'
  | 'RUN'
  | 'STOP'
  | 'TURN'
  | 'INTERACTION';

export interface StateWeights {
  idle: number;
  walkForward: number;
  walkBackward: number;
  walkLeft: number;
  walkRight: number;
  walkDiagonal: number;
  run: number;
  stop: number;
  turn: number;
  interaction: number;
}

export interface InputState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  run: boolean;
  interact: boolean;
}

export class AnimationStateMachine {
  public currentState: CharacterActionState = 'IDLE';
  public currentDirection: MovementDirection8Way = 'NONE';
  public currentSpeed: number = 0; // m/s
  public targetSpeed: number = 0;
  public facingAngle: number = 0; // Target yaw in radians
  public currentAngle: number = 0; // Current yaw in radians
  public bankAngle: number = 0; // Lean/roll into turns in radians
  public isInteracting: boolean = false;
  public interactionTimer: number = 0;

  // Animation Blending Weights (all 0 to 1, smoothly interpolated)
  public weights: StateWeights = {
    idle: 1.0,
    walkForward: 0.0,
    walkBackward: 0.0,
    walkLeft: 0.0,
    walkRight: 0.0,
    walkDiagonal: 0.0,
    run: 0.0,
    stop: 0.0,
    turn: 0.0,
    interaction: 0.0,
  };

  // Cadence timing for footsteps
  public walkCycle: number = 0;
  public lastStepSide: 'LEFT' | 'RIGHT' | null = null;
  public onFootstep?: (side: 'LEFT' | 'RIGHT', positionOffset: number) => void;

  // Constants
  private readonly WALK_SPEED = 3.2; // m/s
  private readonly RUN_SPEED = 6.8; // m/s
  private readonly ACCELERATION = 14.0; // m/s²
  private readonly DECELERATION = 18.0; // m/s²
  private readonly ROTATION_SPEED = 11.0; // rad/s
  private readonly BLEND_SPEED = 10.0; // 1/s

  constructor(initialAngle: number = 0) {
    this.currentAngle = initialAngle;
    this.facingAngle = initialAngle;
  }

  // Determine 8-directional movement vector from inputs
  public compute8WayDirection(input: InputState): { direction: MovementDirection8Way; angleOffset: number; hasInput: boolean } {
    const f = input.forward;
    const b = input.backward;
    const l = input.left;
    const r = input.right;

    // Diagonal combinations
    if (f && l && !b && !r) return { direction: 'FORWARD_LEFT', angleOffset: -Math.PI / 4, hasInput: true };
    if (f && r && !b && !l) return { direction: 'FORWARD_RIGHT', angleOffset: Math.PI / 4, hasInput: true };
    if (b && l && !f && !r) return { direction: 'BACKWARD_LEFT', angleOffset: -Math.PI * 0.75, hasInput: true };
    if (b && r && !f && !l) return { direction: 'BACKWARD_RIGHT', angleOffset: Math.PI * 0.75, hasInput: true };

    // Cardinal directions
    if (f && !b) return { direction: 'FORWARD', angleOffset: 0, hasInput: true };
    if (b && !f) return { direction: 'BACKWARD', angleOffset: Math.PI, hasInput: true };
    if (l && !r) return { direction: 'LEFT', angleOffset: -Math.PI / 2, hasInput: true };
    if (r && !l) return { direction: 'RIGHT', angleOffset: Math.PI / 2, hasInput: true };

    return { direction: 'NONE', angleOffset: 0, hasInput: false };
  }

  // Update loop called every frame with delta time in seconds
  public update(delta: number, input: InputState, cameraYaw: number = 0) {
    delta = Math.min(delta, 0.1); // Clamp against large lag spikes

    // Handle Interaction State
    if (input.interact && !this.isInteracting) {
      this.isInteracting = true;
      this.interactionTimer = 1.4; // 1.4s interaction animation
    }

    if (this.isInteracting) {
      this.interactionTimer -= delta;
      if (this.interactionTimer <= 0) {
        this.isInteracting = false;
      }
    }

    const { direction, angleOffset, hasInput } = this.compute8WayDirection(input);
    this.currentDirection = direction;

    // Target Speed based on movement and sprint
    if (this.isInteracting) {
      this.targetSpeed = 0;
    } else if (hasInput) {
      this.targetSpeed = input.run ? this.RUN_SPEED : this.WALK_SPEED;
    } else {
      this.targetSpeed = 0;
    }

    // Smooth Velocity with Acceleration / Deceleration
    const rate = this.targetSpeed > this.currentSpeed ? this.ACCELERATION : this.DECELERATION;
    this.currentSpeed += (this.targetSpeed - this.currentSpeed) * Math.min(1, rate * delta);
    if (Math.abs(this.currentSpeed) < 0.05) this.currentSpeed = 0;

    // Determine target facing angle relative to camera orientation
    if (hasInput && !this.isInteracting) {
      this.facingAngle = cameraYaw + angleOffset;
    }

    // Smooth shortest-path angular slerp (rotation towards movement direction)
    const angleDiff = this.normalizeAngle(this.facingAngle - this.currentAngle);
    const angularSpeed = this.ROTATION_SPEED * Math.min(1, delta * 9);
    this.currentAngle += angleDiff * Math.min(1, angularSpeed);
    this.currentAngle = this.normalizeAngle(this.currentAngle);

    // Dynamic Banking (lean into sharp turns like a AAA game)
    const targetBank = hasInput ? -Math.max(-0.15, Math.min(0.15, angleDiff * 0.35)) : 0;
    this.bankAngle += (targetBank - this.bankAngle) * Math.min(1, delta * 8.0);

    // Determine Animation State
    let targetState: CharacterActionState = 'IDLE';

    if (this.isInteracting) {
      targetState = 'INTERACTION';
    } else if (this.currentSpeed > 0.15) {
      const isRunning = this.currentSpeed > this.WALK_SPEED * 1.15;
      const isTurningSharply = Math.abs(angleDiff) > 0.85 && this.currentSpeed < this.WALK_SPEED * 0.8;

      if (isTurningSharply) {
        targetState = 'TURN';
      } else if (isRunning) {
        targetState = 'RUN';
      } else {
        switch (direction) {
          case 'FORWARD':
            targetState = 'WALK_FORWARD';
            break;
          case 'BACKWARD':
            targetState = 'WALK_BACKWARD';
            break;
          case 'LEFT':
            targetState = 'WALK_LEFT';
            break;
          case 'RIGHT':
            targetState = 'WALK_RIGHT';
            break;
          case 'FORWARD_LEFT':
          case 'FORWARD_RIGHT':
          case 'BACKWARD_LEFT':
          case 'BACKWARD_RIGHT':
            targetState = 'WALK_DIAGONAL';
            break;
          default:
            targetState = 'WALK_FORWARD';
        }
      }
    } else if (this.currentSpeed > 0 && !hasInput) {
      targetState = 'STOP';
    } else if (Math.abs(angleDiff) > 0.4 && !hasInput) {
      targetState = 'TURN';
    } else {
      targetState = 'IDLE';
    }

    this.currentState = targetState;

    // Smooth Animation Weight Crossfading
    this.blendWeights(delta, targetState);

    // Update Walk Kinematics & Footstep Triggers
    if (this.currentSpeed > 0.2) {
      const stepFrequency = this.currentSpeed > this.WALK_SPEED ? 11.5 : 7.2;
      this.walkCycle += delta * stepFrequency;

      const stepSine = Math.sin(this.walkCycle);
      if (stepSine > 0.9 && this.lastStepSide !== 'LEFT') {
        this.lastStepSide = 'LEFT';
        if (this.onFootstep) this.onFootstep('LEFT', -0.18);
      } else if (stepSine < -0.9 && this.lastStepSide !== 'RIGHT') {
        this.lastStepSide = 'RIGHT';
        if (this.onFootstep) this.onFootstep('RIGHT', 0.18);
      }
    } else {
      // Settle walk cycle gradually to avoid awkward mid-stride stops
      this.walkCycle = this.walkCycle % (Math.PI * 2);
    }
  }

  // Smoothly blend weights towards the active target state
  private blendWeights(delta: number, targetState: CharacterActionState) {
    const blendRate = this.BLEND_SPEED * delta;
    const targetWeights: StateWeights = {
      idle: targetState === 'IDLE' ? 1 : 0,
      walkForward: targetState === 'WALK_FORWARD' ? 1 : 0,
      walkBackward: targetState === 'WALK_BACKWARD' ? 1 : 0,
      walkLeft: targetState === 'WALK_LEFT' ? 1 : 0,
      walkRight: targetState === 'WALK_RIGHT' ? 1 : 0,
      walkDiagonal: targetState === 'WALK_DIAGONAL' ? 1 : 0,
      run: targetState === 'RUN' ? 1 : 0,
      stop: targetState === 'STOP' ? 1 : 0,
      turn: targetState === 'TURN' ? 1 : 0,
      interaction: targetState === 'INTERACTION' ? 1 : 0,
    };

    (Object.keys(this.weights) as Array<keyof StateWeights>).forEach((key) => {
      this.weights[key] += (targetWeights[key] - this.weights[key]) * Math.min(1, blendRate);
    });

    // Normalize weights to sum to 1.0
    const total = Object.values(this.weights).reduce((a, b) => a + b, 0);
    if (total > 0.001) {
      (Object.keys(this.weights) as Array<keyof StateWeights>).forEach((key) => {
        this.weights[key] /= total;
      });
    }
  }

  // Normalize angle to [-PI, PI] range
  private normalizeAngle(angle: number): number {
    while (angle > Math.PI) angle -= Math.PI * 2;
    while (angle < -Math.PI) angle += Math.PI * 2;
    return angle;
  }
}
