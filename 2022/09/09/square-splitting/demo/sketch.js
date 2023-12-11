let c

let bgSize= [800,800]//std

const midPt = [bgSize[0]/2, bgSize[1]/2]
const nullCol = [0, 0, 0,255]//[144, 176, 222,255]

function setup() {
  c = createCanvas(...bgSize);
  frameRate(30)
  background(100);
  rectMode(CORNERS)
  noStroke()
  noLoop()
}


function touchStarted() {
  doSplit(mouseX, mouseY)
}

//each el has form [startx, starty, endx, endy]
let rectTrack = [[0,0,bgSize[0]-1, bgSize[1]-1]]

function rectColAdd(startPt, endPt, origCol){
	let newCol = closeCol(origCol, 26,10, 5)
	fill(...newCol)
	rect(...startPt, ...endPt, 20)

	rectTrack.push([...startPt, ...endPt])

}

function doSplit(x,y){
  let i=0
  while(i<rectTrack.length){
    //split here
    let curr = rectTrack[i]

    if(x > curr[0] && x < curr[2] && y > curr[1] && y < curr[3]){
        let startCol = getColor(c, x, y)
		let xDiv = (curr[0]+curr[2])/2
		let yDiv = (curr[1]+curr[3])/2
		rectColAdd([curr[0], curr[1]], [xDiv, yDiv], startCol)
		rectColAdd([xDiv, curr[1]], [curr[2], yDiv], startCol)
		rectColAdd([curr[0], yDiv], [xDiv, curr[3]], startCol)
		rectColAdd([xDiv, yDiv], [curr[2], curr[3]], startCol)

        rectTrack.splice(i,1)
        return
    }
    i++
  }
}
