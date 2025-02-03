// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const light = new THREE.AmbientLight(0x404040, 2); // Ambient light
scene.add(light);

// Load the GLB avatar model using GLTFLoader
const loader = new THREE.GLTFLoader();
loader.load('models/avatar.glb', function (gltf) {
    // Add avatar to the scene
    scene.add(gltf.scene);
    gltf.scene.scale.set(0.5, 0.5, 0.5); // Scale the avatar
    gltf.scene.position.set(0, -1, 0); // Position the avatar

    // Optional: Add more lighting or adjust the scene after the avatar is loaded
});

// Set up camera position
camera.position.z = 3;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
