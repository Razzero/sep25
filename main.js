// Import the necessary Three.js components
import * as THREE from 'three';

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create lighting for better shading
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Create a heart shape
const heartShape = new THREE.Shape();
heartShape.bezierCurveTo(0.5, 1.0, 1.5, 1.0, 1.5, 0.5); // Top right curve
heartShape.bezierCurveTo(1.5, 0, 0.75, -1.75, 0, -1.5);  // Right side to sharp bottom
heartShape.bezierCurveTo(-0.75, -1.75, -1.5, 0, -1.5, 0.5); // Left side to top
heartShape.bezierCurveTo(-1.5, 1.0, -0.5, 1.0, 0, 0.5);  // Close the top left curve

// Extrude the heart shape to give it thickness
const extrudeSettings = {
    steps: 50,
    depth: 0.5, // thickness
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 10
};

const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

// Create a smooth material
const material = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100, flatShading: false });

// Create the mesh from the geometry and material
const heartMesh = new THREE.Mesh(geometry, material);
scene.add(heartMesh);

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    heartMesh.rotation.x += 0.0001;
    heartMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Start the animation
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
