/* Grid: I suppose a grid 10x10 where de coordinate are like this:
  grid[0] = [0,0]  //  North - West
  grid[1] = [1,0]
  .......
  grid[12] = [1,2]
  grid[99] = [9,9]  //  South - East
*/

var cols = 10 ; // North <--> South - 10 colums
var rows = 10 ; // East <--> West - 10 rows
var grid = [];  // Array contains positions
var directions = ['N','S','E','W'];

// Create grid
for( var x = 0; x < cols; x++){
  for(var y = 0; y < rows; y++){
      grid.push( [x,y] );  // Add in first position of array (North-South coordinate) and in second position (East-West coordinate)
  }
}
//console.log(grid);

/*   PRINT GRID
                                  - NORTH -
   [0,0]   [0,1]   [0,2]   [0,3]   [0,4]   [0,5]   [0,6]   [0,7]   [0,8]   [0,9]

   [1,0]   [1,1]   [1,2]   [1,3]   [1,4]   [1,5]   [1,6]   [1,7]   [1,8]   [1,9]

   [2,0]   [2,1]   [2,2]   [2,3]   [2,4]   [2,5]   [2,6]   [2,7]   [2,8]   [2,9]

W  [3,0]   [3,1]   [3,2]   [3,3]   [3,4]   [3,5]   [3,6]   [3,7]   [3,8]   [3,9]   E
E                                                                                  A
S  [4,0]   [4,1]   [4,2]   [4,3]   [4,4]   [4,5]   [4,6]   [4,7]   [4,8]   [4,9]   S
T                                                                                  T
   [5,0]   [5,1]   [5,2]   [5,3]   [5,4]   [5,5]   [5,6]   [5,7]   [5,8]   [5,9]

   [6,0]   [6,1]   [6,2]   [6,3]   [6,4]   [6,5]   [6,6]   [6,7]   [6,8]   [6,9]

   [7,0]   [7,1]   [7,2]   [7,3]   [7,4]   [7,5]   [7,6]   [7,7]   [7,8]   [7,9]

   [8,0]   [8,1]   [8,2]   [8,3]   [8,4]   [8,5]   [8,6]   [8,7]   [8,8]   [8,9]

   [9,0]   [9,1]   [9,2]   [9,3]   [9,4]   [9,5]   [9,6]   [9,7]   [9,8]   [9,9]

                                - SOUTH -
*/

var printGrid = document.getElementById("grid");

for( var i = 0; i < grid.length; i++){
  if( i % 10 === 0 ) {
    printGrid.innerHTML += '<br><br>';
  }
printGrid.innerHTML += '&nbsp;<span id='+ i +'>['+ grid[i] +']</span>&nbsp;&nbsp;';
}




// Initial position and direction
var myRover = {
  position: [0,0],  // I suppose initial position 0,0 is situated in 0 North - 0 West.
  direction: 'N'    // Inital direction South
};


// GO FORWARD
function goForward(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[0]--;  // I have changed initial code because I understand 0,0 coordinate is situated in 0 North - 0 West. When rover goes foword to North position --
      break;
    case 'E':
      rover.position[1]++;
      break;
    case 'S':
      rover.position[0]++;  // When rover goes to South, position ++
      break;
    case 'W':
      rover.position[1]--;
      break;
  }

  console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
}

// GO BACKWARD
function goBackward(rover) {
  switch(rover.direction) {
    case 'N':
      rover.position[0]++;
      break;
    case 'E':
      rover.position[1]--;
      break;
    case 'S':
      rover.position[0]--;
      break;
    case 'W':
      rover.position[1]++;
      break;
  }

  console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
}

// ITERATION 2
/*  The rover just change its direction when we use this command. It won't move right or left automatically.
    To make it go right or left, the user needs to specify the change of direction and then the actual movement.
*/

// TURN LEFT
function turnLeft(rover){
  switch(rover.direction) {
    case 'N':
      rover.direction = 'W';
      console.log('New Rover DIRECTION:', rover.direction);
      break;
    case 'E':
      rover.direction = 'N';
      console.log('New Rover DIRECTION:', rover.direction);
      break;
    case 'S':
      rover.direction = 'E';
      console.log('New Rover DIRECTION:', rover.direction);
      break;
    case 'W':
      rover.direction = 'S';
      console.log('New Rover DIRECTION:', rover.direction);
      break;
  }
}

// TURN RIGHT
function turnRight(rover){
  switch(rover.direction) {
    case 'N':
      rover.direction = 'E';
      console.log('New Rover DIRECTION:', rover.direction);
      break;
    case 'E':
      rover.direction = 'S';
      console.log('New Rover DIRECTION:', rover.direction);
      break;
    case 'S':
      rover.direction = 'W';
      console.log('New Rover DIRECTION:', rover.direction);
      break;

    case 'W':
      rover.direction = 'N';
      console.log('New Rover DIRECTION:', rover.direction);
      break;
  }
}


// wraps from one edge of the grid to another
function changeEdgeGrid(rover){

  if(rover.position[0] < 0 ){
    rover.position[0] = cols - 1;
    console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
    return;
  }
  if(rover.position[0] >= cols - 1 ){
    rover.position[0] = 0;
    console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
    return;
  }
  if(rover.position[1] < 0 ){
    rover.position[1] = rows - 1;
    console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
    return;
  }
  if(rover.position[1] > rows - 1 ){
    rover.position[1] = 0;
    console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
    return;
  }

}

// SEND COMMANDS TO MOVE ROVER


function sendCommands(commands){

  var validCommands = ['f','b','l','r'];
  var commandsSended = [];
  commandsSended = commands.split('');

  for( var i = 0; i < commandsSended.length; i++){

    // First check if the command is validComand
    // if( commandsSended[i].indexOf(validsCommands[0]) ){

      switch(true) {

        case commandsSended[i] === validCommands[0] :
          goForward(myRover);
          changeEdgeGrid(myRover);
          break;
        case commandsSended[i] === validCommands[1] :
          goBackward(myRover);
          changeEdgeGrid(myRover);
          break;
        case commandsSended[i] === validCommands[2] :
          turnLeft(myRover);
          changeEdgeGrid(myRover);
          break;
        case commandsSended[i] === validCommands[3] :
          turnRight(myRover);
          changeEdgeGrid(myRover);
          break;
        default:
          console.warn('You must type a sequence of valid commands');
          return;
          // break;
      }


  }


}

// PRINT ROVER IN GRID
function printRoverInMap(rover){

  for( var i = 0; i < grid.length; i++){
    if( rover.position[0] === grid[i][0] && rover.position[1] === grid[i][1] ) {
      var gridSpan = document.getElementById(i);
      gridSpan.innerHTML = '<strong style="color:red">[ R ]</strong>';
    }
  }
}

var commands = [];
var commands = prompt("Send commands to move the rover. For example: fffblffrb");
console.log(commands);

sendCommands(commands);
printRoverInMap(myRover);
