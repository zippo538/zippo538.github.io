const loader = document.getElementById("catLoader");
const canvasHost = document.getElementById("catCanvas");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(0, 0.15, 7.2);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(240, 240, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x000000, 0);
canvasHost.appendChild(renderer.domElement);

const cat = new THREE.Group();
cat.rotation.x = -0.08;
scene.add(cat);

const purple = new THREE.MeshStandardMaterial({ color: 0x8c7cff, roughness: 0.42, metalness: 0.08 });
const purpleDark = new THREE.MeshStandardMaterial({ color: 0x4f46a8, roughness: 0.5, metalness: 0.05 });
const cyan = new THREE.MeshStandardMaterial({ color: 0x43e8d8, roughness: 0.35, metalness: 0.12 });
const cream = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.58 });
const pink = new THREE.MeshStandardMaterial({ color: 0xff9cbc, roughness: 0.5 });
const black = new THREE.MeshStandardMaterial({ color: 0x07111f, roughness: 0.38 });

function mesh(geometry, material, position, scale = [1, 1, 1]) {
  const part = new THREE.Mesh(geometry, material);
  part.position.set(...position);
  part.scale.set(...scale);
  cat.add(part);
  return part;
}

mesh(new THREE.SphereGeometry(1, 40, 28), purpleDark, [0, -0.5, 0], [1.12, 1.3, 0.92]);
mesh(new THREE.SphereGeometry(1, 40, 28), purple, [0, 0.92, 0.05], [1.25, 1.05, 1]);

const leftEar = mesh(new THREE.ConeGeometry(0.52, 1.25, 4), purple, [-0.68, 1.82, 0], [1, 1, 0.88]);
leftEar.rotation.z = -0.14;
leftEar.rotation.y = Math.PI / 4;
const rightEar = mesh(new THREE.ConeGeometry(0.52, 1.25, 4), purple, [0.68, 1.82, 0], [1, 1, 0.88]);
rightEar.rotation.z = 0.14;
rightEar.rotation.y = Math.PI / 4;

mesh(new THREE.ConeGeometry(0.26, 0.66, 4), pink, [-0.68, 1.86, 0.29], [1, 1, 0.58]).rotation.y = Math.PI / 4;
mesh(new THREE.ConeGeometry(0.26, 0.66, 4), pink, [0.68, 1.86, 0.29], [1, 1, 0.58]).rotation.y = Math.PI / 4;

mesh(new THREE.SphereGeometry(0.24, 24, 18), cream, [-0.29, 0.75, 0.91], [1.18, 0.9, 0.55]);
mesh(new THREE.SphereGeometry(0.24, 24, 18), cream, [0.29, 0.75, 0.91], [1.18, 0.9, 0.55]);
mesh(new THREE.SphereGeometry(0.075, 20, 14), pink, [0, 0.88, 1.12], [1.15, 0.8, 0.55]);

mesh(new THREE.SphereGeometry(0.12, 20, 14), black, [-0.4, 1.17, 0.99], [0.68, 1.15, 0.48]);
mesh(new THREE.SphereGeometry(0.12, 20, 14), black, [0.4, 1.17, 0.99], [0.68, 1.15, 0.48]);
mesh(new THREE.SphereGeometry(0.04, 12, 8), cyan, [-0.38, 1.2, 1.045]);
mesh(new THREE.SphereGeometry(0.04, 12, 8), cyan, [0.42, 1.2, 1.045]);

mesh(new THREE.SphereGeometry(0.38, 24, 18), purple, [-0.7, -1.48, 0.35], [1, 0.7, 1.18]);
mesh(new THREE.SphereGeometry(0.38, 24, 18), purple, [0.7, -1.48, 0.35], [1, 0.7, 1.18]);

const tailCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0.78, -0.55, -0.2),
  new THREE.Vector3(1.55, -0.55, -0.12),
  new THREE.Vector3(1.7, 0.18, 0.02),
  new THREE.Vector3(1.18, 0.52, 0.08),
]);
const tail = new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 32, 0.18, 12, false), purpleDark);
cat.add(tail);

const collar = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.075, 14, 48), cyan);
collar.position.set(0, 0.18, 0.02);
collar.rotation.x = Math.PI / 2;
cat.add(collar);

const tag = mesh(new THREE.OctahedronGeometry(0.15, 0), cyan, [0, 0.02, 0.9]);
tag.rotation.z = Math.PI / 4;

const keyLight = new THREE.DirectionalLight(0xffffff, 3.3);
keyLight.position.set(3, 5, 6);
scene.add(keyLight);
const cyanLight = new THREE.PointLight(0x43e8d8, 16, 12);
cyanLight.position.set(-3, 0, 4);
scene.add(cyanLight);
const violetLight = new THREE.PointLight(0x8c7cff, 14, 12);
violetLight.position.set(3, 1, 3);
scene.add(violetLight);
scene.add(new THREE.HemisphereLight(0xc4bfff, 0x07111f, 2.2));

const clock = new THREE.Clock();
let running = true;

function animate() {
  if (!running) return;
  const elapsed = clock.getElapsedTime();
  cat.rotation.y = elapsed * (reducedMotion ? 0.35 : 0.85);
  cat.position.y = Math.sin(elapsed * 2.2) * (reducedMotion ? 0.025 : 0.08) - 0.08;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function disposeScene() {
  scene.traverse((object) => {
    object.geometry?.dispose();
    if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
    else object.material?.dispose();
  });
  renderer.dispose();
}

function hideLoader() {
  window.clearTimeout(window.catLoaderFallback);
  loader.classList.add("is-hidden");
  window.setTimeout(() => {
    running = false;
    disposeScene();
    loader.remove();
  }, 650);
}

const startedAt = performance.now();
function hideAfterMinimumTime() {
  const remaining = Math.max(0, 1500 - (performance.now() - startedAt));
  window.setTimeout(hideLoader, remaining);
}

if (document.readyState === "complete") hideAfterMinimumTime();
else window.addEventListener("load", hideAfterMinimumTime, { once: true });

animate();
