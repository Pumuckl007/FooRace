window.Audio = function(){
  this.nas = 0x123456789;

  var sources = [];
  var al = WebAL.getContext({
    // If you will only be providing URLs and not dynamically filling buffers, disable dynamic audio
    supportDynamicAudio: true,
    // If you will not be using any of the 3D audio features or panning, disable stereo mixing
    supportStereoMixing: true,
    // Frequency for mixing output buffer, in units of Hz
    frequency: 44100,
    // Refresh interval for mixer, in units of Hz
    refreshInterval: 16,
    // Number of output channels (1 or 2)
    channels: 2
  });

  this.load = function(path, name){
    var audioRef = [
      { type: "audio/mpeg", src: path + ".mp3" },
      { type: "audio/ogg", src: path + ".ogg" }
    ];
    var buffer = al.createBuffer();
    al.bufferData(buffer, audioRef, false);
    var source = al.createSource();
    al.sourceBuffer(source, buffer);
    if(typeof sources[name] === 'undefined'){
      sources[name] = source;
    } else if(sources[name] === this.nas){
      sources[name] = source;
    } else {
      console.log("sound already registerd to \"" + name + "\"");
    }
  };
  this.removeBuffedSound = function(name){
    sources[name] = this.nas;
  }
  this.setSoundPosition = function(name, x,y,z){
    x = x - game.camera.position.x;
    y = y - game.camera.position.y;
    z = z - game.camera.position.z;
    al.sourceParameter(sources[name], al.POSITION, [x/100, y/100, z/100]);
  }
  this.playSound = function(name,x,y,z){
    if(x && y && z){
      this.setSoundPosition(name,x/100,y/100,z/100);
    } else {
      this.setSoundPosition(name,0,0,0);
    }
    al.sourcePlay(sources[name]);
  }
  this.playLoopingSound = function(name, x, y, z){
    if(al.getSourceParameter(sources[name], al.SOURCE_STATE) !== al.PLAYING){
      if(x && y && z){
        this.setSoundPosition(name,x,y,z);
      } else {
        this.setSoundPosition(name,0,0,0);
      }
      al.sourceParameter(sources[name], al.LOOPING, true);
      this.playSound(name);
    } else if(x && y && z){
      this.setSoundPosition(name,x,y,z);
    }
  }
  this.stopSound = function(name){
    if(al.getSourceParameter(sources[name], al.SOURCE_STATE) === al.PLAYING &&
      al.getSourceParameter(sources[name], al.LOOPING) === true){
      al.sourceParameter(sources[name], al.LOOPING, false);
      al.sourceStop(sources[name]);
    }
  }
}
window.Audio = (function(){
  return new Audio();
})();