game.generateVehicle = function(body, bodymaterial, wheel, wheelmaterial, tune, name) {
  var mesh = new Physijs.ConvexMesh(body, bodymaterial);
  mesh.castShadow = mesh.receiveShadow = true;
  mesh.name = name;
  var vehicle = new Physijs.Vehicle(mesh, tune);
  console.log(vehicle.addWheel);
  vehicle.name = name;
  game.scene.add(vehicle);
  for(var i = 0; i < 4; i++){
    vehicle.addWheel(
      wheel,
      wheelmaterial,
      new THREE.Vector3(
        i % 2 === 0 ? -1.6 : 1.6,
        -1,
        i < 2 ? 3.3 : -3.2
      ),
      new THREE.Vector3( 0, -1, 0 ),
      new THREE.Vector3( -1, 0, 0 ),
      0.5,
      0.7,
      i < 2 ? false : true
  );
  }
  vehicle.turn = 0;
  vehicle.steer = function(rotation){
    this.turn += rotation;
    if(this.turn > 40){
      this.turn = 40;
    }
    if(this.turn < -40){
      this.turn = -40;
    }
    var radians = (this.turn * (Math.PI/180));
    this.setSteering(radians, 0);
    this.setSteering(radians, 1);
  }
  vehicle.power = 0;
  vehicle.accelerate = function(power){
    this.power += power;
    if(this.power > 0){
      this.applyEngineForce(this.power);
      this.releasBreaks();
    }
  }
  vehicle.break = function(hardness){
    this.power -= hardness;
    if(this.power < 0){
      this.setBrake( -this.breakPow, 2 );
      this.setBrake( -this.breakPow, 3 );
      this.applyEngineForce(0);
    } else {
      this.applyEngineForce(this.power);
    }
  }
  vehicle.releasBreaks = function(){
    this.setBrake( 0, 2 );
    this.setBrake( 0, 3 );
  }
  return vehicle;
}