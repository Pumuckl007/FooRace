(function(){
	window.onresize = function(event){
		game.canvasWidth = window.innerWidth, game.canvasHeight = window.innerHeight;
		game.renderer.setSize(game.canvasWidth, game.canvasHeight);
		game.camera = new THREE.PerspectiveCamera(45, game.canvasWidth / game.canvasHeight, 0.05, 1000);
		game.camera.position.set(-70, 40, 300);
	  game.camera.rotation.order = "YXZ";
	  game.camera.lookAt(game.scene.position);
	  game.camera.location = new THREE.Vector3(0,0,0);
	};
	window.toggleFullScreen = function() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {               // current working methods
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}
})();