
var scores, roundScore, activePlayer, dice,count=0, play,input;

init();

//button roll
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (play) {
        dice = Math.floor(Math.random() * 6) + 1;

        //display dice
        var result = document.querySelector('.dice');
        result.style.display = 'block';
        result.src = 'dice-' + dice + '.png';

        dice===6?count++:count=0;

        //update score
        if (dice !== 1 && count!==2) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        else {
            document.getElementById('current-' + activePlayer).textContent = 0;
            nextPlayer();
        }
    }

});

//button hold
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (play) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = 0;

        var winningScore;
        input=document.getElementById('fscore').value;

        if(input){
            winningScore=input;
        }else{
            winningScore=100;
        }

        if (scores[activePlayer] >=winningScore) {
            document.querySelector('.dice').style.display = 'none';
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            play = false;
        }
        else {
            nextPlayer();
        }
    }

});

//button new game
document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    play = true;

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
}


function nextPlayer() {

    roundScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}