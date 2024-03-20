document.addEventListener("DOMContentLoaded", function () {
    const gameBoard = document.getElementById("game-board");
    const balanceDisplay = document.getElementById("balance-value");
    const betAmountInput = document.getElementById("bet-amount");
    const driverSelect = document.getElementById("driver-select");
    const placeBetButton = document.getElementById("place-bet");
    const restartRaceButton = document.getElementById("restart-race");
  
    let balance = 100;
    let carsPosition = [0, 0, 0, 0, 0]; // Initial position of each car
    const carColor = ["#FFB6C1", "blue", "purple", "black", "white"];
    let raceInterval;
    let raceStarted = false; // Track if the race has started
  
    // Update the "Place Bet" button state based on the bet amount input
    function updatePlaceBetButtonState() {
      const betAmount = parseInt(betAmountInput.value);
      if (betAmount < 5) {
        placeBetButton.disabled = true; // Disable the button if bet amount is less than 5
      } else {
        placeBetButton.disabled = false; // Enable the button otherwise
      }
    }

    // Add event listener to the bet amount input to update button state
    betAmountInput.addEventListener("input", updatePlaceBetButtonState);

    function startRace() {
      raceInterval = setInterval(moveCars, 50);
    }
  
    restartRaceButton.addEventListener("click", function () {
      clearInterval(raceInterval); // Limpa o intervalo da corrida atual, se houver
      restartPosition(); // Reseta a posição dos carros
      const cars = document.querySelectorAll(".car");
      cars.forEach((car, index) => {
        car.style.marginLeft = "0px"; // Reinicia a posição visual dos carros
      });
      raceStarted = false; // Define que a corrida não começou
    });
  
    function restartPosition() {
      carsPosition = [0, 0, 0, 0, 0]; // Reinicia a posição dos carros
    }
  
    function moveCars() {
      for (let i = 0; i < carsPosition.length; i++) {
        carsPosition[i] += Math.random() * 10; // Move aleatorio
        const carElement = document.getElementById("car-" + (i + 1));
        carElement.style.marginLeft = carsPosition[i] + "px"; // atualiza car
        if (carsPosition[i] >= 800) {
          clearInterval(raceInterval); // para a corrida
          announceResult(i + 1); // mostra resultado
          carElement.style.marginLeft = "800px"; // Posição final dos carros
        }
      }
    }
  
    function announceResult(winningDriver) {
      const selectedDriver = parseInt(driverSelect.value);
      if (winningDriver === selectedDriver) {
        balance += 10; // ganha R$5 e a aposta de volta
        alert("Congratulations! Your driver won the race. You won R$10");
      } else {
        balance -= 5; // perde a aposta
        alert("Sorry! Your driver didn't win the race. You lost R$5");
      }
      balanceDisplay.textContent = balance; // atualiza o dinheiro
      restartPosition();
      betAmountInput.value = "5"; // redefine a aposta para R$5
      updatePlaceBetButtonState(); // Update button state after resetting bet amount
    }
  
    placeBetButton.addEventListener("click", function () {
      if (!raceStarted) { // Check if race has not started
        const betAmount = parseInt(betAmountInput.value);
        if (betAmount > balance) {
          alert("You don't have enough balance to place this bet.");
        } else {
          startRace(); // Inicia a corrida
          raceStarted = true; // Define que a corrida começou
        }
      }
    });

    // Initially update the button state
    updatePlaceBetButtonState();

    for (let i = 0; i < 5; i++) {
      const car = document.createElement("div");
      car.className = "car";
      car.id = "car-" + (i + 1);
      car.style.backgroundColor = carColor[i];
      gameBoard.appendChild(car);
    }
  });
