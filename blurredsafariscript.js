let animalData = [
    { name: "Lion", image: "lion.jpg" },
    { name: "Elephant", image: "elephant.jpg" },
    { name: "Giraffe", image: "giraffe.jpg" },
    { name: "Zebra", image: "zebra.jpg" }
];

let currentAnimal;
let usedAnimals = [];  
let timer;
let timeLeft = 30;

function startGame() {
    timeLeft = 20;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}`;

    if (usedAnimals.length === animalData.length) {
        usedAnimals = [];  // Reset used animals
    }

    let availableAnimals = animalData.filter(animal => !usedAnimals.includes(animal));
    currentAnimal = availableAnimals[Math.floor(Math.random() * availableAnimals.length)];

    usedAnimals.push(currentAnimal);

    let imageElement = document.getElementById("animal-image");
    
    // Apply blur before changing image
    imageElement.classList.add("blurred"); 

    // Change the image AFTER a small delay to prevent flashing
    setTimeout(() => {
        imageElement.src = `images/${currentAnimal.image}`;
    }, 50); // Small delay before changing the image source

    document.getElementById("animal-guess").value = '';
    document.getElementById("feedback").textContent = '';
    
    startTimer();
}

function checkAnswer() {
    let guess = document.getElementById("animal-guess").value.trim().toLowerCase();
    if (guess === currentAnimal.name.toLowerCase()) {
        document.getElementById("feedback").textContent = "Correct! Well done!";
        document.getElementById("animal-image").classList.remove("blurred");
        stopTimer();
        setTimeout(nextAnimal, 2000);
    } else {
        document.getElementById("feedback").textContent = "Try Again!";
    }
}

function nextAnimal() {
    if (animalData.length > 0) {
        startGame();
    }
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").textContent = `Time Left: ${timeLeft}`;
        } else {
            clearInterval(timer);
            document.getElementById("feedback").textContent = "Time's up! You lost!";
            document.getElementById("animal-image").classList.remove("blurred");
            setTimeout(nextAnimal, 2000);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

window.onload = startGame;
