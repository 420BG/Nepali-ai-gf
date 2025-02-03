// Create the Three.js scene
const scene = new THREE.Scene();

// Set up the camera with an aspect ratio based on the window size
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Create the renderer with antialiasing enabled for smoother edges
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light to illuminate the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Optionally, add a directional light for better shading
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Create a GLTFLoader instance to load the Ready Player Me avatar
const loader = new THREE.GLTFLoader();
loader.load(
  'models/avatar.glb', // Ensure this path is correct relative to index.html
  function (gltf) {
    // Called when the resource is loaded successfully
    const avatar = gltf.scene;
    // Scale and position your avatar as needed
    avatar.scale.set(0.5, 0.5, 0.5);
    avatar.position.set(0, -1, 0);
    scene.add(avatar);
  },
  undefined, // You can add a progress callback if needed
  function (error) {
    // Handle any errors that occur during loading
    console.error('Error loading the GLTF model:', error);
  }
);

// Animation loop: this function renders the scene and updates as needed
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Adjust camera and renderer if the browser window is resized
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
