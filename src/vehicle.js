game.Vehicle = function(body, wheel, wheelmaterial, tune, name, controled){  
  var turn = 0;
  var power = 0;
  var lighton = false;
  var fadebrake = 0;
  var brake = false;
  var engineOn = false;
  var reset = false;
  var accelerating = false;
  var itemDisplay;
  var item;
  var itemPart;
  //KN*m/s
  var MAXPOWER = 30.96;
  var BRAKERANGE = 500;

  Audio.load("sound/Engien", "carEngien" + name);

  body.castShadow = body.receiveShadow = true;
  body.name = name;
  this.physi = new Physijs.Vehicle(body, tune);
  window.bod = this.physi;
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
    if(engineOn === true){
      Audio.playLoopingSound("carEngien" + name,
       this.physi.mesh.position.x,
       this.physi.mesh.position.y,
       this.physi.mesh.position.z);
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
      var i = 0;
      if(brake){
        this.physi.setBrake(200, 2);
        this.physi.setBrake(200, 3);
        this.physi.applyEngineForce(0);
        brake = false;
        i++;
      } else {
        if(Math.abs(power) <= BRAKERANGE){
          this.physi.setBrake(5, 2);
          this.physi.setBrake(5, 3);
          i++;
        } else {
          if(fadebrake !== 0){
            fadebrake = 0;
            this.physi.setBrake(0, 2);
            this.physi.setBrake(0, 3);
            i++;
          }
          if(!accelerating){
            this.physi.setBrake(500, 2);
            this.physi.setBrake(500, 3);
          } else {
            accelerating = false;
            if(power > 0){
              this.physi.applyEngineForce(power - BRAKERANGE);
            } else {
              this.physi.applyEngineForce(power + BRAKERANGE);
            }
          }
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
        turn += 0.5 - (speed * 0.05 * (turn/30));
      }
      var radians = (turn * (Math.PI/180));
      this.physi.setSteering(radians, 0);
      this.physi.setSteering(radians, 1);
      if(power > 0){
        power -= 1;
      } else {
        power += 1;
      }
    } 
    if(engineOn === false) {
      power = 0;
      Audio.stopSound("carEngien" + name);
      this.physi.applyEngineForce(0)
      fadebrake = 1;
      this.physi.setBrake(500, 2);
      this.physi.setBrake(500, 3);
    }
    if(controled){
      if(typeof this.mesh !== 'undefined'){
        this.mesh.rotation.y += Math.PI/100;
        if(this.mesh.rotation.y > Math.PI){
          this.mesh.rotation.y = 0;
        }
      }
    }
  };
  var powerDisplay;
  body.physiUpdate = function(){
    thls.physiUpdate();
    if(controled){
      powerDisplay.textContent = power; 
    }
  }
  body.renderUpdate = function(){
    thls.renderUpdate();
  }
  this.renderUpdate = function(){
    if(controled){
      this.renderer.render(this.scene, this.camera);
    }
  }
  this.physiUpdate = function(){
  }
  this.setItem = function(item){
    this.item = item;
    if(typeof this.itemPart !== 'undefined'){
      body.remove(this.itemPart);
    }
    this.itemPart = item.getThreeMesh();
    body.add(this.itemPart);
    if(controled){
      if(typeof this.mesh !== 'undefined'){
        this.scene.remove(this.mesh);
      }
      this.mesh = item.getThreeMesh();
      this.scene.add(this.mesh);
      this.camera.position.set(2 * item.scale + item.position.x, 1 * item.scale + item.position.y, 1.5 * item.scale + item.position.z);
      this.camera.location = item.position;
      this.camera.lookAt(item.position);
    }
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
      if(keysDown[49]){
        var geom = new THREE.CubeGeometry(1,1,1);
        var mat = new THREE.MeshPhongMaterial({color:0x559911, shading:THREE.FlatShading});
        var mesh = new THREE.Mesh(geom, mat);
        mesh.position.y = 7;
        var item = new game.item(mesh, 1, 0.5, 0.3,
          "cube", function(){}, function(){}, function(){}, 1, new THREE.Vector3(0,7,0), 1);
        thls.setItem(item);
      }
      if(keysDown[50]){
        var geom = new THREE.OctahedronGeometry(1,2);
        var mat = new THREE.MeshPhongMaterial({color:0x559911, shading:THREE.FlatShading});
        var mesh = new THREE.Mesh(geom, mat);
        mesh.position.y = 7;
        var item = new game.item(mesh, 1, 0.5, 0.3,
          "cube", function(){}, function(){}, function(){}, 0, new THREE.Vector3(0,7,0), 1);
        thls.setItem(item);
      }
      if(keysDown[51]){
        var geom = new THREE.CylinderGeometry(0, 1.7, 2, 16, 1, true);
        var mat = new THREE.MeshPhongMaterial({color:0x559911, shading:THREE.FlatShading});
        var mesh = new THREE.Mesh(geom, mat);
        mesh.position.y = 7;
        var item = new game.item(mesh, 1, 0.5, 0.3,
          "cube", function(){}, function(){}, function(){}, 0, new THREE.Vector3(0,7,0), 2);
        thls.setItem(item);
      }
    });
    powerDisplay = document.createElement("p");
    document.getElementById("gui").appendChild(powerDisplay);
    powerDisplay.className = "power";
    game.gui.addScreen(name + "hud");
    game.gui.addElement(powerDisplay, name + "hud");
    itemDisplay = document.createElement("div");
    document.getElementById("gui").appendChild(itemDisplay);
    itemDisplay.className = "item";
    game.gui.addElement(itemDisplay, name + "hud");
    this.renderer = new THREE.WebGLRenderer({antialias:true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(140,140);
    itemDisplay.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.05, 100);
    this.scene = new THREE.Scene();
    this.camera.location = new THREE.Vector3(0,0,0);
    this.camera.position.set(2,1,1.5);
    this.camera.lookAt(this.scene.position);
    this.dir_light = new THREE.DirectionalLight( 0xFFFFFF );
    this.dir_light.position.set( 215/2, 390/2, 135/2 );
    this.dir_light.target.position.copy( this.scene.position );
    this.scene.add(this.dir_light);
    
    this.renderer.render(this.scene, this.camera);
  }
};