game.Vehicle = function(body, wheel, wheelmaterial, tune, name, controled){  
  var turn = 0;
  var power = 0;
  var lighton = false;
  var fadebrake = 0;
  var brake = false;
  var engineOn = false;
  var reset = false;
  var accelerating = false;
  //KN*m/s
  var MAXPOWER = 30.96;
  var BRAKERANGE = 500;

  // Audio.load("sound/Engien", "carEngien" + name);

  body.castShadow = body.receiveShadow = true;
  body.name = name;
  this.physi = new Physijs.Vehicle(body, tune);
  game.scene.add(this.physi);
  for(var i = 0; i < 4; i++){
    this.physi.addWheel(
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

  this.steer = function(rotation){
    turn += rotation;
  };

  this.accelerate = function(aPower){
    accelerating = true;
    power += aPower;
    var volcity = this.physi.mesh.getLinearVelocity().x;
    if(this.physi.mesh.rotation.y < 0 ? (volcity > 0) : (volcity < 0)){
      brake = true;
    }
    if(this.physi.mesh.rotation.y === 0 || volcity === 0){
      brake = false;
    }
  };

  this.break = function(hardness){
    accelerating = true;
    power -= hardness;
    var volcity = this.physi.mesh.getLinearVelocity().x;
    if(this.physi.mesh.rotation.y < 0 ? (volcity < 0) : (volcity > 0)){
      brake = true;
    }
    if(this.physi.mesh.rotation.y === 0 || volcity === 0){
      brake = false;
    }
  };

  this.releaseBrakes = function(){
    fadebrake = 0;
  };
  var thls = this;
  body.update = function(){
    thls.update();
  };
  this.update = function(){
    if(engineOn){
      // Audio.playLoopingSound("carEngien" + name,
       // this.physi.mesh.position.x,
       // this.physi.mesh.position.y,
       // this.physi.mesh.position.z);
      var speed = Math.sqrt(
        Math.pow(this.physi.mesh.getLinearVelocity().x,2) + 
        Math.pow(this.physi.mesh.getLinearVelocity().y,2) + 
        Math.pow(this.physi.mesh.getLinearVelocity().z,2));
      if(power > MAXPOWER * 100 + BRAKERANGE){
        power = MAXPOWER * 100 + BRAKERANGE;
      }
      if(power < MAXPOWER * -35 - BRAKERANGE){
        power = MAXPOWER * -35 - BRAKERANGE;
      }
      if(brake){
        this.physi.setBrake(200, 2);
        this.physi.setBrake(200, 3);
        this.physi.applyEngineForce(0);
        brake = false;
      } else {
          if(Math.abs(power) <= BRAKERANGE){
          this.physi.setBrake(5, 2);
          this.physi.setBrake(5, 3);
        } else {
          if(fadebrake !== 0){
            fadebrake = 0;
            this.physi.setBrake(0, 2);
            this.physi.setBrake(0, 3);
          }
          if(!accelerating){
            this.physi.setBrake(50, 2);
            this.physi.setBrake(50, 3);
          } else {
            accelerating = false;
            if(power > 0){
              this.physi.applyEngineForce(power - BRAKERANGE);
            } else {
              this.physi.applyEngineForce(power + BRAKERANGE);
            }
          };
        }
      }
      if(turn > 40){
      turn = 40;
      }
      if(turn < -40){
        turn = -40;
      }
      if(turn > 0){
        turn -= 0.5 + (speed * 0.05 * (turn/30));
      }
      if(turn < 0){
        turn += 0.5 + (speed * 0.05 * (turn/30));
      }
      var radians = (turn * (Math.PI/180));
      this.physi.setSteering(radians, 0);
      this.physi.setSteering(radians, 1);
      if(power > 0){
        power -= 1;
      } else {
        power += 1;
      }
    } else {
      // Audio.stopSound("carEngien" + name);
      this.physi.applyEngineForce(0)
      fadebrake = 1;
      this.physi.setBrake(Math.abs(power)/10 + 10, 2);
      this.physi.setBrake(Math.abs(power)/10 + 10, 3);
    }
  };
  body.physiUpdate = function(){
    thls.physiUpdate();
  }
  this.physiUpdate = function(){
  }
  if(controled){
  game.controlUpdate.push(function(keysDown){
      if(keysDown[83]){
        thls.break(50);
      }
      if(keysDown[87]){
        thls.accelerate(50);
      }
      if(keysDown[65]){
        thls.steer(1);
      }
      if(keysDown[68]){
        thls.steer(-1);
      }
      if(keysDown[82]){
        reset = true;
      }
      if(keysDown[69]){
        engineOn = !engineOn;
        keysDown[69] = false;
      }
    });
  }
};