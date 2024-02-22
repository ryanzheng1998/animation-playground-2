export const generateCruve = (config: {
  from: number;
  springPosition: number;
  stiffness: number;
  damping: number;
  precision: number;
}) => {
  let answer: number[] = [config.from];

  const animationState = {
    position: config.from,
    velocity: 0,
  };

  while (true) {
    const { position, velocity } = animationState;
    const { springPosition } = config;
    const stiffness = config.stiffness;
    const damping = config.damping;
    const precision = config.precision;
    const timeDelta = 16 / 1000;

    // Cancel animation frame when animation stop
    if (
      velocity < precision &&
      Math.abs(position - springPosition) < precision
    ) {
      answer.push(springPosition);
      break;
    }

    // Prevent non-stop animation
    if (answer.length > 1000) {
      break;
    }

    // Apply spring force
    const springForce = (springPosition - position) * stiffness;
    const dampingForce = -velocity * damping;
    const totalForce = springForce + dampingForce;
    const nextVelocity = velocity + totalForce * timeDelta;
    const nextPosition = position + nextVelocity * timeDelta;

    answer.push(nextPosition);

    animationState.position = nextPosition;
    animationState.velocity = nextVelocity;
  }

  return answer;
};
