import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x888888); // Set grey background

// Add a grid helper
const gridHelper = new THREE.GridHelper(10, 10); // Size of the grid and spacing
scene.add(gridHelper);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xff0000 }); // Use wireframe material
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const moveDistance = 1; // Distance to move the cube
const moveSpeed = 0.25; // Speed of movement

const keys = {}; // Object to store pressed keys

document.addEventListener('keydown', event => {
  keys[event.key] = true;
});

document.addEventListener('keyup', event => {
  keys[event.key] = false;
});

function animate() {
  requestAnimationFrame(animate);

  // Move cube left or right based on pressed keys
  if (keys['ArrowLeft']) {
    cube.position.x -= moveDistance * moveSpeed;
  }
  if (keys['ArrowRight']) {
    cube.position.x += moveDistance * moveSpeed;
  }

  renderer.render(scene, camera);
}

animate();
