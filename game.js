const player = {
    name: 'player',
    score: 0
  };
  
  let tiles = 0;
  const box = document.querySelector('.parent');
  const grids = document.querySelectorAll('.child');
  const scoreDisplay = document.querySelector('#score');
  const nextLevel = document.querySelector('.next-level');
  const newGame = document.querySelector('.new-game');
  const nextLevelButton = document.querySelector('#next-level-button');
  const newGameButton = document.querySelector('#new-game-button');
  const playerName = document.querySelector('#player-name');
  const playerNameHeader = document.querySelector('#player-name-header');
  const highScore = document.querySelector('#high-score');
  const header = document.querySelector('#user-info');
  const gameInfo = document.querySelector('#game-info');
  const gameOver = document.querySelector('.game-over');
  const playAgainButton = document.querySelector('#play-again-button');
  
  const loseAudio = new Audio('./audio/lose.wav');
  const goodMoveAudio = new Audio('./audio/goodmove.wav');
  const buttonAudio = new Audio('./audio/button.wav');
  
  // Helper functions
  
  const clearGrids = () => {
    grids.forEach(grid => {
      grid.good = false;
      grid.great = false;
      grid.classList.remove('good', 'bad');
    });
  };
  
  const setGrids = () => {
    for (let i = 0; i < tiles; i++) {
      grids[i].good = true;
      grids[i].great = true;
    }
  };
  
  const shuffle = () => {
    grids.forEach(grid => {
      grid.style.order = Math.floor(Math.random() * 64) + 1;
    });
  };
  
  const applyState = () => {
    grids.forEach(grid => {
      if (grid.good) {
        grid.classList.add('good');
      }
    });
  };
  
  const removeState = () => {
    setTimeout(() => {
      grids.forEach(grid => {
        grid.classList.remove('good');
      });
      setTimeout(() => {
        box.addEventListener('click', gameSetup);
      }, 300);
    }, 1700);
  };
  
  const checkGrids = () => {
    return !grids.some(grid => grid.good);
  };
  
  // Main game function
  
  const gameSetup = (event) => {
    if (event.target.classList.contains('parent')) {
      return;
    }
  
    if (event.target.great === true) {
      goodMoveAudio.pause();
      goodMoveAudio.currentTime = 0;
      goodMoveAudio.play();
  
      event.target.classList.add('good');
      player.score += 10;
      scoreDisplay.innerHTML = player.score;
      event.target.good = false;
  
      if (checkGrids()) {
        setTimeout(() => {
          box.style.height = '20px';
  
          setTimeout(() => {
            nextLevel.style.display = 'block';
            setTimeout(() => {
              nextLevel.style.height = '500px';
            }, 500);
          }, 500);
        }, 500);
      }
    } else {
      box.removeEventListener('click', gameSetup);
      loseAudio.play();
  
      grids.forEach(grid => {
        if (grid.good === true) {
          grid.classList.add('good');
        }
      });
  
      const object = JSON.parse(localStorage.memoryMatrix);
  
      if (object[player.name] < player.score) {
        object[player.name] = player.score;
        localStorage.memoryMatrix = JSON.stringify(object);
      }
  
      tiles = 0;
      player.score = 0;
      scoreDisplay.innerHTML = player.score;
      highScore.innerHTML = object[player.name];
      event.target.classList.add('bad');
  
      setTimeout(() => {
        box.style.height = '20px';
        setTimeout(() => {
          gameOver.style.display = 'block';
          setTimeout(() => {
            gameOver.style.height = '500px';
          }, 500);
        }, 500);
      }, 2000);
    }
  };
  
  const game = async () => {
    if (tiles >= 64) {
      alert('Congratulations! You won!');
      return;
    }
  
    setTimeout(() => {
      nextLevel.style.display = 'none';
      newGame.style.display = 'none';
      gameOver.style.display = 'none';
      box.style.height = '500px';
    }, 500);
  
    box.removeEventListener('click', gameSetup);
    tiles++;
    clearGrids();
  
    setTimeout(() => {
      setGrids();
      shuffle();
      setTimeout(() => {
        applyState();
        removeState();
      }, 500);
    }, 1000);
  };
  
  // Event listeners
  
  nextLevelButton.addEventListener('click', (e) => {
    e.preventDefault();
    nextLevel.style.height = '20px';
    buttonAudio.play();
    setTimeout(game, 500);
  });
  
  newGameButton.addEventListener('click', (e) => {
    e.preventDefault();
    buttonAudio.play();
    const inputName = playerName.value;
  
    if (inputName === '') {
      alert('Please enter your name to track your progress.');
      return;
    }
  
    player.name = inputName;
    playerNameHeader.innerHTML = inputName;
  
    if (typeof localStorage.memoryMatrix === 'undefined') {
      const object = { [inputName]: 0 };
      localStorage.memoryMatrix = JSON.stringify(object);
      highScore.innerHTML = 0;
    } else {
      const object = JSON.parse(localStorage.memoryMatrix);
  
      if (typeof object[inputName] === 'undefined') {
        object[inputName] = 0;
        localStorage.memoryMatrix = JSON.stringify(object);
        highScore.innerHTML = 0;
      } else {
        highScore.innerHTML = object[inputName];
      }
    }
  
    header.style.display = 'flex';
    gameInfo.style.display = 'none';
    newGame.style.height = '20px';
    setTimeout(game, 500);
  });
  
  playAgainButton.addEventListener('click', (e) => {
    e.preventDefault();
    buttonAudio.play();
    gameOver.style.height = '20px';
    setTimeout(game, 500);
  });
  