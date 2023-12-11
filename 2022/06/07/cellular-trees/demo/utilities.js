/**
 * converts polar coordinates to cartesian
 * @param {float} rad legnth of vector
 * @param {float} angle angle of vecor
 * @param {int[]} offset point where is origin of coordinate
 * @returns 
 */
function polarToCartesian(rad, angle, offset=[0,0]){
    return [
        (rad/2* cos(angle))+offset[0],
        (rad/2* sin(angle))+offset[1]
    ]
}
function printout(str){
    console.log(str);
}

//from https://stackoverflow.com/a/2450976
function shuffleArr(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function randFloat(min, max, decimals=4) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
}

function outOfBounds(pt, bounds){
    if(pt[0] < 0 || pt[1] < 0  || pt[0] >= bounds[0] || pt[1] >= bounds[1]){
        return true
    }

    return false
}

/**
 * Rotate a point counterclockwise by a given angle around a given origin.The angle should be given in radians
 * 
 * NOTE is not optimized
 * 
 * @param {*} center 
 * @param {*} pt 
 * @param {*} angle 
 */
function rotatePt(origin, pt, angle){
    return [
        origin[0] + cos(angle) * (pt[0]-origin[0]) - sin(angle) * (pt[1] - origin[1]),
        origin[1] + sin(angle) * (pt[0] - origin[0]) + cos(angle) * (pt[1] - origin[1])
    ]
}

function GaussianValue(mean, stddev) {
    var V1
    var V2
    var S
    do{
        var U1 = Math.random()
        var U2 = Math.random()
        V1 = 2*U1-1
        V2 = 2*U2-1
        S = V1*V1+V2*V2
    }while(S >= 1)
    if(S===0) return 0
    return mean+stddev*(V1*Math.sqrt(-2*Math.log(S)/S))
} 

function colSame(col1, col2){

    for(let i=0; i < 3; i++){
        if(col1[i] != col2[i]){
            return false
        }
    }
    return true
}

function oneDiffPixel(pix, mod, times=1){
    if(times<=0){return pix}

    let pixPart = randint(0,2)
    let pixMod = randint(-mod, mod)
    while(pixMod == 0 && pix[pixPart]+pixMod < 256 && pix[pixPart]+pixMod >= 0){
        pixMod = randint(-mod, mod)
    }

    let newPix = [...pix]
    newPix[pixPart] += pixMod
    return oneDiffPixel(newPix, mod, times-1) 
}

/**
 * from https://www.w3schools.com/js/js_random.asp
 * @param {int} min is inclusive
 * @param {int} max is inclusive
 * @returns random value evenly distributed in range
 */
function randint(min, max, seed=-1) {
    if(seed == -1){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    else{
        return Math.floor(seededRandom(seed) * (max - min + 1) ) + min;
    }
}

function randcol(){
    return [randint(0,255),randint(0,255),randint(0,255)]
}