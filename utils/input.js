// Object to store pressed keys
const keys = {};

// Function to set up key event listeners
export function setupInputListeners(cube, camera) {
  document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
  });

  document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
  });

  // Mouse wheel event listener
  document.addEventListener("wheel", (event) => {
    // Adjust camera position based on scroll delta
    camera.position.z += event.deltaY * 0.1;
  });

  // This animates the scene for the keypresses
  function animate() {
    requestAnimationFrame(animate);

    // Move cube left or right based on pressed keys
    const moveDistance = 1; // Distance to move the cube
    const moveSpeed = 0.25; // Speed of movement

    if (keys["ArrowLeft"]) {
      cube.position.x -= moveDistance * moveSpeed;
    }
    if (keys["ArrowRight"]) {
      cube.position.x += moveDistance * moveSpeed;
    }
  }

  animate();
}
