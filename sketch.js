
let truncation_value = 0.5;
let inp;
let seed;
let input;
let img;
let imgtest;

let facemesh;
let outline;
let video;
let predictions = [];
let lastPredictions = [];
let on = false;
let t = 2.3;
let s = 1.7;
let ts =  1.3;
let c = 4;
let array = [];
let w = 1088,
    h = 1088;
let amsterdam = false;
let beirut = false;
let boston = false;

let runway = false;

let lastFramePositions = [];
let currentv = [];
let lastv = [];
let totalDistance = 0;
let lastPos = [];
let keypoints = [];
let m = 0;

var back;
var front;

let test;

let r;
let rlast;

let numbi;
let numblast;
let imagesb = [];
let imageslb = [];
let imagesf = [];
let imageslf = [];


let counter = false;
let stop = false;

let currentvsingular = [];

let img1;
let k = 0;

let b = 0;
let counterb = false;

let randomcounter =0;
var org;
var arrorg = [];
var arrorg2 = [];

var ly = 3; var ly2 =4;

let f1 = 45; let f2 = 105; let f3 = 110;

let pcornice; let psatellites; let ptexture = []; let ptextures = []; let roofx; let roof1;
let ntext; let ntextlast;





const model = new rw.HostedModel({
  url: "https://maxxiboston2-2daa7481.hosted-models.runwayml.cloud/v1/",
});


function preload(){
    imgtest = loadImage('images/4.jpg');
    test = loadImage('images/File15.jpg');
    fontRegular = loadFont('assets/Roboto-Light.ttf');
    
}


function setup() {
  localStorage.removeItem("imgModel");  
  pixelDensity(1);
  createCanvas(w, h);
  var nb = int(random(8));
  
  for (i=0;i<16;i++){
      imagesb[i] = loadImage('images/back/'+i+'.png');
      imagesf[i] = loadImage('images/front/'+i+'.png');
  }
    
  back = loadImage('images/back/'+nb+'.png');
  front = loadImage('images/front/'+nb+'.png');
  inp = createInput('');
  inp.input(keyPressed);
  inp.size(0.1);
  noStroke();
  image(imgtest,0,0,w,h);
    
  outline = loadImage('maxresdefault.png'); // Load the image
  
    
  //images
  pcornice = loadImage('images/details/pcornices.png');
  psatellites = loadImage('images/details/psatellites.png'); //147 x 367
  roofx = loadImage('images/details/roofx.png');
  roof1 = loadImage('images/details/roof1.png');
  
  for (i=0;i<4;i++){
    ptexture[i] =   loadImage('images/details/ptexture' + i + '.jpg'); //206 x 617
  }
  for (i=0;i<4;i++){ 
    ptextures[i] =   loadImage('images/details/ptextures' + i + '.jpg'); //161 x 617
  }
    
  frameRate(6);
  createCanvas(w, h);
  video = createCapture(VIDEO);
    video.size(w, h);
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}


