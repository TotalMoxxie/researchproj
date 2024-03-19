import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// Function to load an FBX model with scaling and animation
export function fbxloadModel(scene, modelName, modelPath, scale = 1) {
    const onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log(percentComplete.toFixed(2) + '% downloaded');
        }
    };

    new FBXLoader()
        .setPath(modelPath)
        .load(`${modelName}.fbx`, function (object) {
            object.scale.set(scale, scale, scale); // Apply scaling
            
            // Check if there are animations
            //if (object.animations.length > 0) {
                const mixer = new THREE.AnimationMixer(object);
                const action = mixer.clipAction(object.animations[0]);
                action.play();
            //}

            scene.add(object);
        }, onProgress);
}

