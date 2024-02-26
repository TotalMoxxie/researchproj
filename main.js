import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import Stats from 'three/examples/jsm/libs/stats.module'

//Creates scene and background
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x888888);

// Add a grid helper
const gridHelper = new THREE.GridHelper(10, 10); // Size of the grid and spacing
scene.add(gridHelper);

//Creates camera and camera starting position
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const light = new THREE.PointLight(0xffffff, 1000)
light.position.set(2.5, 7.5, 15)
scene.add(light)

//Creates a WebGL1 Renderer
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Creates geometry,material and then meshes with cube and then adds cube to scene.
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xff0000 }); // Use wireframe material
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//Setting up some constants for a custom shape
const x = 0, y = 0;
const width = 10;
const height = 6;
//Custome shape lines
const rectangleShape = new THREE.Shape();
rectangleShape.moveTo(x, y);
rectangleShape.lineTo(x + width, y);
rectangleShape.lineTo(x + width, y + height);
rectangleShape.lineTo(x, y + height);
rectangleShape.lineTo(x, y);
//creates geometry, material of rectangle, adds to rectangle and then adds to scene
const rect_geometry = new THREE.ShapeGeometry(rectangleShape);
const rect_material = new THREE.MeshBasicMaterial({wireframe: true, color: 0x111111 });
const rect_mesh = new THREE.Mesh(rect_geometry, rect_material);
scene.add(rect_mesh);

//creates a loader to load OBJ resources
const objLoader = new OBJLoader()
objLoader.load(
    'models/testbg.obj',
    (object) => {
        // (object.children[0] as THREE.Mesh).material = material
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         (child as THREE.Mesh).material = material
        //     }
        // })
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

//This adds FPS stats in the top left of the dom
const stats = new Stats()
document.body.appendChild(stats.dom)


const moveDistance = 1; // Distance to move the cube
const moveSpeed = 0.25; // Speed of movement

const keys = {}; // Object to store pressed keys

document.addEventListener('keydown', event => {
  keys[event.key] = true;
});

document.addEventListener('keyup', event => {
  keys[event.key] = false;
});

// Mouse wheel event listener
document.addEventListener('wheel', event => {
  // Adjust camera position based on scroll delta
  camera.position.z += event.deltaY * 0.1;
});

//Creates orbit controls for mouse
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


//This animates the scene for the keypresses
function animate() {
  requestAnimationFrame(animate);

  // Move cube left or right based on pressed keys
  if (keys['ArrowLeft']) {
    cube.position.x -= moveDistance * moveSpeed;
  }
  if (keys['ArrowRight']) {
    cube.position.x += moveDistance * moveSpeed;
  }

  controls.update();

  renderer.render(scene, camera);
}

animate();
