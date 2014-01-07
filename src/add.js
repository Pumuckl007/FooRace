game.initScene = function(){
  var wheel = new THREE.CylinderGeometry(0.4,0.4,0.4,7,1,false);
  wheel.applyMatrix( new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0,0,1), Math.PI/2) );
  var body = new Physijs.ConvexMesh(new THREE.CubeGeometry(3.2,2,8),
  Physijs.createMaterial(new THREE.MeshPhongMaterial({color:0x33ffff}, 0.9,0.02)), 1542);
  body.position.y = -4;
  var car = new game.Vehicle(body, wheel,
  new THREE.MeshPhongMaterial({color:0x020202}),
  new Physijs.VehicleTuning(10.88,1.83,0.28, 500, 10.5, 100000), "player", true);

  var body2 = new Physijs.ConvexMesh(new THREE.CubeGeometry(3.2,2,8),
  Physijs.createMaterial(new THREE.MeshPhongMaterial({color:0x33ffff}, 0.9,0.02)), 1542);
  body2.position.x = 40;
  var car2 = new game.Vehicle(body2, wheel,
  new THREE.MeshPhongMaterial({color:0x020202}),
  new Physijs.VehicleTuning(10.88,1.83,0.28, 500, 10.5, 100000), "not", false);
  
  for(var i = 0; i< 50; i++){
    var size = Math.random() * 3 + 1;
    var mesh = new THREE.OctahedronGeometry(size/2, 2);
    var material = Physijs.createMaterial(new THREE.MeshPhongMaterial({color:0x332255, shading:THREE.FlatShading}), 0.6, Math.random());
    var box = new Physijs.ConvexMesh(mesh, material, Math.random() * 700);
    box.castShadow = box.receiveShadow = true;
    box.position.set(Math.random() * 60 - 15, Math.random() + 1, Math.random() * 60 - 40);
    game.scene.add(box);
    box.setLinearVelocity(new THREE.Vector3((Math.random()-0.5) * 30,(Math.random()-0.5) * 30,(Math.random()-0.5) * 30))
  }
}