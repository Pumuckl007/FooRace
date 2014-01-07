game.audiotimestamp = 0;
//mainmenu
(function(){
game.gui.addScreen("mainmenu");
var background = document.createElement("div");
background.className = "mainmenubackground";
game.gui.addElement(background, "mainmenu");
document.getElementById("gui").appendChild(background);
var startdiv = document.createElement("div");
var start = document.createElement("p");
startdiv.appendChild(start)
startdiv.className = "startbuttondiv";
start.className = "startbutton";
game.gui.addElement(start, "mainmenu");
document.getElementById("gui").appendChild(startdiv);
start.textContent = "Start Game";
start.onclick = function(){
	game.initScene();
	game.gui.setAllScreensHiddenEcept(["mainmenu", "options"], false);
}
game.gui.addElement(startdiv, "mainmenu");

var options = document.createElement("p");
startdiv.appendChild(options)
options.className = "startbutton";
game.gui.addElement(options, "mainmenu");
options.textContent = "Options";
options.onclick = function(){
	game.gui.setAllScreensHiddenEcept(["options"], true);
}

var credits = document.createElement("p");
startdiv.appendChild(credits)
credits.className = "startbutton";
game.gui.addElement(credits, "mainmenu");
credits.textContent = "Credits";
credits.onclick = function(){
	game.gui.setAllScreensHiddenEcept(["credits"], true);
}


var audio = document.createElement("audio");
audio.src = "sound/flatwound_-_The_Long_Goodbye.mp3";
audio.loop = true;
audio.play();
game.gui.setOnScreenHidden(function(hidden){
	if(hidden){
		audio.pause();
		audiotimestamp = audio.currentTime;
	} else {
		audio.play();
	}
}, "mainmenu");
})();

//options

(function(){
game.gui.addScreen("options");
var background = document.createElement("div");
background.className = "mainmenubackground";
background.id = "optionsdiv";
game.gui.addElement(background, "options");
document.getElementById("gui").appendChild(background);
var startdiv = document.createElement("div");
var start = document.createElement("p");
startdiv.appendChild(start);
startdiv.className = "startbuttondiv";
start.className = "startbutton";
game.gui.addElement(start, "options");
document.getElementById("gui").appendChild(startdiv);
start.textContent = "Back";
start.onclick = function(){
	game.gui.setAllScreensHiddenEcept(["mainmenu"], true);
}
game.gui.addElement(startdiv, "options");


var audio = document.createElement("audio");
audio.src = "sound/flatwound_-_The_Long_Goodbye.mp3";
audio.loop = true;
audio.play();
audio.pause();
game.gui.setOnScreenHidden(function(hidden){
	if(hidden){
		audio.pause();
		audiotimestamp = audio.currentTime;
	} else {
		audio.currentTime = audiotimestamp;
		audio.play();
	}
}, "options");
})();

//options

(function(){
game.gui.addScreen("credits");
var background = document.createElement("div");
background.className = "mainmenubackground";
background.id = "optionsdiv";
game.gui.addElement(background, "credits");
document.getElementById("gui").appendChild(background);
var startdiv = document.createElement("div");
game.gui.addElement(startdiv, "credits");

var abouttextdiv = document.createElement("div");
startdiv.appendChild(abouttextdiv);
abouttextdiv.className = "abouttextdiv";
game.gui.addElement(abouttextdiv, "credits");

var credits = document.createElement("p");
credits.className = "credits";
credits.textContent = "Foo Race is made by 007Pumuckl";
abouttextdiv.appendChild(credits);

var github = document.createElement("a");
github.href = "https://github.com/Pumuckl007/FooRace";
github.className = "githublink";
github.textContent = "I'm on github";
abouttextdiv.appendChild(github);
github.target = "_blank";

var mcredits = document.createElement("p");
mcredits.className = "credits";
mcredits.textContent = "Credits for music (The Long Goodbye)";
abouttextdiv.appendChild(mcredits);

var musiccred = document.getElementById("musiccredits");
abouttextdiv.appendChild(musiccred);

var start = document.createElement("p");
startdiv.appendChild(start);
startdiv.className = "creditsdiv";
start.className = "startbutton";
game.gui.addElement(start, "credits");
document.getElementById("gui").appendChild(startdiv);
start.textContent = "Back";
start.onclick = function(){
	game.gui.setAllScreensHiddenEcept(["mainmenu"], true);
}


var audio = document.createElement("audio");
audio.src = "sound/flatwound_-_The_Long_Goodbye.mp3";
audio.loop = true;
audio.play();
audio.pause();
game.gui.setOnScreenHidden(function(hidden){
	if(hidden){
		audio.pause();
		audiotimestamp = audio.currentTime;
	} else {
		audio.currentTime = audiotimestamp;
		audio.play();
	}
}, "credits");
})();

(function(){
	game.gui.setAllScreensHiddenEcept(["mainmenu"], true);
})();