function draw() {
   
  //org = random(0,20);
  //print(org);
  inp.position(10,10); 
  image(video, 0, 0, 1.33*w, h); 
    
  var f1x ; var f1x; var f2x; var f2y;
  let currentFramePositions = [];  
  for (let i = 0; i < predictions.length; i += 1) {
  keypoints = predictions[i].scaledMesh;
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];
      fill(0);
      
      ellipse(x*2.27, y*2.27, 5, 5);
      currentvsingular = createVector(keypoints[j][0], keypoints[j][1], keypoints[j][2]);
      f1x = keypoints[234][0];f1y = keypoints[234][1];  f2x = keypoints[454][0]; f2y = keypoints[454][1]; 
    }
      
  }

  
  var facewi = int(dist(f1x, f1y, f2x, f2y));
  
  //print(facewi);                     
                        
  const dx = currentvsingular.x-lastPos.x;
  const dy = currentvsingular.y-lastPos.y;
  const dz = currentvsingular.z-lastPos.z;
  totalDistance = Math.sqrt(dx*dx + dy*dy + dz*dz);  
    

  
    
  //saving the face  
  if(totalDistance < 1.2 && millis() > 15000 && facewi > 120){  
    counterb = true;
    if (b == 1){
        save('face.jpg');
    }
  }
    
  if (millis()<15000){
      on = false;
  }  
  if(totalDistance < 1 && millis() > 15000 && facewi > 130){ 
    counter = true;
  }
  if(totalDistance > 1 && counter == false){
      on = false;
  }
    
    
    
  if (m < f2 && counter == true){
      on = true;
      totalDistance = 10;
  }else if(m > f2 && m < f3 && counter == true){
      on = false;
      totalDistance = 10;
  }else if (m> f3){
      counter = false;
      totalDistance = Math.sqrt(dx*dx + dy*dy + dz*dz);  
  }
    
    
 
    
  if (counter){
    m ++;
    counterb = false;
  } else {
    m = 0;
  }
    
  if (counterb){
    b ++;
  } else {
    b = 0;
  }
    

  

  //print(keypoints.length);
  console.log(m);
  //print(on);
  
  if (on){
    fill(0);
    rect(0,0,w,h);
    for (let i = 0; i < lastPredictions.length; i += 1) {
      const keypoints = lastPredictions[i].scaledMesh;

      for (let j = 0; j < keypoints.length; j += 1) {
        const [x, y] = keypoints[j];
        fill(0);
        ellipse(x*2.11, y*2.12, 3, 3);
      }
      fill(255);
      noStroke(); 
        
        
      
    r = rlast;
    numbi = numblast;
    ntext = ntextlast;
    arrorg2 = arrorg;
      
      const [nbx , nby] = keypoints[2];const [ntx , nty] = keypoints[6];//nose height
      const [nlx , nly] = keypoints[440];const [nrx , nry] = keypoints[220];//nose width
      const [mtx , mty] = keypoints[0];const [mbx , mby] = keypoints[17];//mouth height
      const [otx , oty] = keypoints[13];const [obx , oby] = keypoints[14];//mouth opening
      const [mlx , mly] = keypoints[61];const [mrx , mry] = keypoints[291];//mouth width
      const [jrx , jry] = keypoints[435];const [jlx , jly] = keypoints[215];//jaw form, height of jaw line 
      const [frx , fry] = keypoints[454];const [flx , fly] = keypoints[234];//face width
      const [furx , fury] = keypoints[389];const [fulx , fuly] = keypoints[162];//face width upper
      const [flrx , flry] = keypoints[361];const [fllx , flly] = keypoints[132];//face width lower
      const [ftx , fty] = keypoints[10];const [cx , cy] = keypoints[152];//face height
      const [elx , ely] = keypoints[362];const [erx , ery] = keypoints[263];//eye width, right
      const [etx , ety] = keypoints[386];const [ebx , eby] = keypoints[374];//eye height, right
      const [bx , by] = keypoints[334];//eye brow top
      const [ellx , elly] = keypoints[133];//eye separation, left eye inside
      
      
      //ellipse(mlx,mly,5,5); ellipse(mrx,mry,5,5);
      
      array[0] = int(dist(nbx, nby, ntx, ntx)); //nose height
      array[1] = int(dist(nlx, nly, nrx, nry)); //nose width
      array[2] = int(dist(mtx, mty, mbx, mby)); //mouth height
      array[3] = int(dist(otx, oty, obx, oby)); //mouth opening
      array[4] = int(dist(mlx, mly, mrx, mry)); //mouth width
      array[5] = -int(((jry-cy)+(jly-cy))/2) + int(((jrx - frx)+(jlx - flx))/2); //jaw line height 
      array[6] = int(dist(frx, fry, flx, fly)); //face width
      array[7] = int(dist(cx, cy, ftx, fty)); //face height
      array[8] = int(dist(elx, ely, erx, ery)); //eye width
      array[9] = int(dist(etx, ety, ebx, eby)); //eye height
      array[10] = int(dist(etx, ety, by, by)); //eye to brow height
      array[11] = int(dist(elx, ely, ellx, elly)); //eye separation
      array[12] = int(dist(furx, fury, fulx, fuly)); //face width upper
      array[13] = int(dist(flrx, flry, fllx, flly)); //face width lower
      array[14] = int(dist(nbx, nby, ftx, fty)); //nose to top of face
      array[15] = int(dist(bx,by,ftx,fty));  
      
        var bw = int((array[6]/array[7])*100); // facew > bldgw
        var bh = int((array[7]/array[6])*100); // faceh > bldgh
        var nw = int((array[4]/array[13])*100); // width of mouth > no of windows
        var ww = int(((array[9]/array[7])+(array[8]/array[12]))*100); // eyescale > width of windows
        var hw = int(((ww/100)*1.4)*100); // eyescale > heigh of windows
        var rr = int((array[13]/array[12])*100); // pointu ou round face > roundness of bays
        var nc = int((array[1]/array[6])*100); // nose width, if thin a lot of cornice > no of cornice
        var tc = int((array[10]/(array[10]+array[9]))*100); // eyebrow height > depth of cornice
        var np = int((array[3]/array[4])*100); // opening of mouth > no of column repetition 
        var nl = int((array[14]/array[7])*100); // nose height > no of balconies
        var ah = int((array[15]/array[7])*100); //
        var nn = int((array[0]/array[2])*100); // 
        var arrayx = [];
        arrayx.push(bw,bh,nw,ww,hw,rr,nc,tc,np,nl,ah,nn);
        //print(arrayx[7]);
          
        
          
        var botBuilding = int(h/5);
        noFill();
        fill(0);
        stroke(255);
        strokeWeight(s);
        //line(0,h-botBuilding,w,h-botBuilding);
        
        //remapping face width & height 
        var bldgWidth = map(bw,69,80,430,600); 
        var bldgHeight = map(bh,135,145,430,550); 
        var nowindows = int(map(nw,35,55,1,4));
        var windowWidth = int(ww,25,30,90,120)*1.5; 
        var windowHeight = windowWidth*2;
        var roundnessRatio = map(rr,90,97,0,4);
        var abscorn1 = int(map(nc,12,20,0,5)); var abscorn2 = abscorn1; // cornice repetition
        var corniceDef = map(tc,90,95,15,34);
        var abscol1 = int(map(np,0,17,2,12)); var abscol2 = abscol1; // column repetition
        var numberBalconies = int(map(nl,55,58,1,3));
        var absH = map(ah,20,40,-100,400);
        var unknown = map(nn,200,400,50,150);
        //print(corniceDef);
        var topLeftCornerX = int(w/2) - int(bldgWidth/2);
        var topLeftCornerY = h - botBuilding - bldgHeight;

        // for balconies
        var bldgHeightBal = bldgHeight*1.05;
        var topLeftCornerYBal = topLeftCornerY - (bldgHeightBal-bldgHeight);
        var b3y = topLeftCornerYBal;
        var b2y = topLeftCornerYBal + int((1/3)*bldgHeightBal);
        var b1y = topLeftCornerYBal + int((2/3)*bldgHeightBal);
        var b0y = topLeftCornerYBal + bldgHeightBal;
        
        var wb = int(bldgWidth*4/7)*(1.1);
        var xb = topLeftCornerX + int(bldgWidth*3/7);
        
        var wb2 = int(bldgWidth*4/10)*(1.2);
        var diff = 0.1*int(bldgWidth*4/10);
        var xb2 = topLeftCornerX + int(bldgWidth*3/10) - diff;
        
        var colw = 7;
        var floor = 10;
        
        //console.log(random(0,0.1*bldgWidth));
        background(0);
        //image(back,0,0,512,512);
        image(imagesb[numbi],0,0,w,h);
        
        // facade & bays
        if (bldgWidth < 500){
          
          
          
          //1 bay facade
          var Ax = topLeftCornerX; var Ay = topLeftCornerY - absH;
          var Bx = topLeftCornerX + int(bldgWidth*3/7); var By = topLeftCornerY - absH;
          var Cx = topLeftCornerX; var Cy = int(h*4/5);
          var Dx = topLeftCornerX + int(bldgWidth*3/7); var Dy = int(h*4/5);
          // rounded facade
          var Apx = Ax + int((1/3)*(bldgWidth*3/7)); var Apy = Ay - int(bldgHeight/20);
          var Bpx = Ax + int((2/3)*(bldgWidth*3/7)); var Bpy = By - int(bldgHeight/20);
          var Cpx = Ax + int((1/3)*(bldgWidth*3/7)); var Cpy = Cy + int(bldgHeight/30);
          var Dpx = Ax + int((2/3)*(bldgWidth*3/7)); var Dpy = Dy + int(bldgHeight/30);
          // left facade
          var Ex = Bx; var Ey = topLeftCornerY;
          var Fx = Bx + int(bldgWidth*4/7); var Fy = topLeftCornerY;
          
          // cornice points
          var cAx = Ax - (2/3)*corniceDef; var cApx = Apx; var cBpx = Bpx; var cBx = Bx + (2/3)*corniceDef;
          var cAy = Ay - corniceDef; var cApy = Apy - corniceDef; var cBpy = Bpy - corniceDef; var cBy = By - corniceDef;
          
          var cEx = Ex; var cEy = Ey - corniceDef;
          var cFx = Fx + (2/3)*corniceDef; var cFy = Fy - corniceDef;
          
          
          
          
          
          
          
          if (roundnessRatio > 2){ //rounded facade
            
            quad(Ax, Ay, Apx, Apy, Cpx, Cpy, Cx, Cy);
            quad(Apx, Apy, Bpx, Bpy, Dpx, Dpy, Cpx, Cpy);
            quad(Bpx, Bpy, Bx, By, Dx, Dy, Dpx, Dpy);
 
            
            // windows go here
            var wh = int(bldgWidth*3/7);
            var wW =  windowWidth*0.55;
            var wH = windowHeight *0.88;
            for (y = 0; y < 3; y += 1){
                for (x = 1; x < nowindows+1 ; x +=1){
                    var awx = Ax + ((1/(nowindows+1))*(wh))*x - (1/2)*wW;
                    var awy = Ay + (1/2)*(1/3)*bldgHeight + y*(1/3)*bldgHeight - (1/2)*wH;  
                    rect(awx,awy,wW, wH); 
                    rect(awx+1/8*wW, awy+1/10*wH, 6/8*wW, 3.5/10*wH);
                    rect(awx+1/8*wW, awy+5.5/10*wH, 6/8*wW, 3.5/10*wH);
                }
            }  
          
            
            // cornice definition
            fill(0);
            for (i = 0; i< abscorn2 +1; i+=1){
                
              line(cBx, cBy, cFx, cFy);
              line(cFx, cFy, Fx, Fy);
              
              //cornice
              beginShape();
              vertex(Ax, Ay+ 40*i);
              vertex(cAx, cAy + 40*i);
              vertex(cApx, cApy + 40*i);
              vertex(cBpx, cBpy + 40*i);
              vertex(cBx, cBy + 40*i);
              vertex(Bx, By + 40*i);
              vertex(Bpx, Bpy +40*i);
              vertex(Apx, Apy + 40*i);
              endShape(CLOSE);
              
              //cornice thickness c
              beginShape();
              vertex(cAx,cAy + 40*i);
              vertex(cAx,cAy - 2*c + 40*i); 
              vertex(cApx,cApy - 2*c + 40*i);
              vertex(cBpx,cBpy - 2*c + 40*i);
              vertex(cBx,cBy - 2*c + 40*i);
              vertex(cBx, cBy + 40*i);
              vertex(cBpx, cBpy + 40*i);
              vertex(cApx, cApy + 40*i);
              endShape(CLOSE);
                
              //cornice thickness c
              beginShape();
              vertex(cAx,cAy + 40*i);
              vertex(cAx,cAy - c + 40*i); 
              vertex(cApx,cApy - c + 40*i);
              vertex(cBpx,cBpy - c + 40*i);
              vertex(cBx,cBy - c + 40*i);
              vertex(cBx, cBy + 40*i);
              vertex(cBpx, cBpy + 40*i);
              vertex(cApx, cApy + 40*i);
              endShape(CLOSE);
                
              // 80 x 23
              
              //image(pcornice, Bpx - 53, Bpy - 20 + 40*i, 53, 23);
            

            }

            
          }else{ // flat facade
            quad(Ax,Ay,Bx,By,Dx,Dy,Cx,Cy);
              
            
            for(i=0;i<390;i+=1){
                strokeWeight(ts);
                line(Ax+3 + arrorg2[i],Ay+3+ly*i,Bx-3 - arrorg2[i],By+3+ly*i);

            } 
            image(ptexture[ntext],Ax+3,Ay+3);
            strokeWeight(t);
            
            var wh = int(bldgWidth*3/7);
            // -------------------------------------- windows go here
            for (y = 0 ; y < 3; y +=1){
                for (x = 1; x < nowindows+1 ; x +=1){
                    var awx = Ax + ((1/(nowindows+1))*(wh))*x - (1/2)*windowWidth;
                    var awy = Ay + (1/2)*(1/3)*bldgHeight + y*(1/3)*bldgHeight - (1/2)*windowHeight; 
                    rect(awx,awy,windowWidth, windowHeight); 
                    rect(awx+1/8*windowWidth, awy+1/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                    rect(awx+1/8*windowWidth, awy+5.5/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                }
            }  
              
              
            // -------------------------------------- cornice & thickness c

            quad(Ax,Ay,cAx,cAy,cBx,cBy,Bx,By);
            quad(cAx,cAy,cAx,cAy-2*c,cBx,cBy-2*c,cBx,cBy);
            quad(cAx,cAy,cAx,cAy-c,cBx,cBy-c,cBx,cBy);
              
              
            quad(Ex,Ey,cEx,cEy,cFx,cFy,Fx,Fy);
            quad(cEx,cEy,cEx,cEy-2*c,cFx,cFy-2*c,cFx,cFy);
            quad(cEx,cEy,cEx,cEy-c,cFx,cFy-c,cFx,cFy);
            
              
            //pcornice from image  
            for (i = 0; i< int((Fx-Ex)/53); i+=1){
                image(pcornice, Ex +i*53, Ey - 17, 53, 23); 
            }
            
            // cornice & thickness c
            if (unknown <100){
              fill(0);
              for (i = 0; i< abscorn2 +1; i+=1){
                quad(Ax,Ay +40*i,cAx,cAy +40*i,cBx,cBy +40*i,Bx,By +40*i);
                quad(cAx,cAy + 40*i,cAx,cAy-c + 40*i,cBx,cBy-c + 40*i,cBx,cBy + 40*i);
                quad(cAx,cAy + 40*i,cAx,cAy-2*c + 40*i,cBx,cBy-2*c + 40*i,cBx,cBy + 40*i);
                for (j = 0; j< int((Bx-Ax)/53); j+=1){
                    image(pcornice, Ax +j*53, Ay - 17 +40*i, 53, 23); 
                }
              }
            }else{
              quad(Ax,Ay,cAx,cAy,cBx,cBy,Bx,By);
              quad(cAx,cAy,cAx,cAy-2*c,cBx,cBy-2*c,cBx,cBy);
              quad(cAx,cAy,cAx,cAy-c,cBx,cBy-c,cBx,cBy);
              for (i = 0; i< int((Bx-Ax)/53); i+=1){
                image(pcornice, Ax +i*53, Ay - 17, 53, 23); 
              }
              
            }
            
          }
          
            
          image(psatellites, Fx,  Fy+40, 147, 367);  
            
          var f1x =  topLeftCornerX + int(bldgWidth*3/7);
          var f1y = topLeftCornerY;
          var f2x = topLeftCornerX + int(bldgWidth*3/7)+int(bldgWidth*4/7);
          var f2y = topLeftCornerY;
          // ------------------------------------------------ the flat facade
          rect(topLeftCornerX + int(bldgWidth*3/7), topLeftCornerY, int(bldgWidth*4/7), bldgHeight);
          
          
              
          for(i=0;i<390;i+=1){
                strokeWeight(ts);
                line(f1x+3 + arrorg2[i],f1y+3+ly*i,f2x-3 - arrorg2[i],f2y+3+ly*i);
           } 
          image(ptexture[ntext],f1x+3,f1y+3); image(ptexture[ntext],f2x-3-206,f1y+3);
          
          
            
          //roof goes here: with a condition. if roundnessratio < 1
          
            
            
          strokeWeight(t);

          var whf = int(bldgWidth*4/7);
          // ------------------------------------------------ windows go here
          for (y = 1; y < 3; y += 1){
              for (x = 1; x < nowindows+1 ; x +=1){
                var bwx = Bx + ((1/(nowindows+1))*(whf))*x - (1/2)*windowWidth;
                var bwy = By + (1/2)*(1/3)*bldgHeight + y*(1/3)*bldgHeight - (1/2)*windowHeight; 
                rect(bwx,bwy,windowWidth, windowHeight);
                rect(bwx+1/8*windowWidth, bwy+1/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                rect(bwx+1/8*windowWidth, bwy+5.5/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
              }
          }
            

          
          fill(0);
          
          var c1x = xb; var c1y = b3y; var c2x = xb; var c2y = b3y - 1.3*corniceDef; 
          var c3x = xb + wb + colw + 0.8*corniceDef; var c3y = b3y - 1.3*corniceDef;
          var c4x = xb + wb + colw; var c4y = b3y;
            
          // ------------------------------------------------ balconies go here
          if(numberBalconies == 1){
            fill(0);

            rect(xb, b3y, wb + colw,  int((2/3)*bldgHeightBal));   
            quad(c1x,c1y,c2x,c2y,c3x,c3y,c4x,c4y);
            quad(c2x,c2y,c2x,c2y-2*c,c3x,c3y-2*c,c3x,c3y);
            quad(c2x,c2y,c2x,c2y-c,c3x,c3y-c,c3x,c3y);
            
            //horizontal lines  
            var numb = (int((2/3)*bldgHeightBal))/ly;
            
            for(i=0;i<numb;i+=1){
                strokeWeight(ts);
                line(xb+3+ arrorg2[i], b3y+3+ly*i, xb+wb+colw-3 - arrorg2[i], b3y+3+ly*i);
            } 
            
            strokeWeight(t);
            image(ptexture[ntext],xb+3,b3y+3); image(ptexture[ntext],xb+wb+colw-3 - 206,b3y+3); 
              
            //window
              
            for (x = 1; x < nowindows+1 ; x +=1){
                var xw2 = xb + ((1/(nowindows+1))*(wb+colw))*x - (1/2)*windowWidth;
                var yw2 = b3y + (1/2)*(1/3)*bldgHeightBal - (1/2)*windowHeight; 
                var yww2 = b2y + (1/2)*(1/3)*bldgHeightBal - (1/2)*windowHeight;  
                rect(xw2,yw2,windowWidth, windowHeight); 
                rect(xw2,yww2,windowWidth, windowHeight);
                rect(xw2+1/8*windowWidth, yw2+1/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                rect(xw2+1/8*windowWidth, yw2+5.5/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                rect(xw2+1/8*windowWidth, yww2+1/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                rect(xw2+1/8*windowWidth, yww2+5.5/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
            }
            //var xw2 = xb + (1/2)*(wb + colw) - (1/2)*windowWidth;
            
            
            
            //railing 
            for(i=0;i<21;i+=1){
              rect(xb+i*(1/21)*wb,b1y + (1/2)*int((1/3)*bldgHeightBal), colw/3, (1/2)*int((1/3)*bldgHeightBal));
            }
            rect(xb, b1y + (1/2)*int((1/3)*bldgHeightBal) - floor/3, wb + colw, floor/3);

            //columns  
            for(i=0;i<abscol1+1;i+=1){
              rect(xb+i*(1/abscol1)*wb,b1y, colw, int((1/3)*bldgHeightBal));
            }
            
            rect(xb, b0y - floor, wb + colw, floor);
            
          }else if (numberBalconies == 2){
            rect(xb, b3y, wb + colw,  int((1/3)*bldgHeightBal));  
            quad(xb,b3y, xb, b3y - 1.3*corniceDef, xb + wb + colw + 0.8*corniceDef, b3y - 1.3*corniceDef, xb + wb + colw, b3y);
            quad(c1x,c1y,c2x,c2y,c3x,c3y,c4x,c4y);
            quad(c2x,c2y,c2x,c2y-2*c,c3x,c3y-2*c,c3x,c3y);
            quad(c2x,c2y,c2x,c2y-c,c3x,c3y-c,c3x,c3y);
              
              
            //horizontal lines  
            var numb = (int((1/3)*bldgHeightBal))/ly;
            
            for(i=0;i<numb;i+=1){

                strokeWeight(ts);
                line(xb+3 + arrorg2[i] ,b3y+3+ly*i,xb+wb+colw-3 - arrorg2[i],b3y+3+ly*i);
            } 
             
            strokeWeight(t);
              
            //window
            //var xw = xb + (1/2)*(wb + colw) - (1/2)*windowWidth;
            for (x = 1; x < nowindows+1 ; x +=1){
                var xw = xb + ((1/(nowindows+1))*(wb+colw))*x - (1/2)*windowWidth;
                var yw = b3y + (1/2)*(1/3)*bldgHeightBal - (1/2)*windowHeight;        
                rect(xw,yw,windowWidth, windowHeight);
                rect(xw+1/8*windowWidth, yw+1/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                rect(xw+1/8*windowWidth, yw+5.5/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
            }  
              
              
            //railing
            for(i=0;i<21;i+=1){
              rect(xb+i*(1/21)*wb,b2y + (1/2)*int((1/3)*bldgHeightBal), colw/3, (1/2)*int((1/3)*bldgHeightBal));
              rect(xb+i*(1/21)*wb,b1y + (1/2)*int((1/3)*bldgHeightBal), colw/3, (1/2)*int((1/3)*bldgHeightBal));
            }
            rect(xb, b2y + (1/2)*int((1/3)*bldgHeightBal) - floor/3, wb + colw, floor/3);
            rect(xb, b1y + (1/2)*int((1/3)*bldgHeightBal) - floor/3, wb + colw, floor/3);

            //columns 
            for(i=0;i<abscol1+1;i+=1){
              rect(xb+i*(1/abscol1)*wb,b2y, colw, int((2/3)*bldgHeightBal));
            }
            rect(xb, b1y - floor, wb + colw, floor);
            rect(xb, b0y - floor, wb + colw, floor);
            
          }else if (numberBalconies == 3){  
            quad(xb,b3y, xb, b3y - 1.3*corniceDef, xb + wb + colw + 0.8*corniceDef, b3y - 1.3*corniceDef, xb + wb + colw, b3y);
            quad(c1x,c1y,c2x,c2y,c3x,c3y,c4x,c4y);
            quad(c2x,c2y,c2x,c2y-2*c,c3x,c3y-2*c,c3x,c3y);
            quad(c2x,c2y,c2x,c2y-c,c3x,c3y-c,c3x,c3y);
            
              
            //railing
            for(i=0;i<21;i+=1){
              rect(xb+i*(1/21)*wb,b3y + (1/2)*int((1/3)*bldgHeightBal), colw/3, (1/2)*int((1/3)*bldgHeightBal));
              rect(xb+i*(1/21)*wb,b2y + (1/2)*int((1/3)*bldgHeightBal), colw/3, (1/2)*int((1/3)*bldgHeightBal));
              rect(xb+i*(1/21)*wb,b1y + (1/2)*int((1/3)*bldgHeightBal), colw/3, (1/2)*int((1/3)*bldgHeightBal));
            }
            rect(xb, b2y + (1/2)*int((1/3)*bldgHeightBal) - floor/3, wb + colw, floor/3);
            rect(xb, b1y + (1/2)*int((1/3)*bldgHeightBal) - floor/3, wb + colw, floor/3);
            rect(xb, b3y + (1/2)*int((1/3)*bldgHeightBal) - floor/3, wb + colw, floor/3);

            
            for(i=0;i<abscol1+1;i+=1){
              rect(xb+i*(1/abscol1)*wb,b3y, colw, int(bldgHeightBal));
            }
            rect(xb, b2y - floor, wb + colw, floor);
            rect(xb, b1y - floor, wb + colw, floor);
            rect(xb, b0y - floor, wb + colw, floor);

          }

          
          //if bldgWidth >300 then its the two bays
        }else{ 
          
          //2 bay facade bay left
          var Rx = topLeftCornerX; var Ry = topLeftCornerY ;
          var Ox = topLeftCornerX + int(bldgWidth*3/10); var Oy = topLeftCornerY ;
          var Mx = topLeftCornerX; var My = int(h*4/5);
          var Yx = topLeftCornerX + int(bldgWidth*3/10); var Yy = int(h*4/5);
          // points for rounded facade 
          var Rpx = Rx + int((1/3)*(bldgWidth*3/10)); var Rpy = Ry - int(bldgHeight/20);
          var Opx = Rx + int((2/3)*(bldgWidth*3/10)); var Opy = Oy - int(bldgHeight/20);
          var Mpx = Rx + int((1/3)*(bldgWidth*3/10)); var Mpy = My + int(bldgHeight/30);
          var Ypx = Rx + int((2/3)*(bldgWidth*3/10)); var Ypy = Yy + int(bldgHeight/30);
          
          //2 bay facade bay right
          var Ix = topLeftCornerX + int(bldgWidth*3/10) + int(bldgWidth*4/10); var Iy = topLeftCornerY - absH;
          var Jx = topLeftCornerX + int(bldgWidth*3/10)*2 + int(bldgWidth*4/10); var Jy = topLeftCornerY - absH;
          var Kx = topLeftCornerX + int(bldgWidth*3/10) + int(bldgWidth*4/10); var Ky = int(h*4/5);
          var Lx = topLeftCornerX + int(bldgWidth*3/10)*2 + int(bldgWidth*4/10); var Ly = int(h*4/5);
          // points for rounded facade
          var Ipx = Ix + int((1/3)*(bldgWidth*3/10)); var Ipy = Iy - int(bldgHeight/20);
          var Jpx = Ix + int((2/3)*(bldgWidth*3/10)); var Jpy = Jy - int(bldgHeight/20);
          var Kpx = Ix + int((1/3)*(bldgWidth*3/10)); var Kpy = Ky + int(bldgHeight/30);
          var Lpx = Ix + int((2/3)*(bldgWidth*3/10)); var Lpy = Ly + int(bldgHeight/30);
          
          // cornice points left 
          var cRx = Rx - (2/3)*corniceDef; var cRpx = Rpx; var cOpx = Opx; var cOx = Ox + (2/3)*corniceDef;
          var cRy = Ry - corniceDef; var cRpy = Rpy - corniceDef; var cOpy = Opy - corniceDef; var cOy = Oy - corniceDef;
          // cornice points right
          var cIx = Ix - (2/3)*corniceDef; var cIpx = Ipx; var cJpx = Jpx; var cJx = Jx + (2/3)*corniceDef;
          var cIy = Iy - corniceDef; var cIpy = Ipy - corniceDef; var cJpy = Jpy - corniceDef; var cJy = Jy - corniceDef;
          
          
          if (roundnessRatio >2){
            // first bay
            quad(Rx, Ry, Rpx, Rpy, Mpx, Mpy, Mx, My);
            quad(Rpx, Rpy, Opx, Opy, Ypx, Ypy, Mpx, Mpy);
            quad(Opx, Opy, Ox, Oy, Yx, Yy, Ypx, Ypy);
            
            //windows go here
            
            var whm2 = int(bldgWidth*3/10);
            var wW = windowWidth*0.8;
            var wH = windowHeight*0.8;
              
            // -------------------------------------- windows go here
            for (y = 0; y < 3; y += 1){
              var rwx = Rx + (1/2)*(whm2) - (1/2)*wW;
              var rwy = Ry + (1/2)*(1/3)*bldgHeight + y*(1/3)*bldgHeight - (1/2)*wH;  
              rect(rwx,rwy,wW, wH); 
              rect(rwx+1/8*wW, rwy+1/10*wH, 6/8*wW, 3.5/10*wH);
              rect(rwx+1/8*wW, rwy+5.5/10*wH, 6/8*wW, 3.5/10*wH);
                
            }  
              

              
            // second bay
            quad(Ix, Iy, Ipx, Ipy, Kpx, Kpy, Kx, Ky);
            quad(Ipx, Ipy, Jpx, Jpy, Lpx, Lpy, Kpx, Kpy);
            quad(Jpx, Jpy, Jx, Jy, Lx, Ly, Lpx, Lpy);
            
            //windows go here
              
            var whm2 = int(bldgWidth*3/10);
            var wW = windowWidth*0.5;
            var wH = windowHeight*0.8;
            // -------------------------------------- windows go here whm2
            for (y = 0; y < 3; y += 1){  
                for (x = 1; x < nowindows+1 ; x +=1){
                    var iwx = Ix + ((1/(nowindows+1))*(whm2))*x - (1/2)*wW;
                    var iwy = Iy + (1/2)*(1/3)*bldgHeight + y*(1/3)*bldgHeight - (1/2)*wH;         
                    rect(iwx,iwy,wW,wH);
                    rect(iwx+1/8*wW, iwy+1/10*wH, 6/8*wW, 3.5/10*wH);
                    rect(iwx+1/8*wW, iwy+5.5/10*wH, 6/8*wW, 3.5/10*wH);
                }
            } 
            
              
            // cornices & thickness C
            
            fill(0);
            for (i = 0; i< abscorn1 +1; i+=1){         

                
              // ROMY side  
                
              beginShape();
              vertex(Rx, Ry+ 40*i);
              vertex(cRx, cRy + 40*i);
              vertex(cRpx, cRpy + 40*i);
              vertex(cOpx, cOpy + 40*i);
              vertex(cOx, cOy + 40*i);
              vertex(Ox, Oy + 40*i);
              vertex(Opx, Opy +40*i);
              vertex(Rpx, Rpy + 40*i);
              endShape(CLOSE);
                
              //cornice thickness c
              beginShape();
              vertex(cRx,cRy+ 40*i);
              vertex(cRx,cRy - 2*c + 40*i);
              vertex(cRpx, cRpy - 2*c + 40*i);
              vertex(cOpx, cOpy - 2*c + 40*i); 
              vertex(cOx, cOy - 2*c + 40*i);
              vertex(cOx, cOy + 40*i);
              vertex(cOpx, cOpy + 40*i);
              vertex(cRpx, cRpy + 40*i);
              endShape(CLOSE);
                
              //cornice thickness c
              beginShape();
              vertex(cRx,cRy+ 40*i);
              vertex(cRx,cRy - c + 40*i);
              vertex(cRpx, cRpy - c + 40*i);
              vertex(cOpx, cOpy - c + 40*i); 
              vertex(cOx, cOy - c + 40*i);
              vertex(cOx, cOy + 40*i);
              vertex(cOpx, cOpy + 40*i);
              vertex(cRpx, cRpy + 40*i);
              endShape(CLOSE);  
            
                
              // IJKL side
                
              beginShape();
              vertex(Ix, Iy+ 40*i);
              vertex(cIx, cIy + 40*i);
              vertex(cIpx, cIpy + 40*i);
              vertex(cJpx, cJpy + 40*i);
              vertex(cJx, cJy + 40*i);
              vertex(Jx, Jy + 40*i);
              vertex(Jpx, Jpy +40*i);
              vertex(Ipx, Ipy + 40*i);
              endShape(CLOSE);
                
            
              //cornice thickness c
              beginShape();
              vertex(cIx,cIy+ 40*i);
              vertex(cIx,cIy - 2*c + 40*i);
              vertex(cIpx, cIpy - 2*c + 40*i);
              vertex(cJpx, cJpy - 2*c + 40*i); 
              vertex(cJx, cJy - 2*c + 40*i);
              vertex(cJx, cJy + 40*i);
              vertex(cJpx, cJpy + 40*i);
              vertex(cIpx, cIpy + 40*i);
              endShape(CLOSE);
            
              //cornice thickness c
              beginShape();
              vertex(cIx,cIy+ 40*i);
              vertex(cIx,cIy - c + 40*i);
              vertex(cIpx, cIpy - c + 40*i);
              vertex(cJpx, cJpy - c + 40*i); 
              vertex(cJx, cJy - c + 40*i);
              vertex(cJx, cJy + 40*i);
              vertex(cJpx, cJpy + 40*i);
              vertex(cIpx, cIpy + 40*i);
              endShape(CLOSE);
                
            

            }
            
            
            
            
            
            
          }else{
            quad(Rx,Ry,Ox,Oy,Yx,Yy,Mx,My);
            quad(Ix,Iy,Jx,Jy,Lx,Ly,Kx,Ky);
              
            //pcornice from image  
            for (i = 0; i< int((Ox-Rx)/53); i+=1){
                image(pcornice, Rx +i*53, Ry - 17, 53, 23); 
            }  
              
            for (i = 0; i< int((Jx-Ix)/53); i+=1){
                image(pcornice, Ix +i*53, Iy - 17, 53, 23); 
            } 
              
            //horizontal lines  
            var numb = int(h*4/5)/ly;
            
            for(i=0;i<numb+100;i+=1){
                strokeWeight(ts);
                line(Rx+3 + arrorg2[i] ,Ry+3+ly*i,Ox-3 - arrorg2[i],Oy+3+ly*i);
            }
            image(ptextures[ntext],Rx+3,Ry+3);
            strokeWeight(t);
              
            
            
            for(i=0;i<numb+100;i+=1){
                strokeWeight(ts);
                line(Ix+3 + arrorg2[i] ,Iy+3+ly*i,Jx-3 - arrorg2[i],Jy+3+ly*i);
            } 
            image(ptextures[ntext],Jx-3-161,Jy+3);
            strokeWeight(t);


            var whm2 = int(bldgWidth*3/10);
            // -------------------------------------- windows go here
            for (y = 0; y < 3; y += 1){
                for (x = 1; x < nowindows+1 ; x +=1){
                    var rwx = Rx + ((1/(nowindows+1))*(whm2))*x - (1/2)*windowWidth;
                    var rwy = Ry + (1/2)*(1/3)*bldgHeight + y*(1/3)*bldgHeight - (1/2)*windowHeight;  
                    var iwx = Ix + ((1/(nowindows+1))*(whm2))*x - (1/2)*windowWidth;
                    var iwy = Iy + (1/2)*(1/3)*bldgHeight + y*(1/3)*bldgHeight - (1/2)*windowHeight;             
                    rect(rwx,rwy,windowWidth, windowHeight); 
                    rect(rwx+1/8*windowWidth, rwy+1/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                    rect(rwx+1/8*windowWidth, rwy+5.5/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                    rect(iwx,iwy,windowWidth, windowHeight); 
                    rect(iwx+1/8*windowWidth, iwy+1/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                    rect(iwx+1/8*windowWidth, iwy+5.5/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                }
            }
            
                         
              
              
            // cornice definition & thickness c
                        
            fill(0);
            for (i = 0; i< abscorn1 +1; i+=1){
              quad(Rx,Ry +40*i,cRx,cRy +40*i,cOx,cOy +40*i,Ox,Oy +40*i);
              quad(cRx, cRy + 40*i, cRx, cRy - 2*c + 40*i, cOx, cOy - 2*c + 40*i, cOx,cOy + 40*i);
              quad(cRx, cRy + 40*i, cRx, cRy - c + 40*i, cOx, cOy - c + 40*i, cOx,cOy + 40*i);
              quad(Ix,Iy +40*i,cIx,cIy +40*i,cJx,cJy +40*i,Jx,Jy +40*i);
              quad(cIx, cIy + 40*i, cIx, cIy - 2*c + 40*i, cJx, cJy - 2*c + 40*i, cJx,cJy + 40*i);
              quad(cIx, cIy + 40*i, cIx, cIy - c + 40*i, cJx, cJy - c + 40*i, cJx,cJy + 40*i);
                
              for (j = 0; j< int((Ox-Rx)/53); j+=1){
                image(pcornice, Rx +j*53, Ry - 17 +40*i, 53, 23); 
              }  
              
              for (j = 0; j< int((Jx-Ix)/53); j+=1){
                image(pcornice, Ix +j*53, Iy - 17 +40*i, 53, 23); 
              }  

            }          
          }
          rect(topLeftCornerX + int(bldgWidth*3/10), topLeftCornerY, int(bldgWidth*4/10), bldgHeight);
          
          var r1x = topLeftCornerX + int(bldgWidth*3/10);
          var r1y = topLeftCornerY;
          var r2x = r1x + int(bldgWidth*4/10);
            
          //horizontal lines  
          var numb = bldgHeight/ly;
          
          for(i=0;i<numb;i+=1){
            strokeWeight(ts);
            line(r1x+3 + arrorg2[i] ,r1y+3+ly*i,r2x-3 - arrorg2[i],r1y+3+ly*i);
            //line(r1x+3 + arrorg2[i] ,r1y+3+7*i,r2x-3 - arrorg2[i],r1y+3+7*i);
          } 
          
          strokeWeight(t);

          
          var whf2 = int(bldgWidth*4/10);
          // -------------------------------------- windows go here
          for (y = 0; y < 4; y += 1){
              for (x = 1; x < nowindows+1 ; x +=1){
                var Owx = Ox + ((1/(nowindows+1))*(whf2))*x - (1/2)*windowWidth;
                var Owy = Oy + (1/2)*(1/3)*bldgHeight + y*(1/3)*bldgHeight - (1/2)*windowHeight;  
                rect(Owx,Owy,windowWidth, windowHeight); 
                rect(Owx+1/8*windowWidth, Owy+1/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                rect(Owx+1/8*windowWidth, Owy+5.5/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
              }
          }
            
          var c1x = xb2; var c1y = b3y; var c2x = xb2 - 0.8*corniceDef; var c2y = b3y - 1.3*corniceDef; 
          var c3x = xb2 + wb2 + colw + 0.8*corniceDef; var c3y = b3y - 1.3*corniceDef;
          var c4x = xb2 + wb2 + colw; var c4y = b3y;  
          
          fill(0);         
          // ------------------------------------------------ balconies go here         
          if(numberBalconies == 1){
            fill(0);
            rect(xb2, b3y, wb2 + colw,  int((2/3)*bldgHeightBal));
            
            //horizontal lines  
            var numb = int((2/3)*bldgHeightBal)/ly;
            
            for(i=0;i<numb;i+=1){
              strokeWeight(ts);
              line(xb2+3 + arrorg2[i],b3y+3+ly*i,xb2 + wb2 + colw-3 - arrorg2[i],b3y+3+ly*i);
            } 
            
            strokeWeight(t);
              
              
            quad(c1x,c1y,c2x,c2y,c3x,c3y,c4x,c4y);
            quad(c2x,c2y,c2x,c2y-2*c,c3x,c3y-2*c,c3x,c3y);
            quad(c2x,c2y,c2x,c2y-c,c3x,c3y-c,c3x,c3y);
            
            //window
            for (x = 1; x < nowindows+1 ; x +=1){  
                var xcw2 = xb2 + ((1/(nowindows+1))*(wb2 + colw))*x - (1/2)*windowWidth;
                var ycw2 = b3y + (1/2)*(1/3)*bldgHeightBal - (1/2)*windowHeight;  
                var ycww2 = b2y + (1/2)*(1/3)*bldgHeightBal - (1/2)*windowHeight;  
                rect(xcw2,ycw2,windowWidth, windowHeight); 
                rect(xcw2+1/8*windowWidth, ycw2+1/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                rect(xcw2+1/8*windowWidth, ycw2+5.5/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                rect(xcw2,ycww2,windowWidth, windowHeight);
                rect(xcw2+1/8*windowWidth, ycww2+1/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                rect(xcw2+1/8*windowWidth, ycww2+5.5/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
            }

            
            for(i=0;i<21;i+=1){
              rect(xb2+i*(1/21)*wb2,b1y + (1/2)*int((1/3)*bldgHeightBal) , colw/3, (1/2)*int((1/3)*bldgHeightBal));
            } 
            rect(xb2, b1y + (1/2)*int((1/3)*bldgHeightBal) - floor/3, wb2 + colw, floor/3);
            for(i=0;i<abscol2 +1;i+=1){
              rect(xb2+i*(1/abscol2)*wb2,b1y, colw, int((1/3)*bldgHeightBal));
            }
            rect(xb2, b0y - floor, wb2 + colw, floor);
            
          }else if (numberBalconies == 2){
            fill(0);
            rect(xb2, b3y, wb2 + colw,  int((1/3)*bldgHeightBal)); 

            //horizontal lines  
            var numb = int((1/3)*bldgHeightBal)/ly;
            
              for(i=0;i<numb;i+=1){
                strokeWeight(ts);
                line(xb2+3 + arrorg2[i],b3y+3+ly*i,xb2 + wb2 + colw-3 - arrorg2[i],b3y+3+ly*i);
              } 
            
            strokeWeight(t);
                
              
            quad(c1x,c1y,c2x,c2y,c3x,c3y,c4x,c4y);
            quad(c2x,c2y,c2x,c2y-2*c,c3x,c3y-2*c,c3x,c3y);
            quad(c2x,c2y,c2x,c2y-c,c3x,c3y-c,c3x,c3y);
            
            //window
            for (x = 1; x < nowindows+1 ; x +=1){
                var xcw = xb2 + ((1/(nowindows+1))*(wb2 + colw))*x - (1/2)*windowWidth;
                var ycw = b3y + (1/2)*(1/3)*bldgHeightBal - (1/2)*windowHeight;  
                rect(xcw,ycw,windowWidth, windowHeight); 
                rect(xcw+1/8*windowWidth, ycw+1/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
                rect(xcw+1/8*windowWidth, ycw+5.5/10*windowHeight, 6/8*windowWidth, 3.5/10*windowHeight);
            }
            
            
            
            for(i=0;i<21;i+=1){
              rect(xb2+i*(1/21)*wb2,b2y + (1/2)*int((1/3)*bldgHeightBal) , colw/3, (1/2)*int((1/3)*bldgHeightBal));
              rect(xb2+i*(1/21)*wb2,b2y + int((1/3)*bldgHeightBal) + (1/2)*int((1/3)*bldgHeightBal) , colw/3, (1/2)*int((1/3)*bldgHeightBal));
            }
            rect(xb2, b1y + (1/2)*int((1/3)*bldgHeightBal) - floor/3, wb2 + colw, floor/3);
            rect(xb2, b2y + (1/2)*int((1/3)*bldgHeightBal) - floor/3, wb2 + colw, floor/3);
            for(i=0;i<abscol2 +1;i+=1){
              rect(xb2+i*(1/abscol2)*wb2,b2y, colw, int((2/3)*bldgHeightBal));
            }
            rect(xb2, b1y - floor, wb2 + colw, floor);
            rect(xb2, b0y - floor, wb2 + colw, floor);
            
          }else if (numberBalconies > 2){  
            fill(0);
            
            quad(c1x,c1y,c2x,c2y,c3x,c3y,c4x,c4y);
            quad(c2x,c2y,c2x,c2y-2*c,c3x,c3y-2*c,c3x,c3y);
            quad(c2x,c2y,c2x,c2y-c,c3x,c3y-c,c3x,c3y);
              
            
            for(i=0;i<21;i+=1){
              rect(xb2+i*(1/21)*wb2,b3y + (1/2)*int((1/3)*bldgHeightBal) , colw/3, (1/2)*int((1/3)*bldgHeightBal));
              rect(xb2+i*(1/21)*wb2,b3y + int((1/3)*bldgHeightBal) + (1/2)*int((1/3)*bldgHeightBal) , colw/3, (1/2)*int((1/3)*bldgHeightBal));
              rect(xb2+i*(1/21)*wb2,b3y + int((2/3)*bldgHeightBal) + (1/2)*int((1/3)*bldgHeightBal) , colw/3, (1/2)*int((1/3)*bldgHeightBal));
            } 
            rect(xb2, b3y + (1/2)*int((1/3)*bldgHeightBal) - floor/3, wb2 + colw, floor/3);
            rect(xb2, b2y + (1/2)*int((1/3)*bldgHeightBal) - floor/3, wb2 + colw, floor/3);
            rect(xb2, b1y + (1/2)*int((1/3)*bldgHeightBal) - floor/3, wb2 + colw, floor/3);
            
            for(i=0;i<abscol2 +1;i+=1){
              rect(xb2+i*(1/abscol2)*wb2,b3y, colw, int(bldgHeightBal));
            }
            rect(xb2, b2y - floor, wb2 + colw, floor);
            rect(xb2, b1y - floor, wb2 + colw, floor);
            rect(xb2, b0y - floor, wb2 + colw, floor);

          }          
        }
        fill(0);
        noStroke();
        rect(0,(4/5)*h + 10 , w,(1/5)*h);
          

      }
    

    image(imagesf[numbi],0,0,w,h);
      
      if(m>f1 && m<f2+2){
          background(0);
          textSize(24);
          fill(255);
          text("Your body-home will be added to a growing collective of",210,400);
          text("body-homes to produce a digital urbanism. The body-homes",210,450);
          text("you see on the wall in front of you are a record of the",210,500);
          text("individuals who have contributed to this collective over ",210,550);
          text("the past weeks.",210,600);
      }


    
  }else{

    
    rlast = int(random(0.4,1.5));
      
    numblast = int(random(0,15));  
    
    ntextlast = int(random(0,3));  
      
     
    image(outline, int(w/3), int(w/4),int(w/3),int(w/2)); 
      
     
    for (i = 0; i<400; i+=1){
        arrorg.push(random(0,20));
    } 
      
    
    
    textSize(36);
    textFont(fontRegular);
    fill(0);
    rect(260,118,520,40);
    fill(255);
    text('Stay still to capture your facade',270,150);
    
    for (var i = 0; i < predictions.length; i++) {
      lastPredictions[i] = predictions[i];
    }
  }
    
    
    
    
    
  lastPos = currentvsingular;
    
  let showImg; 
    
 
        
  if(m==2){
      getImageFromRunway();  
    }
    
    const imgModel = localStorage.getItem("imgModel");

    if (imgModel) {
        showImg = createImg(imgModel, "");
        if (m < f1+1) {
            showImg.show();
            showImg.position(0,0);
            image(showImg, 0, 0, w,h);
            if (m==f1-3){
                //const imgDownload = imgModel.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
                //window.open(imgModel);
                k++;
                const a = document.createElement("a"); //Create <a>
                a.href = imgModel;
                a.download = "img.jpg"; //File name Here
                a.click(); //Downloaded file
                
            }

        }else{
            localStorage.removeItem("imgModel");
            document.querySelectorAll("img").forEach(e => e.parentNode.removeChild(e));
        }
    } 
    
    
    
    
    
    

    
    
}





function falseTrigger() {
  on = false;
}
    
function keyPressed() {
  if (keyCode === RETURN) {
    on = true;
  } else if (keyCode === BACKSPACE) {
    on = false;
    runway = false;
    loop();
  }
  if (keyCode == ESCAPE){
    amsterdam = true;
    beirut = false;
    boston = false;
    console.log("Amsterdam");
  }
  if (keyCode == TAB){
    amsterdam = false;
    beirut = true;
    boston = false;
    console.log("Beirut");
  }
  if (keyCode == SHIFT){
    
    amsterdam = false;
    beirut = false;
    boston = true;
    console.log("Boston");
  }
  if(keyCode === UP_ARROW){
    //getImageFromRunway()  // whenever this is supposed to happen
    runway = true;
    
  }
} 
    

async function getImageFromRunway() {
    
  
    
  const inputs = {
    //"image": getDataURL(imgtest)  //this works
    "image": makeScreenshot()
  };
    
  if(typeof(model)!='undefined'){
        const result = await model.query(inputs)
        const imgx = gotImage(result)
        //console.log(imgx)
        return result
      
  }
    
  model.query(inputs).then(outputs => {
    const { image } = outputs;
    
    //console.log(image);
    // use the outputs in your project
  });
}



function getDataURL(image){
    image.loadPixels();
    var base64 = image.canvas.toDataURL();
    return base64;
}

function makeScreenshot(){

    var dataURL = canvas.toDataURL();
    return dataURL;
}

function gotError(error) {
  console.error(error);
}

function gotImage(result) {
  i = createImg(result.image, imageReady);
  //console.log(result.image);
  if (result.image) {
      
      localStorage.setItem("imgModel", result.image);
  }
  i.hide();
    
    //console.log(result.image);
}

function imageReady() {
  image(i, 0, 0,w,h);
}

function createZ(v) {
  let z =[];
  for(let zi = 0; zi < v; zi++){
    z.push(random(-1, 1))
  }
  return z;
}

function mousePressed() {
  if (mouseX > 0 && mouseX < 1024 && mouseY > 0 && mouseY < 1024) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}


