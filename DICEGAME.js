
let Grid = [];

let currentDice;
let userCar;
let compCar1;
let compCar2;
let compCar3;




window.onload = function(){

    OverlayOn();
    document.onkeydown = OverlayOff;
    

};

function OverlayOn() {
    document.getElementById("overlay").style.display = "block";
  }
  
function OverlayOff() {
    document.getElementById("overlay").style.display = "none";
    startGame();
}

function startGame(){
    createGrid();
      //document.onkeydown = key_SelectDice;
}










function createGrid(){
    
    
    let playZone = document.getElementById("playarea");
    let Arr = [];
    for ( let i = 0 ; i < 4 ; i++ ){
        let col = [];
        let tile;
        for ( let j = 0 ; j < 100 ; j++ ){
            tile = new Tile(i,j, false, false, false, false ,false, false, false);
            //let tile = document.createElement("div");
            //tile.setAttribute('class', 'empty');
           // tile.setAttribute('id', `${i},${j}`);
            //playZone.append(tile);
            col.push(tile);
        }
        Arr.push(col);
    }
    
        Grid =  Arr;
        updateView();
}


document.getElementById("four")


function key_SelectDice(e){				
    var key_code = e.which||e.keyCode;
    switch(key_code){
        case 37: //left arrow key
            findDice('left');
            break;
        case 39: //right arrow key
            findDice('right');
            break;		
        case 32: // space bar
            rollDice();
            break;
    }
}



function findDice(direction){
let onDice = document.getElementsByClassName("onDice");
let dice = onDice.id;

}



function rollDice(sides){
    var result = Math.floor(Math.random()*sides)+1;
    return result; 
}


///////////// COMPUTER STUFF ///////////////

function getRandomDice(){
    let dieType = rollDice(6);
        if (dieType == 1){ // computer advance 1 space
        }
        else if (dieType == 2){ 
            return rollDice(6); 
        }
        else if (dieType == 3){ 
            return rollDice(10); 
        }
        else if (dieType == 4){ 
            return rollDice(12); 
        }
        else if (dieType == 5){ 
            return rollDice(20); 
        }
        else if (dieType == 6){ 
            return rollDice(40); 
        }
}



function updateView(){
        // console.log(playZone);
        

        let playZone = document.getElementById("playarea");
        playZone.innerHTML = null;
        Grid.forEach(col => {
            col.forEach(tile => {
                 var space = document.createElement(tile.element);
                space.setAttribute('id', tile.id );
                space.setAttribute("class", "tile");

                playZone.append(space);
            })
        })
    
    


}






class Tile {
    constructor(i,j,isUser, isComp1, isComp2, isComp3, isEmpty, isStart, isEnd) {
        this.id = `${i},${j}`;
        this.element ="div";
        this.class = "empty";
        this.i = i;
        this.j = j; 
        this.user = isUser
        this.comp = isComp1
        this.comp = isComp2
        this.comp = isComp3
        this.empty = isEmpty
        this.start = isStart
        this.end = isEnd
        
       
    }
    }




























