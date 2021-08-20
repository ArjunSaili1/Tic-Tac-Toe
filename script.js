const game = (()=> {
    const gridboxes = document.querySelectorAll('.gridbox')
    const winMessage = document.querySelector('#win-message');
    const winModal = document.querySelectorAll('.win');
    const circletext = document.querySelector('#circle-text');
    
    const gameBoard = (() => {
        const gameboardArray = new Array(9).fill(null);
        const addMove = (index, playerSymbol) => {
            if (gameboardArray[index] === null){
                gameboardArray.splice(index, 1, playerSymbol);
                displayController.endTurn();
                displayController.render(); 
            }
            console.log(gameboardArray)
        }

        const getBoard = () => {return gameboardArray}

        const checkForWin = () => {
            if((!(gameboardArray[4] == null)) && (((!(gameboardArray[0]==null)) && (!(gameboardArray[8]==null)))
            || ((!(gameboardArray[2]==null)) && (!(gameboardArray[6]==null))))){
                if((gameboardArray[4] == gameboardArray[2] && gameboardArray[2]==gameboardArray[6])){
                    //win(currentTurn.getSymbol());
                    return true
                }
                if(gameboardArray[4] == gameboardArray[0] && gameboardArray[0] == gameboardArray[8]){
                    //win(currentTurn.getSymbol());
                    return true;
                }
            }
            for(let i=0;i<=gameboardArray.length;i++){
                if(!(gameboardArray[i] == null)){
                    if(i==0 || i==3 || i==6){
                        if( gameboardArray[i]==gameboardArray[i+1] && 
                            gameboardArray[i+1]==gameboardArray[i+2]){
                                //win(currentTurn.getSymbol())
                                return true;
                            }
                    }
                    if(i==0 || i==1 || i==2){
                        if(gameboardArray[i] == gameboardArray[i+3] &&
                            gameboardArray[i+3] == gameboardArray[i+6]){
                                //win(currentTurn.getSymbol())
                                return true;
                            }
                    }
                }
            }
        }

        const checkForTie = () => {
            let tieCheck = gameboardArray.filter(elm => !(elm == null))
            if(gameboardArray.length == tieCheck.length){
                return true;
            }
        }

        const resetBoard = () => {gameboardArray.fill(null);
                                displayController.render();
                                winModal.forEach(element => element.style.display = 'none');
                                winMessage.textContent =  '';
                                circletext.textContent = '';
                            }
        
        return {getBoard, resetBoard, addMove, checkForWin, checkForTie}
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
        let binded = false; 
        let currentTurn;

        const startGame = () => {
            if(!binded){
                bindEvents();
            }
        }

        const win = (playerNum) => {
            const reset = document.querySelector('#reset');
            winModal.forEach(element => element.style.display = 'unset');
            reset.addEventListener('click', gameBoard.resetBoard.bind(null, reset));
            if(playerNum){
                winMessage.textContent =  `Player ${playerNum} wins!`;
                circletext.textContent = `${playerNum}`;
            }
            else{
                winMessage.textContent =  "It's a tie!";
                circletext.textContent = "XO"
                circletext.style.fontSize = '70px';
            }
        }

        const endTurn = () => {
            if(gameBoard.checkForWin()){
                win(currentTurn.getSymbol());
            }
            else if(gameBoard.checkForTie()){
                win();
            }            
            if (currentTurn == player1){
                currentTurn = player2;
            }
            else{
                currentTurn = player1;
            }
        }

        const render = () => {
            for(let i=1; i<=gameBoard.getBoard().length; i++){
                gridboxes[i-1].textContent = gameBoard.getBoard()[i-1];
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
