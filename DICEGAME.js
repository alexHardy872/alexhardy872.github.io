
let Grid = [];
let DiceSelector = []; 
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
  
function OverlayOff(e) {
    document.getElementById("overlay").style.display = "none";
    e.preventDefault();
    startGame();
    return;
}

function startGame(){
    createGrid();
    createDice();
    document.onkeydown = key_SelectDice;
}

function createGrid(){
    
    let Arr = [];
    for ( let i = 0 ; i < 4 ; i++ ){
        let col = [];
        let tile;
        for ( let j = 0 ; j < 100 ; j++ ){
            if ( i === 0 && j === 0){
                tile = new Tile( i, j, true, false, false, false, false, false, false);
                col.push(tile);
            } 
            else if ( i === 1 && j === 0){
                tile = new Tile( i, j, false, true, false, false, false, false, false);
                col.push(tile);
            } 
            else if ( i === 2 && j === 0){
                tile = new Tile( i, j, false, false, true, false, false, false, false);
                col.push(tile);
            } 
            else if ( i === 3 && j === 0){
                tile = new Tile( i, j, false, false, false, true, false, false, false);
                col.push(tile);
            } 
            else {
            tile = new Tile(i,j, false, false, false, false ,false, false, false);
            col.push(tile);
            }
        }
        Arr.push(col);
    }
        Grid =  Arr;
        updateView();
}

function createDice(){
    let diceSet = [];
    for ( let i = 1 ; i < 9 ; i++ ){
        let die;
        if ( i === 1){
            die = new Dice( i , true , 1);
        }
        else if ( 2 <= i && i <=6 ) {
            die = new Dice( i , false , i * 2 );
        } 
        else if ( i === 7) {
            die = new Dice( i , false , 20 );
        } 
        else if ( i === 8) {
            die = new Dice( i , false , 40 );
        } 
        diceSet.push(die);
    }
    DiceSelector = diceSet;
    updateDiceSelectorView();
}





function key_SelectDice(e){				
    var key_code = e.which||e.keyCode;
    switch(key_code){
        case 37: //left arrow key
            e.preventDefault();
            findDice('left');
            break;
        case 39: //right arrow key
            e.preventDefault();
            findDice('right');
            break;		
        case 32: // space bar
            e.preventDefault();
            let now = DiceSelector.filter(dice => dice.hover);
                if (now[0]){
                currentDice = now[0];
                rollDice(currentDice.value);
                break;
                }
    }
    return;
}



function findDice(direction){
   
let now = DiceSelector.filter(dice => dice.hover);
//let index = DiceSelector.indexOf(now);
if (now[0]){
    currentDice = now[0];
}
let start = DiceSelector.indexOf(currentDice);
let Did = currentDice.id;

if ((direction === "left" && Did === "d1") ||( direction === "right" && Did === "d8" ) ){
    return;
} else if (direction === "right"){
    currentDice.hover = false;
    DiceSelector[start+1].hover = true;
    currentDice = DiceSelector[start+1];
}else if (direction === "left"){
    currentDice.hover = false;
    DiceSelector[start-1].hover = true;
    currentDice = DiceSelector[start-1];
}
updateDiceSelectorView()
return; 
}



function rollDice(sides){
    let result;
    if (sides === 1){
        result = 1;
    } else {
        result = Math.floor(Math.random()*sides)+1;
    }
    // console.log(sides);
    // console.log(result);
    moveRacers(result, sides)
}

function rollDiceComp(sides){
    let result;
    if (sides === 1){
        result = 1;
    } else {
        result = Math.floor(Math.random()*sides)+1;
    }
    // console.log(sides);
    // console.log(result);
    return result;
}


function moveRacers(number, sides){

        let user = Grid[0].filter(tile => tile.user);
        if (user[0]){
            userCar = user[0];
        }
    

    //console.log(userCar);

    let move = number - sides/2;

    if ( sides === 1){
        Grid[userCar.i][userCar.j].user = false;
        Grid[userCar.i][userCar.j+1].user = true;
    }
    else if (move > 0){

        if ( userCar.j + move > 99){
            //ENDGAME
        } else {
            Grid[userCar.i][userCar.j].user = false;
            Grid[userCar.i][userCar.j+move].user = true;
        }
    } else {

        if ( Math.abs(move) >= userCar.j ){ // if to zero
            Grid[userCar.i][userCar.j].user = false;
            Grid[userCar.i][0].user = true;
        } else { // or just subtract
            Grid[userCar.i][userCar.j].user = false;
            Grid[userCar.i][userCar.j-Math.abs(move)].user = true;

        }
    }
    //debugger;
    moveComputer(1 , getRandomDice() );
    // moveComputer(2 , getRandomDice() );
    // moveComputer(3 , getRandomDice() );




    updateView();
}

