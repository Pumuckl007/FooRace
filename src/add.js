var care;
(function(){
  var wheel = new THREE.CylinderGeometry(0.4,0.4,0.4,7,1,false);
  wheel.applyMatrix( new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0,0,1), Math.PI/2) );
  var body = new Physijs.ConvexMesh(new THREE.CubeGeometry(3.2,2,8),
  Physijs.createMaterial(new THREE.MeshPhongMaterial({color:0x33ffff}, 0.9,0.02)), 1542);
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
    var size = Math.random() * 3 + 0.4;
    var mesh = new THREE.CubeGeometry(size,size,size);
    var material = Physijs.createMaterial(new THREE.MeshPhongMaterial({color:0x332255}), 0.5, 0.3);
    var box = new Physijs.BoxMesh(mesh, material, Math.random() * 700);
    box.castShadow = box.receiveShadow = true;
    box.position.set(Math.random() * 60 - 15, 0, Math.random() * 60 - 40);
    game.scene.add(box);
  }
})();