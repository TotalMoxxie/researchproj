import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Function to set up the scene
export function sceneSetup() {
  // Create scene and background
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x888888);

  // Add a grid helper
  const gridHelper = new THREE.GridHelper(10, 10); // Size of the grid and spacing
  scene.add(gridHelper);

  // Create camera and camera starting position
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 15);
  camera.add(pointLight);

  const hemlight = new THREE.HemisphereLight(0xff0000, 10);
  scene.add(hemlight);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create geometry, material, and mesh with cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0xff0000,
  }); // Use wireframe material
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Create orbit controls for mouse
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  return { scene, camera, renderer, cube, controls };
}
