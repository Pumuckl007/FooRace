var game = {};
game.gui = function(){
	var screens = [];
	var screennames = [];
	var numofscreens = 0;
	var screenhidden = [];
	this.screens = screens;
	this.addElement = function(element, screenid){
		screens[screenid].addElement(element);
	}
	this.removeElement = function(element, screenid){
		screens[screenid].removeElement(element);
	}
	this.addScreen = function(screenid){
		screens[screenid] = new this.screen();
		screennames[numofscreens] = screenid;
		numofscreens ++;
		screenhidden[screenid] = function(){};
	}
	this.setOnScreenHidden = function(callback, screenid){
		screenhidden[screenid] = callback;
	}
	this.setScreenHidden = function(hidden, screenid){
		var already = screens[screenid].ishidden;
		screens[screenid].hidden(hidden);
		if(!already){
			screenhidden[screenid](hidden);
		}
	}
	this.isScreenHidden = function(screenid){
		return screens[screenid].ishidden;
	}
	this.setAllScreensHiddenEcept = function(eceptions, hidden){
		for(var i = 0; i < numofscreens; i++){
			var isecepted = false;
			for(var k = 0; k < eceptions.length; k++){
				if(eceptions[k] === screennames[i]){
					isecepted = true;
				}
			}
			if(!isecepted){
				this.setScreenHidden(hidden, screennames[i]);
			} else {
				this.setScreenHidden(!hidden, screennames[i]);
			}
		}
	}


	//screen


	this.screen = function(){
		this.ishidden = false;
		var elements = [];
		this.addElement = function(element){
			elements.push(element);
		}
		this.removeElement = function(element){
			this.elements.remove(element);
		}
		this.hidden = function(hidden){
			this.ishidden = hidden;
			for(var i = 0; i < elements.length; i++){
				elements[i].hidden = hidden;
			}
		}
	}
};
game.gui = (function(){
  return new game.gui();
})();