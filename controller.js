//FileName:		controller.js
//Programmer:	Dan Cliburn, Dean S., Chris C., Chris S.
//Date:			  8/18/2020
//Purpose:		This file defines the code for our controller
//The "controller" runs the program and handles events.

let model;
let view; //the "view" is our Canvas
let timer;

function checkKey(event) {
  switch (event.keyCode) {
    //left arrow key was pressed (37 in ASCII)
    case 37: {
      getGameModel().updatePlayerPosition(0, -1);
      break;
    }

    //up arrow key was pressed (38 in ASCII)
    case 38: {
      getGameModel().updatePlayerPosition(1, 0);
      break;
    }

    //right arrow key was pressed (39 in ASCII)
    case 39: {
      getGameModel().updatePlayerPosition(0, 1);
      break;
    }

    //down arrow key was pressed (40 in ASCII)
    case 40: {
      getGameModel().updatePlayerPosition(-1, 0);
      break;
    }

    //n key was pressed (78 in ASCII)
    case 78: {
      const gameState = getGameModel().gameState;
      if (
        gameState === GameState.MONSTER_WIN ||
        gameState === GameState.PLAYER_WIN
      ) {
        getGameModel().restart();
        clearInterval(timer);
        timer = setInterval(moveMonster, getGameModel().monsterSpeed);
      }
      break;
    }
  }

  const gameState = getGameModel().gameState;
  if (gameState !== GameState.ACTIVE) {
    clearInterval(timer);
  }
  //redraw the scene so that we can see changes
  drawModel(); //defined in model.js
}

function moveMonster() {
  getGameModel().updateMonsterPosition();
  drawModel();
}

function controller() {
  //set up the view and the model
  view = initView(); //initView is defined in view.js
  model = initModel(view); //initModel is defined in model.js

  if (model) {
    //make sure everything got initialized before proceeding
    drawModel(); // defined in model.js

    timer = setInterval(moveMonster, getGameModel().monsterSpeed); //move the monster 4 times a second
    window.onkeydown = checkKey; //call checkKey whenever a key is pressed
  } else {
    alert("Could not initialize the view and model");
  }
}