function moveComputer(compN, sides){

    let number = rollDiceComp(sides);

    let comp = Grid[compN].filter(tile => tile.comp1);
    if (comp[0]){

        if (compN === 1){
            compCar1 = comp[0];
        }
        else if (compN === 2){
            compCar2 = comp[0];
        }
        else if (compN === 3){
            compCar3 = comp[0];
        }
    }

let move = number - sides/2;

if ( sides === 1){
    Grid[compCar1.i][compCar1.j].comp = false;
    Grid[compCar1.i][compCar1.j+1].comp = true;
}
else if (move > 0){

    if ( compCar1.j + move > 99){
        //ENDGAME
    } else {
        Grid[compCar1.i][compCar1.j].comp1 = false;
        Grid[compCar1.i][compCar1.j+move].comp1 = true;
    }
} else {

    if ( Math.abs(move) >= compCar1.j ){ // if to zero
        Grid[compCar1.i][compCar1.j].comp1 = false;
        Grid[compCar1.i][0].comp1 = true;
    } else { // or just subtract
        Grid[compCar1.i][compCar1.j].comp1 = false;
        Grid[compCar1.i][compCar1.j-Math.abs(move)].comp1 = true;

    }
}
}


///////////// COMPUTER STUFF ///////////////

function getRandomDice(){
    
    let dieType = rollDiceComp(8);
        if (dieType == 1){ // computer advance 1 space
            return 1;
        }
        else if (dieType == 2){ 
            return 4; 
        }
        else if (dieType == 3){ 
            return  6; 
        }
        else if (dieType == 4){ 
            return  8; 
        }
        else if (dieType == 5){ 
            return  10; 
        }
        else if (dieType == 6){ 
            return  12; 
        }
        else if (dieType == 7){ 
            return  20; 
        }
        else if (dieType == 8){ 
            return  40; 
        }
}







function updateView(){
        let playZone = document.getElementById("playarea");
        playZone.innerHTML = null;
        Grid.forEach(col => {
            col.forEach(tile => {
                 var space = document.createElement(tile.element);
                space.setAttribute('id', tile.id );
                space.setAttribute("class", "tile");

                if (tile.user === true){
                    space.classList.add("user");
                }
                else if (tile.comp1 === true){
                    space.classList.add("comp1")
                }
                else if (tile.comp2 === true){
                    space.classList.add("comp2")
                }
                else if (tile.comp3 === true){
                    space.classList.add("comp3")
                }






                playZone.append(space);
            })
        })
        return;
}


function updateDiceSelectorView(){
    let diceZone = document.getElementById("buttonmap");
    diceZone.innerHTML = null;
    DiceSelector.forEach(space => {
        var diceChoice = document.createElement(space.element);
        diceChoice.setAttribute('id', space.id);
        diceChoice.setAttribute("class", "dice");
        diceChoice.innerHTML = space.value;

        if ( space.hover === true){
            diceChoice.classList.add("onDice");
        }

            diceZone.append(diceChoice);
    })
    return;
}









///////// CLASSES   ///////////

class Tile {
    constructor(i,j,isUser, isComp1, isComp2, isComp3, isEmpty, isStart, isEnd) {
        this.id = `${i},${j}`;
        this.element ="div";
        this.class = "empty";
        this.i = i;
        this.j = j; 
        this.user = isUser
        this.comp1 = isComp1
        this.comp2 = isComp2
        this.comp3 = isComp3
        this.empty = isEmpty
        this.start = isStart
        this.end = isEnd
    }
    }



class Dice {
    constructor( i , isSelected, number){
        this.id = `d${i}`;
        this.element = "div";
        this.class = "dice";
        this.hover = isSelected
        this.value = number
    }
}




























