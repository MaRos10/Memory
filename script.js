// THE CARDS
const cards = [
    { value: '🍉', matched: false, showCard: false },
    { value: '🍉', matched: false, showCard: false },
    { value: '🍇', matched: false, showCard: false },
    { value: '🍇', matched: false, showCard: false },
    { value: '🍎', matched: false, showCard: false },
    { value: '🍎', matched: false, showCard: false },
    { value: '🍒', matched: false, showCard: false },
    { value: '🍒', matched: false, showCard: false },
    { value: '🍓', matched: false, showCard: false },
    { value: '🍓', matched: false, showCard: false },
    { value: '🍍', matched: false, showCard: false },
    { value: '🍍', matched: false, showCard: false },
    { value: '🍊', matched: false, showCard: false },
    { value: '🍊', matched: false, showCard: false },
    { value: '🍋', matched: false, showCard: false },
    { value: '🍋', matched: false, showCard: false },
  ];

// SHUFFLE THE CARDS (Fisher-Yates algorithm)
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

// SELECT gameBoard ELEMENT
  const gameBoard = document.querySelector('.cardboard');
  
// CREATE CARDS AND ATTACH EVENTLISTENERS
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.dataset.index = index;
  
    cardElement.addEventListener('click', () => {
      flipCard(index);
    });
  
    gameBoard.appendChild(cardElement);
  });


// CREATE A MESSAGE ELEMENT AND APPEND IT TO THE GAMEBOARD
  const messageElement = document.createElement('div');
  messageElement.className = 'message';
  gameBoard.appendChild(messageElement);


// VARIABLES TO TRACK CURRENTLY FLIPPED CARDS AND WHETHER CARDS CAN BE FLIPPED
  let firstCard = null;
  let secondCard = null;
  let canFlip = true;

// FLIP A CARD AND CHECK FOR MATCHES
  function flipCard(index) {
    if (!canFlip) return;
    const card = cards[index];
    const cardElement = document.querySelector(`.card[data-index='${index}']`);
  
    // TOGGLE CARD VISIBILITY
    if (card.showCard) {
      card.showCard = false;
      cardElement.textContent = '';
    } else {
      card.showCard = true;
      cardElement.textContent = card.value;
    }
    updateScreen(); 
  
    // CHECK IF IT IS THE FIRST OR SECOND CARD FLIPPED
    if (firstCard === null) {
      firstCard = card;
    } else if (secondCard === null && card !== firstCard) {
      secondCard = card;
      canFlip = false;
      
      // CHECK IF THE TWO FLIPPED CARDS MATCH
      if (firstCard.value === secondCard.value) {
        setTimeout(() => {
          // IF MATCHED, UPDATE STATE AND CHECK IF ALL CARDS ARE MATCHED
          firstCard.matched = true;
          secondCard.matched = true;
          updateScreen();
          checkIfAllMatched();
          firstCard = null;
          secondCard = null;
          canFlip = true;
        }, 0.600);
      } else {
        setTimeout(() => {
          // IF NOT MATCHED, HIDE CARDS AFTER DELAY AND ALLOW FLIPPING AGAIN
          firstCard.showCard = false;
          secondCard.showCard = false;
          updateScreen();
          firstCard = null;
          secondCard = null;
          canFlip = true;
        }, 1000);
      }
    }
  }

// UPDATE THE APPEARANCE OF CARDS ON THE SCREEN
  function updateScreen() {
    cards.forEach((card, index) => {
      const cardElement = document.querySelector(`.card[data-index='${index}']`);
  
      // SHOW OR HIDE CARD BASED ON ITS STATE
      if (card.showCard) {
        cardElement.textContent = card.value;
      } else {
        cardElement.textContent = '';
      }
  
      // CHANGE BACKGROUND COLOR TO INDICATE MATCHED CARD
      if (card.matched) {
        cardElement.style.backgroundColor = 'lightgreen';
      }
    });
  }

  // CHECK IF ALL CARDS ARE MATCHED AND END THE GAME IF SO
  function checkIfAllMatched() {
    if (cards.every(card => card.matched)) {
      messageElement.classList.add('show');
      messageElement.textContent = 'Grattis, du har klarat spelet! 🎉'; 
      setTimeout(resetGame, 5000);
    }
  }
  
  //RESET THE GAME STATE
  function resetGame() {
    cards.forEach((card, index) => {
      card.matched = false;
      card.showCard = false;
      const cardElement = document.querySelector(`.card[data-index='${index}']`);
      cardElement.style.backgroundColor = ''; 
      messageElement.textContent = '';
      messageElement.classList.remove('show');
    });
    firstCard = null;
    secondCard = null;
    canFlip = true;
    updateScreen();
  }