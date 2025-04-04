// Datos de las cartas (16 elementos = 8 pares)
const cardData = [
    { id: 1, img: 'gasolina.jpg' },
    { id: 1, img: 'coche2.png' },
    { id: 2, img: 'ojos5.jpg' },
    { id: 2, img: 'gafas2.jpg' },
    { id: 3, img: 'nido.jpg' },
    { id: 3, img: 'pajaro.jpg' },
    { id: 4, img: 'pie.jpg' },
    { id: 4, img: 'zapato2.jpg' },
    { id: 5, img: 'miel.jpg' },
    { id: 5, img: 'abeja.jpg' },
    { id: 6, img: 'lana.jpg' },
    { id: 6, img: 'oveja.jpg' },
    { id: 7, img: 'zumo.jpg' },
    { id: 7, img: 'naranja.jpg' },
    { id: 8, img: 'pecera.png' },
    { id: 8, img: 'pez.webp' }
  ];
  
  let selectedCards = [];
  let matchedCards = 0;
  const gameContainer = document.querySelector('.game-container');
  
  // Función para barajar el arreglo (algoritmo Fisher-Yates)
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Crear las cartas en el DOM (todas visibles desde el inicio)
  function createCards() {
    const shuffledCards = shuffle(cardData.slice());
    shuffledCards.forEach(cardInfo => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.card = cardInfo.id;
      card.innerHTML = `<img src="${cardInfo.img}" alt="${cardInfo.img}">`;
      card.addEventListener('click', selectCard);
      gameContainer.appendChild(card);
    });
  }
  
  // Función para seleccionar una carta
  function selectCard() {
    if (this.classList.contains('matched') || this.classList.contains('selected')) {
      return;
    }
    
    this.classList.add('selected');
    selectedCards.push(this);
    
    if (selectedCards.length === 2) {
      checkMatch();
    }
  }
  
  // Función para verificar si las dos cartas seleccionadas son un par
  function checkMatch() {
    const [firstCard, secondCard] = selectedCards;
    
    if (firstCard.dataset.card === secondCard.dataset.card) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matchedCards += 1;
      selectedCards = [];
      
      if (matchedCards === cardData.length / 2) {
        setTimeout(() => alert('¡Has ganado!'), 500);
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('selected');
        secondCard.classList.remove('selected');
        selectedCards = [];
      }, 1000);
    }
  }
  
  // Inicializar el juego
  createCards();