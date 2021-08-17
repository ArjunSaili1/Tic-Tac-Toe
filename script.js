const game = (()=> {
    const gridboxes = document.querySelectorAll('.gridbox')
    
    const gameBoard = (() => {
        const gameboardArray = [null, null, null, null, null, null, null, null, null];

        const addMove = (index, playerSymbol) => {
            if (gameboardArray[index] === null){
                gameboardArray.splice(index, 1, playerSymbol);
                displayController.render(); 
                displayController.endTurn();
            }
        }
        return {addMove, gameboardArray}
    })();

    const Player = ((playerNum) => {
        const symbol = playerNum == 1 ?  'X' : 'O';
        const getPlayerNum = () => playerNum;
        const getSymbol = () => symbol;
        const makeMove = (index) => {
            gameBoard.addMove(index, symbol);
        }

        return {makeMove, getSymbol, getPlayerNum}
    });

    const displayController = (()=> {
        const player1 = Player(1);
        const player2 = Player(2);
        const startGame = () => {
            render();
            bindEvents();
        }

        let currentTurn = player1;

        const endTurn = () => {
            if (currentTurn == player1){
                currentTurn = player2;
            }
            else{
                currentTurn = player1;
            }
        }

        const render = () => {
            for(let i=1; i<=gameBoard.gameboardArray.length; i++){
                gridboxes[i-1].textContent = gameBoard.gameboardArray[i-1];
            }
        }

        const bindEvents = () => {
            for(let i = 0; i < gridboxes.length; i++){
                gridboxes[i].addEventListener('click', playerTurn.bind(null, i));
            }
        }

        const playerTurn = (i) => {
            if (currentTurn == player1){
                player1.makeMove(i);
            }
            else{
                player2.makeMove(i);
            }
        }
        return {startGame, endTurn, render}
    })();

    displayController.startGame();

})();
