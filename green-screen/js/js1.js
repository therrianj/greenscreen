
var fgimage = null;
var bgimage = null;
var fgcanvas;
var bgcanvas;

function fgUpload(){
  var fgcanvas = document.getElementById("fgcan");
  var fileinput = document.getElementById("fginput");
  fgimage = new
  SimpleImage(fileinput);
  
  fgimage.drawTo(fgcanvas);
  
}
function bgUpload(){
  var bgcanvas = document.getElementById("bgcan");
  var fileinput = document.getElementById("bginput");
  bgimage = new
  SimpleImage(fileinput);
  
  bgimage.drawTo(bgcanvas);
  
}
function doGreenScreen(){
  if(fgimage == null || !fgimage.complete()){
    alert("FG image not completely loaded");
    return;
  }
  if(bgimage == null || !bgimage.complete()){
    alert("BG image not completely loaded");
    return;}
  
  clearCanvases();
  
    fgcanvas = document.getElementById("fgcan");
  
  var x = createComposite();
  x.drawTo(fgcanvas);
  //   var finalImage = createComposite();
  // finalImage.drawTo(fgcanvas);
}
    


function createComposite(){
  
  var outimage = new SimpleImage(fgimage.getWidth(), fgimage.getHeight());
  bgimage.setSize(fgimage.getWidth(), fgimage.getHeight());
  
  for( var pix of fgimage.values()){
    // var greenThreshold = 240;
    // var x = pix.getX();
    // var y = pix.getY();
    if(pix.getGreen() > (pix.getRed() + pix.getBlue())){
      
      var bgPix =  bgimage.getPixel(pix.getX(), pix.getY());
      outimage.setPixel(pix.getX(), pix.getY(), bgPix);
        
    }
    else{
        outimage.setPixel(pix.getX(), pix.getY(), pix);
    }   
  }
  return outimage;
}


  
function clearCanvases(){
   fgcanvas = document.getElementById("fgcan");
   bgcanvas = document.getElementById("bgcan");
  var ctxfg = fgcanvas.getContext("2d") ;
  var ctxbg = bgcanvas.getContext("2d") ;
  ctxfg.clearRect(0,0,fgcanvas.width,fgcanvas.height);
  ctxbg.clearRect(0,0,bgcanvas.width,bgcanvas.height);
  // climage.drawTo(bgcanvas);
}