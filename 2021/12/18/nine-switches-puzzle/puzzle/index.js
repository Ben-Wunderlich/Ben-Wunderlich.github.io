const ON = String.fromCharCode(9898)
const OFF =  String.fromCharCode(9899)

const locations = [
    ["#topLeft", "#topMid", "#topRight"],
    ["#midLeft", "#midMid", "#midRight"],
    ["#botLeft","#botMid","#botRight"]
]

const minLocations = [
    ["topLeft", "topMid", "topRight"],
    ["midLeft", "midMid", "midRight"],
    ["botLeft","botMid","botRight"]
]

function setInitialStates(){
    for(i=0;i<=2;i++){
        for(j=0;j<=2;j++){
            if(i==1 && j==1){
                makeOn(locations[i][j])
            }
            else{
                makeOff(locations[i][j])
            }
        }
    }
}

function getPosition(objId){
    for(i=0;i<=2;i++){
        for(j=0;j<=2;j++){
            if(minLocations[i][j] == objId){
                return [i, j]
            }
        }
    }
}

function safeSet(x,y){
    switchLever(locations[x][y])
}

function makeOff(elementId){
    $(elementId).text(OFF)
}

function makeOn(elementId){
    $(elementId).text(ON)
}

function switchLever(elementId){
    var el = $(elementId) 

    if(el.text() == ON){
        el.text(OFF)
    }
    else{
        el.text(ON)
    }
}

function checkWin(){
    for(i=0;i<=2;i++){
        for(j=0;j<=2;j++){
            if($(locations[i][j]).text() == OFF){
                return false
            }
        }
    }
    return true
}


function swapAdj(pos){
    for(i=pos[0]-1; i<=pos[0]+1; i++){
        for(j=pos[1]-1; j<=pos[1]+1; j++){
            if(j < 0 || i < 0){
                continue
            }
            if(i > 2 || j > 2){
                continue
            }

            safeSet(i,j)
        }
    }
}

function autoWin(){
    for(i=0;i<=2;i++){
        for(j=0;j<=2;j++){
            makeOff(locations[i][j])
        }
    }
}

function victoir(){
	console.log("you win!");
	alert("you did it!");
}

$(".keyButt").on("click", function(){
    var obj = $(this)
    var curId = obj.attr('id')

    var location = getPosition(curId)

    swapAdj(location)
    if(checkWin()){
		setTimeout(victoir, 10);

    }
    else{
        console.log("no win yet")
        //autoWin()
    }
})

$("#resetButton").on("click", function(){
    setInitialStates()
});

setInitialStates()