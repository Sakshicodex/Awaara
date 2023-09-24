// src/landmarkRecognition.js
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

let model;

export async function loadLandmarkRecognitionModel() {
  model = await mobilenet.load();
}

export async function predictLandmark(imageElement) {
  const img = tf.browser.fromPixels(imageElement);
  const logits = model.infer(img);
  const classes = await model.getTopKClasses(logits, 1);
  return classes[0].className;
}
