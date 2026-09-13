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
    new THREE.TorusGeometry(1.1,0.08,16,48),
    new THREE.BoxGeometry(0.225,0.15,0.225),
    new THREE.BoxGeometry(0.225,0.15,0.225)
];

const colors=[0xffbc60,0xffdd99,0x888888,0xaaaaaa];
const meshList=[];

geos.forEach((geo,i)=>{
    const mat=new THREE.MeshStandardMaterial({
        color:colors[i],
        emissive:i>=2?0x333333:0x000000                               // 陨石微发光，暗处也看得见
    });
    const mesh=new THREE.Mesh(geo,mat);
    if(i===0){
        mesh.position.set(0,0,0);                                            // 地球在中心
    }else if(i===1){
        mesh.rotation.x=Math.PI/2.5;                                         // 星环斜套在地球外
    }else if(i===2){
        mesh.position.set(1.9,0,0);                                          // 陨石1
        mesh.userData={angle:0,radius:1.9,speed:0.01};
    }else{
        mesh.position.set(-2.3,0,0);                                         // 陨石2，在对面轨道
        mesh.userData={angle:Math.PI,radius:2.3,speed:0.013};
    }
    scene.add(mesh);
    meshList.push(mesh);
});

function animate(){
    requestAnimationFrame(animate);
    meshList[0].rotation.y+=0.005;                                          // 地球自转
    meshList[1].rotation.z+=0.008;                                          // 星环旋转
    meshList[2].userData.angle+=meshList[2].userData.speed;                 // 陨石1公转
    meshList[2].position.set(Math.cos(meshList[2].userData.angle)*meshList[2].userData.radius,0,Math.sin(meshList[2].userData.angle)*meshList[2].userData.radius);
    meshList[2].rotation.x+=0.02;
    meshList[2].rotation.y+=0.03;
    meshList[3].userData.angle+=meshList[3].userData.speed;                 // 陨石2公转
    meshList[3].position.set(Math.cos(meshList[3].userData.angle)*meshList[3].userData.radius,0,Math.sin(meshList[3].userData.angle)*meshList[3].userData.radius);
    meshList[3].rotation.x+=0.03;
    meshList[3].rotation.y+=0.02;
    controls.update();
    renderer.render(scene,camera);
}
animate();

window.addEventListener('resize',()=>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});
