(function(){
  game.keysDown = [];
  game.controlUpdate = new Array();
  document.addEventListener('keydown', function(event){
    game.keysDown[event.which] = true;
  });
  document.addEventListener('keyup', function(event){
    game.keysDown[event.which] = false;
  });
  game.updateControls = function(){
    for(var i = 0; i < game.controlUpdate.length; i++){
      game.controlUpdate[i](game.keysDown);
    }
  };
})();