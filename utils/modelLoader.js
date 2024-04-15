import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

// Function to load a model
export function loadModel(
  scene,
  modelName,
  modelPath,
  materialPath,
  mixer,
  scale = 1,
) {
  const onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(percentComplete.toFixed(2) + "% downloaded");
    }
  };

  new MTLLoader()
    .setPath(materialPath)
    .load(`${modelName}.mtl`, function (materials) {
      materials.preload();
      new OBJLoader()
        .setMaterials(materials)
        .setPath(modelPath)
        .load(
          `${modelName}.obj`,
          function (object) {
            object.scale.set(scale, scale, scale); // Apply scaling
            if (mixer) {
              mixer = new THREE.AnimationMixer(object);
              const action = mixer.clipAction(object.animations[0]);
              action.play();
            }
            scene.add(object);
          },
          onProgress,
        );
    });
}
