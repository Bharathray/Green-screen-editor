var fgimg = null;
var bgimg = null;
var fgcvs;
var bgcvs;

//Foreground image 
function loadfg() {
  var imgfile = document.getElementById("fgfile");
  fgimg = new SimpleImage(imgfile);
  fgcvs =document.getElementById("fgcan");
  fgimg.drawTo(fgcvs);
}

//Background image
function loadbg(){
  var imgfile = document.getElementById("bgfile");
  bgimg = new SimpleImage(imgfile);
  bgcvs =document.getElementById("bgcan");
  bgimg.drawTo(bgcvs); 
}

//Create Composite
function composite() {
var output =new SimpleImage(fgimg.getWidth(),fgimg.getHeight());
var greenthreshold =240;
for (var pixel of fgimg.values()) {
  var x = pixel.getX();
  var y = pixel.getY();
  if (pixel.getGreen() > greenthreshold) {
    var bgpixel = bgimg.getPixel(x,y);
    output.setPixel(x,y,bgpixel);
  }
  else {
    output.setPixel(x,y,pixel); 
  }
}
  return output;
}

//function greenscreen
function dogreen() {
  if(fgimg == null ||! fgimg.complete()){
    alert("Foreground not loaded");
    return;
  }
  if(bgimg == null ||! bgimg.complete()){
    alert("Background not loaded");
  }

//clear canvas
  clrcvs();
  var finimg = composite();
  finimg.drawTo(fgcvs);
}

function clrcvs() {
  doclr(fgcvs);
  doclr(bgcvs);
}

function doclr(cvs){
  var ctx = cvs.getContext("2d");
  ctx.clearRect(0,0,cvs.width,cvs.height);
}