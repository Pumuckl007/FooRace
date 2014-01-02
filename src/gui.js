var game = {};
game.gui = function(){
	var screens = [];
	this.screens = screens;
	this.addElement = function(element, screenid){
		screens[screenid].addElement(element);
	}
	this.removeElement = function(element, screenid){
		screens[screenid].removeElement(element);
	}
	this.addScreen = function(screenid){
		screens[screenid] = new this.screen();
	}
	this.setScreenHidden = function(hidden, screenid){
		screens[screenid].hidden(hidden);
	}



	//screen


	this.screen = function(){
		var elements = [];
		this.addElement = function(element){
			elements.push(element);
		}
		this.removeElement = function(element){
			this.elements.remove(element);
		}
		this.hidden = function(hidden){
			for(var i = 0; i < elements.length; i++){
				elements[i].hidden = hidden;
			}
		}
	}
};
game.gui = (function(){
  return new game.gui();
})();