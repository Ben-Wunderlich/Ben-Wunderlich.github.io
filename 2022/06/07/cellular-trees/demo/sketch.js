let c

let bgSize= [800,800]//std
//let bgSize= [1920,1080]// horiz
//let bgSize= [1080,2340]//vertical
//let bgSize = [2000,2000]//chungus

const midPt = [bgSize[0]/2, bgSize[1]/2]
const quarterPt = [bgSize[0]/4, bgSize[1]/4]
const threeQuartPt = [3*bgSize[0]/4, 3*bgSize[1]/4]

let userTouch = [0,0]

const startCol = [2, 148, 246]//[16, 87, 31]
const nullCol = [0, 0, 0,255]//[144, 176, 222,255]
function setup() {
  c = createCanvas(...bgSize);
  frameRate(30)
  background(...nullCol);


  noFill()

  stopButt = createButton("stop");
  stopButt.position(10,10);
  stopButt.mousePressed(stopProg);

  clearButt = createButton("clear");
  clearButt.position(10,40);
  clearButt.mousePressed(clearCanvas);

  loopTighten = createButton("tighten");
  loopTighten.position(90,10);
  loopTighten.mousePressed(tighten);

  simplifyButt = createButton("loosen");
  simplifyButt.position(150,10);
  simplifyButt.mousePressed(loosen);
  //blendMode(HARD_LIGHT)
  //blendMode(ADD)
  //startRipple(midPt,10,5,[15, 101, 138,70],[0])
}

function tighten(){
  nullNext=true
  curlTightness *= 1.05
}

function loosen(){
  nullNext=true
  curlTightness *= 0.95
}

function clearCanvas(){

  background(0, 0, 0);
  spiralList = []
  stopProg()
}


function stopProg(){
  nullNext=true
  noLoop()
}

function draw() {
  renderTouchSpiral()
 
}

let nullNext=false
function touchStarted() {
  if(nullNext){nullNext=false;return;}

  let mousePos = [mouseX, mouseY]

  addSpiralAutomata(mousePos, randFloat(0,2*PI), 1, randcol())
  loop()
}




//has form [x, y, init_angle, delta_angle, lifetime, color, child level]
let spiralList = []

const spiralDetail = 3
let curlTightness = 1// 1.618 *0.63

const replicationModifier = 1.5
const replicationThresh = 2

//const replicationLimit = 50
const startingThresh = 1
const colourChange = 50


function addSpiralAutomata(pos, startAng, deltaAng, color){
  spiralList.push(
    [pos[0], pos[1], 
    startAng, deltaAng,
    0,
    color
  ])
}

let maxCount = 0
function renderTouchSpiral(){
  strokeWeight(3)
  strokeCap(ROUND);

  let replicationCount = 0

  if(spiralList.length == 0){
    printout("heatdeath, max was "+maxCount)
    noLoop();
  }

  let i=0
  while(i< spiralList.length){
    const currPos =[spiralList[i][0], spiralList[i][1]]
    let initAng = spiralList[i][2]
    const deltaAng = spiralList[i][3]
    const lifeTime = spiralList[i][4]
    const color = spiralList[i][5]

    if(outOfBounds(currPos, bgSize)){
      spiralList.splice(i,1)
      continue
    }

    let currAng = (initAng + (lifeTime/10) * deltaAng) % TAU
    let endPt = rotatePt(currPos, [currPos[0], currPos[1]-spiralDetail], currAng)
    
    const currCol = get(...endPt)

    //should check for collision with non null space
    //TODO try instead of kill self, kill self and spawn bunch in spiral
    if(lifeTime > startingThresh && !colSame(currCol, nullCol)){
        spiralList.splice(i,1)
        continue
    }


    stroke(color)
    line(...currPos, ...endPt)

    if(lifeTime > 0){
      if(GaussianValue(0, 
        4/((replicationCount/replicationModifier)+1)) 
        > replicationThresh){

        let newPix = oneDiffPixel(color, colourChange)

        addSpiralAutomata(currPos, 
          currAng-(PI/3), currAng/3, 
          newPix)
        replicationCount+=1
      }
    }

    spiralList[i][0] = endPt[0]
    spiralList[i][1] = endPt[1]
    spiralList[i][2] = initAng
    spiralList[i][3] = deltaAng * curlTightness
    spiralList[i][4]++
    i++
  }

  if(replicationCount > maxCount){
    maxCount = replicationCount
  }
  shuffleArr(spiralList)
}
