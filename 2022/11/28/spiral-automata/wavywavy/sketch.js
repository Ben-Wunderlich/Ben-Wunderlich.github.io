let c

let bgSize= [800,800]//std

const midPt = [bgSize[0]/2, bgSize[1]/2]

const deathString = "oh no I have perished"
const cellRange = 5

const numCells = 1000
const framerate = 30
const circleSize = 2

function setup() {
  c = createCanvas(...bgSize);
  //background(5,5,5,255);
  background(50);

  noLoop()
  frameRate(framerate)
  strokeWeight(1)
  // stroke(100,216,107)
  stroke(255)
  fill(255)

	reinit()

  toggglebutt = createButton("start");
  toggglebutt.position(10,10);
  toggglebutt.mousePressed(toggle);

  resetButt = createButton("reset");
  resetButt.position(80,10);
  resetButt.mousePressed(reset);
}


let active = false;
let toggglebutt;
function toggle(){

  if(active){
    toggglebutt.html("start")
    noLoop();
  }
  else{
    toggglebutt.html("stop")
    loop();
  }
  active = !active;
}

let resetButt;
function reset(){
  background(50)
  toggglebutt.html("start")
  active=false
  reinit()
	noLoop()
}

//have form [[approxX, approxY], [trueX, trueY]]
let cells = []

let cellTracker

const moveCol = [88, 145, 73, 255]
const eatCol = [140, 139, 77, 80]

let initialCells = 0

function seedCells(numCells = 100,sd = 100){

  // let cellLocations = normalPts(numCells, ...midPt, sd)
  let cellLocations = randPts(numCells, 0, bgSize[0]-1)

  for(let i=0;i<numCells;i++){
    if(outOfBounds(cellLocations[i], bgSize)){
      continue
    }

    cells.push([intifyPt(...cellLocations[i]), cellLocations[i]])
	showCell(cellLocations[i])
  }

  initialCells =cells.length
}

function reinit(){
	cellTracker = makeArray(bgSize[0]+1, bgSize[1]+1,false)

	cells = []
	seedCells(numCells, 200)	
}


function showCell(pt){
  // point(...pt)
  // stroke(34, 69, 44)
  circle(...pt,circleSize)
  // stroke(160, 174, 222)
  // circle(...pt,circleSize-1)
}


function cSet(x,y,val){
  cellTracker[y][x] = val
}

function intifyPt(x,y){
  return [int(x), int(y)]
}


function inBounds(pt){
  return pt[0] >= 0 && pt[1] >= 0
  && pt[0] < bgSize[0] && pt[1] < bgSize[1]
}

function hasCell(x,y){
  try{
    return cellTracker[y][x]
  }
  catch(err){
    return false
  }
}

//gets friends adjacent to cell
function nearbyCount(cellPt, range=1){
    //-1 because counted itself

  let friendCount = -1

  for(let x=cellPt[0]-range;x<=cellPt[0]+range;x++){
    for(let y=cellPt[1]-range;y<=cellPt[1]+range;y++){
      if(hasCell(x,y)){
        friendCount++
      }
    }
  }

  return friendCount
}


//move toward center
function moveAbandoned(pt, speed=1){
  inchToward(pt, midPt, speed)
}

//NOTE from is the dual pt thing
function inchToward(pt, target, amount=1){
  let centerDir = vectorAdd([
    target,
    vectorScale(pt[1],-1)
  ])

  //recal modifies in place
  normalizeVec(centerDir)
  centerDir = vectorScale(centerDir, amount)

  pt[1] = vectorAdd([
    pt[1],
    centerDir
  ])
}

//go counter clockwaise by 1 pt by rotating -1/r radians
function moveRotate(pt, center, dir=false, amnt=2){
  let rotated = rotateFixed([pt[1][0],pt[1][1]], center, dir, amnt)
  pt[1] = rotated
}

//go opposite center by 1 point with normalization
function moveCrowded(pt){
  inchToward(pt, midPt, -1)
}

function rotateFixed(pt, center, invert, amnt=2){
  let thetaVal = amnt/dist(...center, ...pt)
  if(invert){
    thetaVal *= -1
  }
  return rotatePt(center, pt, thetaVal)
}

function moveRotateTheta(pt, center, amnt){
  let rotated = rotatePt(center, pt[0], amnt)
  pt[1] = rotated
}


let contracting = true
let centerCount = 0
const thresh = 200
const closeAmnt = 8
//use xsinx
function wavyWavy(cellLocation, neighborCount){
  let rawDist = euclidianDist(cellLocation[1], midPt)

  let midDist = log(rawDist)

  centerCount++
  if(contracting &&
    rawDist < closeAmnt &&
    centerCount > thresh){
      contracting=false
      centerCount = 0
  }
  else if(!contracting &&
    rawDist > midPt[0]-closeAmnt &&
    centerCount > thresh){
      contracting = true
      centerCount=0

  }

  let offset = sin(midDist*10)*midDist

  moveRotate(cellLocation, midPt, true, offset)
  if(contracting){
    inchToward(cellLocation, midPt,midDist/2)
  }
  else{
    inchToward(cellLocation, midPt,-5/midDist)
  }

  if(neighborCount >= 5){
    moveCrowded(cellLocation)
  }

}



const halfManhMax = (midPt[0]+midPt[1])/3
let constrainde = true
let last=0
function testFuncy(cellLocation, neighborCount){
  if(frameCount%100==0 && last != frameCount){
    constrainde = !constrainde
    last=frameCount
    printout("swap")
  }

  moveRandom(cellLocation, 2*clamp(neighborCount,1,100))
  //have be pos or neg depending on disst

  let rawDist = manhattanDist(cellLocation[1], midPt)
  let modDist = (rawDist - halfManhMax)/100
  if(constrainde){
    moveAbandoned(cellLocation,modDist)
  }
  else{
    moveAbandoned(cellLocation,2/(modDist))
  }

  
}

function cellTurn(cellLocation){
  let neighborCount = nearbyCount(cellLocation[0], cellRange)

  wavyWavy(cellLocation, neighborCount)

  cSet(...cellLocation[0], false)
  cellLocation[0] = intifyPt(...cellLocation[1])
  if(outOfBounds(cellLocation[0], bgSize)){
    return deathString
  }
  cSet(...cellLocation[0], true)
  showCell(cellLocation[1])
}

let movingCol = randcol()
function takeTurn(){
  background(0,0,0,5)
  centerCount=0

  let i=0;
  while (i < cells.length){
    let response = cellTurn(cells[i])
    if(response == deathString){
      // printout("destroyed")
      cells.splice(i,1)
    }
    i++;
  }
}

function draw() {
  takeTurn()

  if(frameCount %200 == 0){
    let remaining = cells.length / initialCells
    printout(Math.round(remaining*1000)/10 +"% remain")
  }
}

//https://keycode.info/for/alt
function keyPressed() {

  // if (keyCode === 39){//left arrow
  //   console.log("unpause")
  //   loop();
  // }
  // else if (keyCode === 37){//right arrow
  //   console.log("pause")
  //   noLoop();
  // }

  // else if(keyCode === 82){//r key
  // 	background(50)
  //   reinit()
	// noLoop()
  // }
}