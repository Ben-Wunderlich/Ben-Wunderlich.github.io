function makeArray(w, h, val) {
    var arr = [];
    for(let i = 0; i < h; i++) {
        arr[i] = [];
        for(let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}

function randcol(alpha=255){
    return [randint(0,255),randint(0,255),randint(0,255), alpha]
}

function printout(str){
    console.log(str);
}

function randint(min, max, seed=-1) {
    if(seed == -1){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    else{
        return Math.floor(seededRandom(seed) * (max - min + 1) ) + min;
    }
}

function randPts(numpts, min, max){
    var allPts = []
    for(let i=0;i<numpts;i++){
        allPts.push([randint(min,max), randint(min,max)])
    }
    return allPts
}

function outOfBounds(pt, bounds){
    if(pt[0] < 0 || pt[1] < 0 || pt[0] >= bounds[0] || pt[1] >= bounds[1]){
        return true
    }

    return false
}

function vectorAdd(arrOfVecs){
    let retArr = []
    for(let i=0;i<arrOfVecs[0].length;i++){

        var ptSum = 0
        for(let j = 0; j <arrOfVecs.length;j++){
            ptSum += parseFloat(arrOfVecs[j][i])
        }

        retArr.push(ptSum)
        
    }
    return retArr
}

function vectorScale(arr, scaler){
    let retArr = []
    for(let i=0;i<arr.length;i++){
        retArr.push(parseFloat(arr[i])*parseFloat(scaler))
    }
    return retArr
}

function normalizeVec(vec){
    let magVal = mag(...vec)
    for(let i=0; i< vec.length; i++){
        vec[i] = vec[i] / magVal
    }

    return vec
}

function rotatePt(origin, pt, angle){
    return [
        origin[0] + cos(angle) * (pt[0]-origin[0]) - sin(angle) * (pt[1] - origin[1]),
        origin[1] + sin(angle) * (pt[0] - origin[0]) + cos(angle) * (pt[1] - origin[1])
    ]
}