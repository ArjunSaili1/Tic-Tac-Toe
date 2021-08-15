const gameBoard = (() => {
    const gameboardArray = ['X','O','X','X','O','X','O','O','X'];

    const createGameboard = () =>{
        for(let i=1; i<=gameboardArray.length; i++){
            document.querySelector('#box-' + i).textContent = gameboardArray[i-1];
        }
    }
    return {gameboardArray, createGameboard}
})();

const displayController = (()=> {

})();

const Player = (() => {
    // Add Properties and Methods here!
});

gameBoard.createGameboard();
