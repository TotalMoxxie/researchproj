import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { sceneSetup } from './scenes/scene';
import { setupInputListeners } from './utils/input';
import { loadModel } from './utils/modelLoader';

// Set up scene
const { scene, camera, renderer, cube, controls } = sceneSetup();

// Load model
loadModel(scene, 'carpet_quarter', 'models/', 'models/');
// Add more loadModel calls as needed

// Set up input listeners
setupInputListeners(cube, camera);

// Add stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// Animate scene
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
