
window.onload = function(){
    document.getElementById("overlay").style.display = "block";
    document.onkeydown = OverlayOff;
    document.onkeyup = startGame; 
};

function OverlayOff(e) {
    document.getElementById("overlay").style.display = "none";
    e.preventDefault();
    
}

function createGrid(){
    let Arr = [];
    for ( let i = 0 ; i < 4 ; i++ ){
        let col = [];
        let tile;
        for ( let j = 0 ; j < 50 ; j++ ){
            if ( i === 0 && j === 0){
                tile = new Tile( i, j, "user");
                col.push(tile);
            } 
            else if ( i === 1 && j === 0){
                tile = new Tile( i, j, "comp1");
                col.push(tile);
            } 
            else if ( i === 2 && j === 0){
                tile = new Tile( i, j, "comp2");
                col.push(tile);
            } 
            else if ( i === 3 && j === 0){
                tile = new Tile( i, j, "comp3");
                col.push(tile);
            } 
            else {
            tile = new Tile(i,j, "space");
            col.push(tile);
            }
        }
        Arr.push(col);
    }
        return Arr;
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
    return diceSet;
}





function startGame(){
    document.onkeyup = null;
    let Grid = createGrid();
    let DiceSelector = createDice();

    updateView(Grid);
    updateDiceSelectorView(DiceSelector);



    // while win = false of something? keep looping through function with update view

    document.onkeydown = key_SelectDice;

    function key_SelectDice(e){			
        let key_code = e.which||e.keyCode;
        switch(key_code){
            case 37: //left arrow key
                e.preventDefault();
                findDice("left",DiceSelector);
                break;
            case 39: //right arrow key
                e.preventDefault();
                findDice("right",DiceSelector)
                break;		
            case 32: // space bar
                e.preventDefault();

                let now = DiceSelector.filter(dice => dice.hover);
                if (now[0]){
                currentDice = now[0];
                let DiceSize = currentDice.value;
                let roll = rollDice(DiceSize);
                let newUserPosition = moveRacers(roll, DiceSize, "user" , Grid);   // MOVE USER
                DiceSize = getRandomDice(DiceSelector);

                moveRacers(rollDice(DiceSize) , DiceSize, "comp1", Grid); //MOVE COMPUTER1
                DiceSize = getRandomDice(DiceSelector);

                 moveRacers(rollDice(DiceSize) , DiceSize, "comp2", Grid);//MOVE COMPUTER2
                DiceSize = getRandomDice(DiceSelector);

                moveRacers(rollDice(DiceSize) , DiceSize, "comp3", Grid);//MOVE COMPUTER3

                //checkForWins( newUserPosition , newComp1Position , newComp2Position , newComp3Position );
                updateView(Grid);
                break;

                // let playerID;
                //     for ( let t = 0 ; t < 3 ; t ++ ){
                //         if ( t = 0 ){
                //             playerID = "user";
                //         }
                //         else if ( t = 1){
                //          playerID = "comp"+t;
                //         }

                //         console.log(playerID);
                   // }



                }       
        }
    }
}



function findDice(direction, DiceSelector){
    let currentDice;
    let now = DiceSelector.filter(dice => dice.hover);
    
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
    updateDiceSelectorView(DiceSelector);
    return currentDice.value;
}



function rollDice(sides){
    let result;
    if (sides === 1){
        result = 1;
    } else {
        result = Math.floor(Math.random()*sides)+1;
    }
    return result;
}




function moveRacers(number, sides, playerID , Grid){



    let row;
    if (playerID === "user"){
        row = 0;
    }
    else if (playerID === "comp1"){
        row = 1;
    }
    else if (playerID === "comp2"){
        row = 2;
    } else {
        row = 3;
    }

//debugger;

    let car = Grid[row].filter(tile => tile.identity === playerID);
    if (car[0]){
        currentCar = car[0];
    }
    let move = number - sides/2;
   
    console.log(move);
    let Position;

    
    if ( sides === 1){
        move = 1;
        if (currentCar.j + move > Grid[0].length-1){
            currentCar.identity = "space";
            Grid[currentCar.i][Grid[0].length-1].identity = playerID;
            Position = Grid[currentCar.i][Grid[0].length-1];
            //gameOver("user");
        }else{
            currentCar.identity = "space";
            Grid[currentCar.i][currentCar.j+1].identity = playerID;
            Position = Grid[currentCar.i][Grid[0].length+1];
        }
    }
    else if (move > 0){
        if ( currentCar.j + move > Grid[0].length-1){

            currentCar.identity = "space";
            Grid[currentCar.i][Grid[0].length-1].identity = playerID;
            Position = Grid[currentCar.i][Grid[0].length-1];
            //gameOver("user"); 
        } else {
            currentCar.identity = "space";
            Grid[currentCar.i][currentCar.j+move].identity = playerID;
            Position = Grid[currentCar.i][currentCar.j+move];
        }
    } else {
        if ( Math.abs(move) >= currentCar.j ){ // if to zero
            currentCar.identity = "space";
            Grid[currentCar.i][0].identity = playerID;
            Position = Grid[currentCar.i][0];
        } else { // or just subtract
            currentCar.identity = "space";
            Grid[currentCar.i][currentCar.j-Math.abs(move)].identity = playerID;
            Position = Grid[currentCar.i][currentCar.j-Math.abs(move)];
        }
    }
    //return Grid; 
}

function getRandomDice(DiceSelector){
    //debugger;
        let randomNum = rollDice(DiceSelector.length);
        let randomDice = DiceSelector[randomNum-1].value;

        return randomDice
   
}

function gameOver(winner){
    if (winner === "user"){
        //OverlayOn();
        document.getElementById("OLhead").innerHTML = "YOU WON! "
        window.onload();
    } else {
        //OverlayOn();
        document.getElementById("OLhead").innerHTML = "YOU LOST! "+winner+" WON! !"  
        window.onload();
    }
}

function updateView(Grid){
        let playZone = document.getElementById("playarea");
        playZone.innerHTML = null;
        Grid.forEach(col => {
            col.forEach(tile => {

                 let space = document.createElement(tile.element);
                space.setAttribute('id', tile.id );
                space.setAttribute("class", "tile");
                space.classList.add(tile.identity);
                playZone.append(space);
            })
        })
        
}


function updateDiceSelectorView(DiceSelector){
    let diceZone = document.getElementById("buttonmap");
    diceZone.innerHTML = null;
    DiceSelector.forEach(space => {
        let diceChoice = document.createElement(space.element);
        diceChoice.setAttribute('id', space.id);
        diceChoice.setAttribute("class", "dice");
        diceChoice.innerHTML = space.value;
        if ( space.hover === true){
            diceChoice.classList.add("onDice");
        }
            diceZone.append(diceChoice);
    })
}

class Tile {
    constructor(i,j, identity) {
        this.id = `${i},${j}`;
        this.element ="div";
       // this.class = "empty";
        this.i = i;
        this.j = j; 
        this.identity = identity  
    }
    }


class Dice {
    constructor( i , isSelected, sides){
        this.id = `d${i}`;
        this.element = "div";
        this.class = "dice";
        this.hover = isSelected
        this.value = sides
    }
}







