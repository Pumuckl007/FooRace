var care;
(function(){
  var wheel = new THREE.CylinderGeometry(0.4,0.4,0.4,5,1,false);
  wheel.applyMatrix( new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0,0,1), Math.PI/2) );
  var car = new game.generateVehicle(new THREE.CubeGeometry(3.2,2,8),
  new THREE.MeshPhongMaterial({color:0x33ffff}), wheel,
  new THREE.MeshPhongMaterial({color:0x020202}),
  new Physijs.VehicleTuning(10.88,1.83,0.28, 500, 10.5, 6000), "player");
  document.addEventListener('keydown', function(event){
    if(event.which === 83){
      car.break(2);
    }
    if(event.which === 87){
      car.accelerate(1);
    }
    if(event.which === 65){
      car.steer(1);
    }
    if(event.which === 68){
      car.steer(-1);
    }
  });
  for(var i = 0; i< 50; i++){
    var size = Math.random() * 3 + 0.4;
    var mesh = new THREE.CubeGeometry(size,size,size);
    var material = Physijs.createMaterial(new THREE.MeshPhongMaterial({color:0x332255}), 0.5, 0.3);
    var box = new Physijs.BoxMesh(mesh, material, 0.1);
    box.castShadow = box.receiveShadow = true;
    box.position.set(Math.random() * 60 - 15, 0, Math.random() * 60 - 40);
    game.scene.add(box);
  }
})();