// @ts-nocheck
import "./style.css";

import * as THREE from "https://cdn.skypack.dev/pin/three@v0.132.2-dLPTyDAYt6rc6aB18fLm/mode=imports/optimized/three.js";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

// Setting

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(   75,  window.innerWidth / window.innerHeight,  0.1,  1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(12, 3, 200, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x1e2f97 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Animation

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

// Lighting
//pointlight is to light to all direction
const pointLight = new THREE.PointLight(0xffffff);

//move it away from the center
pointLight.position.set(20, 54, 90);

//lightening across all the scenne
const ambientLight = new THREE.AmbientLight(0xffffff);

//add it to the scenne
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(200).fill().forEach(addStar);

// BG

const spaceTexture = new THREE.TextureLoader().load("earth.jpg");
scene.background = spaceTexture;

// Avatar

const marcTexture = new THREE.TextureLoader().load("marcv.png");

const marc = new THREE.Mesh(
  new THREE.BoxGeometry(3.5, 3.5, 3.5),
  new THREE.MeshBasicMaterial({ map: marcTexture })
);

scene.add(marc);

// Moon

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({    map: moonTexture,    normalMap: normalTexture,  }));

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

marc.position.z = -5;
marc.position.x = 2;

// Scrolling Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.005;

  marc.rotation.y += 0.021;
  marc.rotation.z += 0.021;

  camera.position.z = t * 0.000002;
  camera.position.x = t * 0.009;
  camera.rotation.y = t * 0.0005;
}

document.body.onscroll = moveCamera;
moveCamera();


