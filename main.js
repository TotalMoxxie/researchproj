import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { sceneSetup } from './scenes/scene';
import { setupInputListeners } from './utils/input';
import { loadModel } from './utils/modelLoader';
import { fbxloadModel } from './utils/fbxModelLoader';
import { BasicCharacterController } from './utils/BasicCharacterController.js';
import { BasicCharacterControllerInput } from './utils/BasicCharacterControllerInput.js';
import { FiniteStateMachine } from './utils/FiniteStateMachine.js';
import { CharacterFSM } from './utils/CharacterFSM.js';
import { State } from './utils/State.js';

const clock = new THREE.Clock();
let mixer;

// Set up scene
const { scene, camera, renderer, cube, controls } = sceneSetup();

// Load OBJ model
//loadModel(scene, 'carpet_quarter', 'models/', 'models/', null);
loadModel(scene, 'cave design 1', 'models/', 'models/', null, 2);

// Load FBX model
fbxloadModel(scene, 'Bboy Hip Hop Move','models/', 0.01);

// Add more loadModel calls as needed

// Set up input listeners
setupInputListeners(cube, camera);

// Add stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// Animate scene
function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();

    if (mixer) mixer.update(delta);
    controls.update();
    renderer.render(scene, camera);
    stats.update();
}
animate();
