let c

let bgSize = [800, 800]


const midPt = [bgSize[0] / 2, bgSize[1] / 2]

let zoom = 190

function setup() {
  c = createCanvas(...bgSize);


  rollSymbol()
  toggglebutt = createButton("remake");
  toggglebutt.position(10,10);
  toggglebutt.mousePressed(rollSymbol);

  complicateButt = createButton("complexify");
  complicateButt.position(90,10);
  complicateButt.mousePressed(complicate);

  simplifyButt = createButton("simplify");
  simplifyButt.position(190,10);
  simplifyButt.mousePressed(simplify);

  noLoop();
}

function rollSymbol(){
  background(0, 0, 0);
  perlinSymbol(midPt, 1/zoom, 6.5)
}

function complicate(){
  zoom *= 0.8
  rollSymbol()
}

function simplify(){
  zoom *= 1.2
  rollSymbol()
}

function perlinSymbol(center, expansion = 1 / 100, size = 4, col=[237,162,78],locar = null) {
  strokeWeight(3)

  xTrans = randFloat(0, 10000000)
  yTrans = randFloat(0, 10000000)
  if(locar != null){
    xTrans = locar[0]
    yTrans = locar[1]

  }

  let range = size * 50
  let maxDist = manhattanDist([range, range],[0,0])


  for (let y = center[1] - range; y < center[1] + range; y ++) {
    for (let x = center[0] - range; x < center[0] + range; x ++) {
      let valueNoted = perlinNoise(x + xTrans, y + yTrans, expansion)

      let rawCentreDist = manhattanDist([x, y], center)

      //will be from 0 to 1
      let scaled = rawCentreDist / maxDist

      let threshVal = 0.1-(scaled / size)
      if (valueNoted < threshVal) {
        stroke(...col)
        point(x, y)
      }
    }
  }
}
