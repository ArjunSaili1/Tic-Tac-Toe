const game = (() => {
    const gridboxes = document.querySelectorAll('.gridbox')
    const winMessage = document.querySelector('#win-message');
    const winModal = document.querySelectorAll('.win');
    const playButton = document.querySelector('#play');
    const circletext = document.querySelector('#circle-text');
    const startModal = document.querySelector('#start-box');
    const reset = document.querySelector('#reset');
    const blur = document.querySelector('#blur');
    const startModalText = document.querySelector('#start-modal-text');
    const cancelButton = document.querySelector('#cancel');
    const playerOneNameField = document.querySelector('#player-one');
    const playerTwoNameField = document.querySelector('#player-two');
    const form = document.querySelector('#game-form');


    const gameBoard = (() => {
        const gameboardArray = new Array(9).fill(null);
        const addMove = (index, playerSymbol) => {
            if (gameboardArray[index] === null) {
                gameboardArray.splice(index, 1, playerSymbol);
                displayController.endTurn();
                displayController.render();
            }
        }

        const getBoard = () => {
            return gameboardArray
        }

        const checkForWin = () => {
            if ((!(gameboardArray[4] == null)) && (((!(gameboardArray[0] == null)) && (!(gameboardArray[8] == null))) ||
                    ((!(gameboardArray[2] == null)) && (!(gameboardArray[6] == null))))) {
                if (gameboardArray[4] == gameboardArray[2] && gameboardArray[2] == gameboardArray[6]) {
                    return [true, 2, 4, 6]
                }
                if (gameboardArray[4] == gameboardArray[0] && gameboardArray[0] == gameboardArray[8]) {
                    return [true, 0, 4, 8];
                }
            }
            for (let i = 0; i <= gameboardArray.length; i++) {
                if (!(gameboardArray[i] == null)) {
                    if (i == 0 || i == 3 || i == 6) {
                        if (gameboardArray[i] == gameboardArray[i + 1] &&
                            gameboardArray[i + 1] == gameboardArray[i + 2]) {
                            return [true, i, i + 1, i + 2]
                        }
                    }
                    if (i == 0 || i == 1 || i == 2) {
                        if (gameboardArray[i] == gameboardArray[i + 3] &&
                            gameboardArray[i + 3] == gameboardArray[i + 6]) {
                            return [true, i, i + 3, i + 6];
                        }
                    }
                }
            }
            return [false, null, null, null];
        }

        const checkForTie = () => {
            let tieCheck = gameboardArray.filter(elm => !(elm == null))
            if (gameboardArray.length == tieCheck.length) {
                return true;
            }
        }

        const resetBoard = () => {
            gameboardArray.fill(null);
            displayController.render();
            winModal.forEach(element => element.style.display = 'none');
            winMessage.textContent = '';
            circletext.textContent = '';
            gridboxes.forEach(element => {
                element.style.backgroundColor = 'unset'
                element.style.color = 'white'
            })
        }

        return {
            getBoard,
            resetBoard,
            addMove,
            checkForWin,
            checkForTie
        }
    })();

    const Player = ((playerNum, name) => {
        let playerName = name;
        const symbol = playerNum == 1 ? 'X' : 'O';
        const getSymbol = () => symbol;
        const makeMove = (index) => {
            gameBoard.addMove(index, symbol);
        }
        const getPlayerName = () => playerName;
        const setPlayerName = (newName) => {
            playerName = newName
        };

        return {
            getPlayerName,
            setPlayerName,
            makeMove,
            getSymbol
        }
    });

    const displayController = (() => {
        const player1 = Player(1, '');
        const player2 = Player(2, '');
        let binded = false;
        let currentTurn = player1;

        const startGame = () => {
            startModal.style.display = 'unset';
            startModalText.style.display = 'unset';
            blur.style.display = 'unset';
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                player1.setPlayerName(playerOneNameField.value);
                player2.setPlayerName(playerTwoNameField.value);
                startModalText.style.display = 'none';
                startModal.style.display = 'none';
                blur.style.display = 'none';
                playButton.style.display = 'none'
                if (!binded) {
                    bindEvents();
                }
            })
            cancelButton.addEventListener('click', function() {
                startModalText.style.display = 'none';
                startModal.style.display = 'none';
                blur.style.display = 'none';
            })
        }

        const win = (playerName, symbol, winSquares) => {
            winModal.forEach(element => element.style.display = 'unset');
            reset.addEventListener('click', gameBoard.resetBoard.bind(null, reset));
            if (playerName) {
                winSquares.forEach(square => {
                    gridboxes[square].style.backgroundColor = 'rgb(195, 240, 128)';
                    gridboxes[square].style.color = 'black';
                })
                winMessage.textContent = `${playerName} wins!`;
                circletext.textContent = `${symbol}`;
            } else {
                winMessage.textContent = "It's a tie!";
                circletext.textContent = "XO"
                circletext.style.fontSize = '70px';
            }
        }

        const endTurn = () => {
            const boardCheck = gameBoard.checkForWin();
            if (boardCheck[0]) {
                win(currentTurn.getPlayerName(), currentTurn.getSymbol(), boardCheck.slice(1));
            } else if (gameBoard.checkForTie()) {
                win();
            }
            if (currentTurn == player1) {
                currentTurn = player2;
            } else {
                currentTurn = player1;
            }
        }

        const render = () => {
            for (let i = 1; i <= gameBoard.getBoard().length; i++) {
                gridboxes[i - 1].textContent = gameBoard.getBoard()[i - 1];
            }
        }

        const bindEvents = () => {
            binded = true;
            for (let i = 0; i < gridboxes.length; i++) {
                gridboxes[i].addEventListener('click', playerTurn.bind(null, i));
            }
        }

        const playerTurn = (i) => {
            if (currentTurn == player2) {
                player2.makeMove(i);
            } else {
                player1.makeMove(i);
            }
        }
        return {
            currentTurn,
            startGame,
            endTurn,
            render
        }
    })();
    playButton.addEventListener('click', displayController.startGame);
})();