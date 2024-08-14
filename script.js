'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//deklarujeme venku, protoze cast kodu pouzijeme i jinde
let scores, currentScore, activePlayer, playing;

//starting conditions
//resetuje hru
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  // přehodí aktivní classu z jedné classy na druhou
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  // prepinani mezi hracemi, pokud je aktivni hrac 0 zmeni se na 1 a naopak
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //prepinani HTML tridy mezi hraci
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.display dice - odstraní schování
    diceEl.classList.remove('hidden');
    // obrázek kostka = dice náhodné číslo vygenerované
    diceEl.src = `dice-${dice}.png`;

    // 3.check for rolled 1
    if (dice !== 1) {
      // přidání kostky k skore
      // TOHLE JE SČÍTÁNÍ KAŽDÝHO HODU
      currentScore += dice;
      //TOHLE JE PŘIDÁNÍ VÝSLEDKU DO OBRÁZKU
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      //current0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active players score
    scores[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check score if players score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
