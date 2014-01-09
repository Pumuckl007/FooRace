game.audiotimestamp = 0;
//mainmenu
(function(){

var audio = document.createElement("audio");


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
	audio.pause();
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


audio.src = "sound/flatwound_-_The_Long_Goodbye.mp3";
audio.loop = true;
audio.play();
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

var fps = document.createElement("p");
fps.className = "fpssetting";
fps.textContent = game.fps + " fps";
startdiv.appendChild(fps);
fps.onclick = function(){
	game.fps += 15;
	if(game.fps > 120){
		game.fps = 15;
	}
	fps.textContent = game.fps + " fps";
}
var fullscreen = document.createElement("p");
fullscreen.className = "fullscreensetting";
fullscreen.textContent = game.fullscreen + " fullscreen";
startdiv.appendChild(fullscreen);
fullscreen.onclick = function(){
	toggleFullScreen();
	game.fullscreen = !game.fullscreen;
	fullscreen.textContent = game.fullscreen + " fullscreen";
}

var back = document.createElement("p");
startdiv.appendChild(back);
startdiv.className = "optionsdiv";
back.className = "backbutton";
game.gui.addElement(back, "options");
document.getElementById("gui").appendChild(startdiv);
back.textContent = "Back";
back.onclick = function(){
	game.gui.setAllScreensHiddenEcept(["mainmenu"], true);
}
game.gui.addElement(startdiv, "options");


})();

//credits

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

var ubuntufontlicence = document.getElementById("ubuntufontcredit");
abouttextdiv.appendChild(ubuntufontlicence);

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

})();

(function(){
	game.gui.setAllScreensHiddenEcept(["mainmenu"], true);
})();