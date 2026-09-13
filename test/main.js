const scene=new THREE.Scene();
scene.background=new THREE.Color(0x111111);
const camera=new THREE.PerspectiveCamera(
60,window.innerWidth/window.innerHeight,0.1,1000
);
camera.position.set(4,3,6);
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
document.body.appendChild(renderer.domElement);
scene.add(new THREE.AmbientLight(0xffffff,0.5));
const dir=new THREE.DirectionalLight(0xffffff,1);
dir.position.set(5,8,5);
scene.add(dir);
const torus=new THREE.Mesh(
new THREE.TorusGeometry(1.2,0.4,16,64),
new THREE.MeshStandardMaterial({color:0x888888,roughness:0.35,metalness:0.2})
);
scene.add(torus);
const grid=new THREE.GridHelper(20,20,0x444444,0x222222);
scene.add(grid);
const controls=new THREE.OrbitControls(camera,renderer.domElement);
controls.target.set(0,0,0);
controls.enableRotate=true;
controls.enableZoom=true;
controls.enablePan=true;
controls.minDistance=2;
controls.maxDistance=30;
controls.minPolarAngle=0;
controls.maxPolarAngle=Math.PI/2-0.05;
controls.rotateSpeed=1.0;
controls.zoomSpeed=1.2;
controls.panSpeed=0.8;
controls.enableDamping=true;
controls.dampingFactor=0.05;
controls.update();
window.addEventListener('resize',()=>{
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);
});
function animate(){
requestAnimationFrame(animate);
controls.update();
torus.rotation.y+=0.005;
renderer.render(scene,camera);
}
animate();
