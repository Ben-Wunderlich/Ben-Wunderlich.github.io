function randFloat(min, max, decimals=4) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
}

function manhattanDist(p1,p2){
    return abs(p2[0]-p1[0])+abs(p2[1]-p1[1])
}

function perlinNoise(x, y, scale=1/100){
    return Math.abs(noiseobj.perlin2(x *scale, y * scale))
}