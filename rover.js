var cols = 10 ; // North <---> South
var rows = 10 ; // West <---> East
var percentObstacles = 25; // There will be n % obstacles in the grid
var grid = [];  // Array contains positions
var commands = [];  // commands user will type in prompt

// INIT ROVER POSITION
var myRover = {
  position: [0,0],
  direction: 'N'
};


// INTIALIZE THE GRID
createGrid(rows,cols,percentObstacles);


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
function createGrid( rows, cols, percentObstacles ){

  var obstacle = '';  // First all grid positions are not obstacles

  // Create grid
  for( var x = 0; x < rows; x++){
    for(var y = 0; y < cols; y++){
        grid.push( [x,y,obstacle] );  // Add in first position of array (North-South coordinate) and in second position (East-West coordinate)
    }
  }

  // Add obstacles in grid
  addObstacles( grid , percentObstacles );  // 20% obstacles in grid

  // Print grid in browser
  var printGrid = document.getElementById("grid");

  for( var i = 0; i < grid.length; i++){

    if( i % cols === 0 ) {  // If i is divisible by number of columns, finished the row and include line jump
      printGrid.innerHTML += '<br><br>';
    }
    // print obstacles
    if( grid[i][2] === 'x' ) {
      printGrid.innerHTML += '&nbsp;<span id='+ i +' style="color:blue">[-X-]</span>&nbsp;&nbsp;';
    }else{
      printGrid.innerHTML += '&nbsp;<span id='+ i +'>['+ grid[i][0] +','+ grid[i][1] +']</span>&nbsp;&nbsp;';
    }
  }

}

// Add random obstacles
function addObstacles( grid, percent ){

  // Percent of obstacles in grid
  percent = percent / 100;
  var numObstacles = Math.floor( grid.length * percent );


  // Add obstacles in grid
  var obstaclesPositions = [];

  for( var k = 0; k < numObstacles; k++){
    var obstaclePos = Math.floor( ( Math.random() * grid.length ) ) ;    // Obtain random indexes of array grid where it will situate the obstacles
    //console.log(obstaclePos);

    // Check if obstacle position is 0. ( In position 0 of array it is not possible find an obstacle, because is the initial Rover position )
    if( obstaclePos === 0 ){
      k--;       // repeat the iteration numObstacles
      continue;
    }
    // Check if new obstacle is equals to another already included in array
    if( obstaclesPositions.indexOf( obstaclePos ) === -1 ){

      obstaclesPositions.push( obstaclePos );  // Add obstacle position in array
      for(var j = 0; j < grid.length; j++){
        if( j == obstaclePos )
          grid[j][2] = 'x';   // Add obstacle
      }

    }else{
      k--;       // repeat the iteration numObstacles
      continue;
    }
  }

}


//  OBSTACLE DETECTION  - The rover should execute the given commands until it reaches an obstacle, then stop at the last possible position and report the obstacle.
var obstacleFound = false;

function obstacleDetection( rover, newRoverPosition ){
  for( i = 0; i < grid.length; i++){
    if( newRoverPosition.position[0] === grid[i][0] &&   newRoverPosition.position[1] === grid[i][1] ) {
      if( grid[i][2] === 'x' ){
        obstacleFound = true;
        console.warn('WARNING: Rover finds an obstacle in: [' +   newRoverPosition.position[0] + ", " + newRoverPosition.position[1] + ']. It cannot continue in this direction!');
        break;
      }else{
        // Move rover
        rover.position[0] =  newRoverPosition.position[0] ;
        rover.position[1] =  newRoverPosition.position[1] ;
        break;
      }
    }
  }
}


// New object to check obstacles in new position
var newRoverPosition = {
  position: []
};

// GO FORWARD
function goForward( rover ) {

  switch(rover.direction) {

    case 'N':
      newRoverPosition.position[0] = rover.position[0] - 1;
      newRoverPosition.position[1] = rover.position[1];
      changeEdgeGrid(newRoverPosition);
      obstacleDetection( rover, newRoverPosition );
      break;

    case 'E':
      newRoverPosition.position[0] = rover.position[0];
      newRoverPosition.position[1] = rover.position[1] + 1;
      changeEdgeGrid(newRoverPosition);
      obstacleDetection( rover, newRoverPosition );
      break;

    case 'S':
      newRoverPosition.position[0] = rover.position[0] + 1;
      newRoverPosition.position[1] = rover.position[1];
      changeEdgeGrid(newRoverPosition);
      obstacleDetection( rover, newRoverPosition );
      break;

    case 'W':
      newRoverPosition.position[0] = rover.position[0];
      newRoverPosition.position[1] = rover.position[1] - 1;
      changeEdgeGrid(newRoverPosition);
      obstacleDetection( rover, newRoverPosition );
      break;

  }

  changeEdgeGrid(rover);
  console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]");
}

// GO BACKWARD
function goBackward(rover) {

  switch(rover.direction) {

    case 'N':
      newRoverPosition.position[0] = rover.position[0] + 1;
      newRoverPosition.position[1] = rover.position[1];
      changeEdgeGrid(newRoverPosition);
      obstacleDetection( rover, newRoverPosition );
      break;

    case 'E':
      newRoverPosition.position[0] = rover.position[0];
      newRoverPosition.position[1] = rover.position[1] - 1;
      changeEdgeGrid(newRoverPosition);
      obstacleDetection( rover, newRoverPosition );
      break;

    case 'S':
      newRoverPosition.position[0] = rover.position[0] - 1;
      newRoverPosition.position[1] = rover.position[1];
      changeEdgeGrid(newRoverPosition);
      obstacleDetection( rover, newRoverPosition );
      break;

    case 'W':
      newRoverPosition.position[0] = rover.position[0];
      newRoverPosition.position[1] = rover.position[1] + 1;
      changeEdgeGrid(newRoverPosition);
      obstacleDetection( rover, newRoverPosition );
      break;
  }
  changeEdgeGrid(rover);
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
function sendCommands( commands ){

  var validCommands = ['f','b','l','r'];
  var commandsSended = [];

  if( commands === '' || commands === null )
    console.warn('WARNING! You must type at least one command to move the rover');
  else
    commandsSended = commands.split('');

  for( var i = 0; i < commandsSended.length; i++ ){

      // Check commands until rover finds an obstacle. At this moment sequence of commands finished.
      if( obstacleFound === false ){

        // check if the command is validComand
        switch(true) {

          case commandsSended[i] === validCommands[0] :
            goForward(myRover);
            break;
          case commandsSended[i] === validCommands[1] :
            goBackward(myRover);
            break;
          case commandsSended[i] === validCommands[2] :
            turnLeft(myRover);
            break;
          case commandsSended[i] === validCommands[3] :
            turnRight(myRover);
            break;
          default:
            isValidSequence = false;
            console.warn('Invalid command: ', commandsSended[i]);
            break;
        }

      }


  }
  return isValidSequence;

}

// USER TYPES A SEQUENCE OF COMMANDS TO MOVE THE ROVER
function typeCommands(){

  var commands = prompt("Send a sequence of commands to move the rover (f,b,r,l). For example: fffblffrb");
  isValidSequence = sendCommands(commands);
  if(isValidSequence){
    printRoverInMap(myRover);
  }else{
    alert('Error: You must type a valid sequence of commands');
  }

  // Disable button "Move rover"+
  document.getElementById("moveRover").disabled = true;

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

function reloadPage() {
    location.reload();
}
