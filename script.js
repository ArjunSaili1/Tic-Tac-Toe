const game = (()=> {
    const gridboxes = document.querySelectorAll('.gridbox')
    
    const gameBoard = (() => {
        const gameboardArray = [null, null, null, null, null, null, null, null, null];

        const addMove = (index, playerSymbol) => {
            if (gameboardArray[index] === null){
                gameboardArray.splice(index, 1, playerSymbol);
                displayController.render();
            }
        }


        return {addMove, gameboardArray}
    })();

    const displayController = (()=> {
        const render = () => {
            for(let i=1; i<=gameBoard.gameboardArray.length; i++){
                gridboxes[i-1].textContent = gameBoard.gameboardArray[i-1];
            }
        }
        return {render}
    })();

    const Player = ((playerNum) => {
        const symbol = playerNum == 1 ?  'X' : 'O';
        const getPlayerNum = () => playerNum;
        const getSymbol = () => symbol;
        const play = () => {
            for(let i = 0; i < gridboxes.length; i++){
                gridboxes[i].addEventListener('click', makeMove.bind(null, i));
            }
        }
        const makeMove = (index) => {
            gameBoard.addMove(index, symbol);
        }

        return {play, getSymbol, getPlayerNum}
    });

    displayController.render();
    const player1 = Player(2);
    player1.play();
    console.log(player1.getSymbol());
})();
