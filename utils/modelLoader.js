import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

// Function to load model
export function loadModel(scene) {
    const onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log(percentComplete.toFixed(2) + '% downloaded');
        }
    };

    new MTLLoader()
        .setPath('models/')
        .load('carpet_quarter.mtl', function (materials) {
            materials.preload();
            new OBJLoader()
                .setMaterials(materials)
                .setPath('models/')
                .load('carpet_quarter.obj', function (object) {
                    scene.add(object);
                }, onProgress);
        });
}
