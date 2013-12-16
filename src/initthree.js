var game = {};
game.canvasWidth = window.innerWidth, game.canvasHeight = window.innerHeight;
game.initializeScene = function(){
  game.renderer = new THREE.WebGLRenderer({antialias:true});
  game.renderer.setClearColor(0x66AAFF, 1);
  game.renderer.setSize(game.canvasWidth, game.canvasHeight);
  game.renderer.shadowMapEnabled = true;
  game.renderer.shadowMapSoft = true;
  document.getElementById("gamecanvas").appendChild(game.renderer.domElement);
  game.camera = new THREE.PerspectiveCamera(45, game.canvasWidth / game.canvasHeight, 0.05, 1000);
  game.scene = new Physijs.Scene();
  game.scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
  game.scene.fog = new THREE.FogExp2( 0x040413, 0.001 );
  game.dir_light = new THREE.DirectionalLight( 0xFFEEEE );
  game.dir_light.position.set( 215/2, 390/2, 135/2 );
  game.dir_light.target.position.copy( game.scene.position );
  game.dir_light.castShadow = true;
  game.dir_light.shadowCameraLeft = -500;
  game.dir_light.shadowCameraTop = -500;
  game.dir_light.shadowCameraRight = 500;
  game.dir_light.shadowCameraBottom = 500;
  game.dir_light.shadowCameraNear = 20;
  game.dir_light.shadowCameraFar = 1200;
  game.dir_light.shadowBias = -.001
  game.dir_light.shadowMapWidth = game.dir_light.shadowMapHeight = 4096;
  game.dir_light.shadowDarkness = .5;
  game.scene.add( game.dir_light );
  game.scene.addEventListener('update', game.physiUpdate);

  game.add();

  game.camera.position.set(-70, 40, 300);
  game.camera.rotation.order = "YXZ";
  game.camera.lookAt(game.scene.position);
  game.camera.location = new THREE.Vector3(0,0,0);
  game.camera.distance = 10;
  game.camera.yaw = Math.PI/3;
  game.camera.pitch = -Math.PI/2.5;
  game.camera.update = function update(){
    this.position.x = this.distance * Math.cos(this.yaw) * Math.sin(this.pitch) + this.location.x;
    this.position.y = this.distance * Math.cos(this.pitch) + this.location.y;
    this.position.z = this.distance * Math.sin(this.yaw) * Math.sin(this.pitch) + this.location.z;
    this.lookAt(this.location);
  }
  game.ambientLight = new THREE.AmbientLight(0x202020);
  game.scene.add(game.ambientLight);
}
game.step = function(timestamp) {
  game.renderScene();
  requestAnimationFrame(game.step);
}
game.add = function(){
  var groundgeom = new THREE.CubeGeometry(500,2,500);
  var groundmaterial = new Physijs.createMaterial(new THREE.MeshPhongMaterial({color:0x444499}), 0.4,0.05);
  var ground = new Physijs.BoxMesh(groundgeom, groundmaterial, 0);
  ground.position.y = -10;
  ground.receiveShadow = true;
  game.scene.add(ground)

}
game.renderScene = function(){
  game.update();
  game.scene.simulate();
  game.renderer.render(game.scene, game.camera);
}
game.update = function(){
  var obj = game.scene.getObjectByName("player");
  if(typeof obj !== 'undefined'){
    var x = obj.position.x;
    var y = obj.position.y;
    var z = obj.position.z;
    game.camera.position.set(x - 7, y + 8, z + 30);
  }
  if(typeof game.updateControls !== 'undefined'){
    game.updateControls();
    var length = game.scene.children.length;
    for(var i = 0; i < length; i++){
      if(typeof game.scene.children[i].update !== 'undefined'){
        game.scene.children[i].update();
      }
    }
  }
}
game.physiUpdate = function(){
  var length = game.scene.children.length;
  for(var i = 0; i < length; i++){
    if(typeof game.scene.children[i].physiUpdate !== 'undefined'){
      game.scene.children[i].physiUpdate();
    }
  }
}

game.initializeScene();
requestAnimationFrame(game.step);
game.renderer.render(game.scene, game.camera);