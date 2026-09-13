const scene=new THREE.Scene();
scene.background=new THREE.Color(0x080820);
scene.fog=new THREE.Fog(0x080820,10,30);

const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(2,3,4);
camera.lookAt(0,0,0);

const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls=new OrbitControls(camera,renderer.domElement);
scene.add(new THREE.AmbientLight(0xffffff,0.3));

const dirLight=new THREE.DirectionalLight(0xffffff,0.9);
dirLight.position.set(3,6,4);
scene.add(dirLight);

const geos=[
    new THREE.SphereGeometry(0.6,32,32),
    new THREE.TorusGeometry(1.1,0.08,16,48)
];

const colors=[0xffbc60,0xffdd99];
const meshList=[];

geos.forEach((geo,i)=>{
    const mat=new THREE.MeshStandardMaterial({color:colors[i]});
    const mesh=new THREE.Mesh(geo,mat);
    if(i===0){
        mesh.position.set(0,0,0);                                            // 地球在中心
    }else{
        mesh.rotation.x=Math.PI/2.5;                                         // 星环斜套在地球外
    }
    scene.add(mesh);
    meshList.push(mesh);
});

function animate(){
    requestAnimationFrame(animate);
    meshList[0].rotation.y+=0.005;                                          // 地球自转
    meshList[1].rotation.z+=0.008;                                          // 星环旋转
    controls.update();
    renderer.render(scene,camera);
}
animate();

window.addEventListener('resize',()=>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});
