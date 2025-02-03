// Create the Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light to the scene
const light = new THREE.AmbientLight(0x404040, 2); // Ambient light
scene.add(light);

// Set up the loader to load the GLB model
const loader = new THREE.GLTFLoader();
loader.load('67a06ffae878695d72d547a7.glb', function (gltf) {
    scene.add(gltf.scene);  // Add the avatar to the scene
    gltf.scene.scale.set(0.5, 0.5, 0.5); // Adjust size of avatar
    gltf.scene.position.set(0, -1, 0); // Position avatar
});

// Set up camera position
camera.position.z = 3;

// Animation loop to render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
