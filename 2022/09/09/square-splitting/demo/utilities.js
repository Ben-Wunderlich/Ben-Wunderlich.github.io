
function clamp(val, min, max){
    if(val < min){
        return min
    }
    if(val > max){
        return max
    }
    return val
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

function seededRandom(seed){
    
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}




function closeCol(baseCol, posMod=5, negMod=5, iterations=1){
    if(iterations==0){
        return baseCol
    }
    
    let copyCol = [...baseCol]
    let position = randint(0,2)
    if(randint(0,1)==0){
        copyCol[position] += posMod
    }
    else{
        copyCol[position]-=negMod
    }
    copyCol[position] = clamp(copyCol[position], 0, 255)
    return closeCol(copyCol, posMod, negMod, iterations-1)
}


function getColor(canvas, x, y){
    return canvas.get(x,y)
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

function printout(str){
    console.log(str);
}
