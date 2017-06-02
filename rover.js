var cols = 6 ; // North <---> South
var rows = 4 ; // West <---> East
var grid = [];  // Array contains positions
// var directions = ['N','S','E','W'];

// Create and print grid
for( var x = 0; x < rows; x++){
  for(var y = 0; y < cols; y++){
      grid.push( [x,y] );  // Add in first position of array (North-South coordinate) and in second position (East-West coordinate)
  }
}
//console.log(grid);

/*  I assumed coordinates of Grid are like this:
                                  - NORTH -
   [0,0]   [0,1]   [0,2]   [0,3]   [0,4]   [0,5]   [0,6]   [0,7]   [0,8]   [0,9]

W  ............................................................................    E
E                                                                                  A
S  ............................................................................    S
T                                                                                  T
   [9,0]   [9,1]   [9,2]   [9,3]   [9,4]   [9,5]   [9,6]   [9,7]   [9,8]   [9,9]

                                - SOUTH -
*/

var printGrid = document.getElementById("grid");

for( var i = 0; i < grid.length; i++){
  if( i % cols === 0 ) {  // If i is divisible by number of rows, finished the row
    printGrid.innerHTML += '<br><br>';
  }
printGrid.innerHTML += '&nbsp;<span id='+ i +'>['+ grid[i] +']</span>&nbsp;&nbsp;';
}

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

  // ROVER POSITION 0 (NORTH - SOUTH)
  if(rover.position[0] < 0 ){
    rover.position[0] = rows - 1;
    console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
    return;
  }
  if(rover.position[0] > rows - 1 ){
    rover.position[0] = 0;
    console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
    return;
  }
  // ROVER POSITION 1 (WEST - EAST)
  if(rover.position[1] < 0 ){
    rover.position[1] = cols - 1;
    console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
    return;
  }
  if(rover.position[1] > cols - 1 ){
    rover.position[1] = 0;
    console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
    return;
  }

}


var isValidSequence = true;  // Check if sequence of commands sended is valid

// SEND COMMANDS TO MOVE ROVER
function sendCommands(commands){

  var validCommands = ['f','b','l','r'];
  var commandsSended = [];

  if( commands === '' || commands === null )
    console.error('Error. You must type at least one command to move the rover');
  else
    commandsSended = commands.split('');



  for( var i = 0; i < commandsSended.length; i++ ){

      // check if the command is validComand
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
          isValidSequence = false;
          console.warn('Invalid command: ', commandsSended[i]);
          break;
      }


  }
  return isValidSequence;

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

// INIT POSITION OF MARS ROVER
var myRover = {
  position: [0,0],
  direction: 'N'
};

var commands = [];
var commands = prompt("Send a sequence of commands to move the rover (f,b,r,l). For example: fffblffrb");

isValidSequence = sendCommands(commands) ? printRoverInMap(myRover) : alert('Error: You must type a valid sequence of commands');
