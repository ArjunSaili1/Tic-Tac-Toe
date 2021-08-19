const game = (()=> {
    const gridboxes = document.querySelectorAll('.gridbox')
    const winMessage = document.querySelector('#win-message');
    
    const gameBoard = (() => {
        const gameboardArray = [null, null, null, null, null, null, null, null, null];

        const addMove = (index, playerSymbol) => {
            if (gameboardArray[index] === null){
                gameboardArray.splice(index, 1, playerSymbol);
                displayController.endTurn();
                displayController.render(); 
            }
        }
        return {addMove, gameboardArray}
    })();

    const Player = ((playerNum) => {
        const symbol = playerNum == 1 ?  'O' : 'X';
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
        const gboardarr = gameBoard.gameboardArray;
        let binded = false; 
        let currentTurn;

        const startGame = () => {
            if(!binded){
                bindEvents();
            }
        }

        const checkForWin = () => {
            if((!(gboardarr[4] == null)) && (((!(gboardarr[0]==null)) && (!(gboardarr[8]==null)))
            || ((!(gboardarr[2]==null)) && (!(gboardarr[6]==null))))){
                if((gboardarr[4] == gboardarr[2] && gboardarr[2]==gboardarr[6])){
                    win(currentTurn.getSymbol());
                }
                if(gboardarr[4] == gboardarr[0] && gboardarr[0] == gboardarr[8]){
                    win(currentTurn.getSymbol());
                }
            }
            for(let i=0;i<=gboardarr.length;i++){
                if(!(gboardarr[i] == null)){
                    if(i==0 || i==3 || i==6){
                        if( gboardarr[i]==gboardarr[i+1] && 
                            gboardarr[i+1]==gboardarr[i+2]){
                                win(currentTurn.getSymbol())
                            }
                    }
                    if(i==0 || i==1 || i==2){
                        if(gboardarr[i] == gboardarr[i+3] &&
                            gboardarr[i+3] == gboardarr[i+6]){
                                win(currentTurn.getSymbol())
                            }
                    }
                }
            }
        }

        const win = (playerNum) => {
            winMessage.textContent =  `Player ${playerNum} wins!`;
            
        }


        const endTurn = () => {
            checkForWin();
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
            binded = true;
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
        return {currentTurn,startGame, endTurn, render}
    })();
    displayController.startGame();
})();
