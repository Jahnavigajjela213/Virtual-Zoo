// Initialize Speech Synthesis and Recognition
const synth = window.speechSynthesis;
let recognition;
let isListening = false;

// Page Navigation Data
const pages = [
    { name: "home", url: "home.html" },
    { name: "animal matching", url: "animalmatching.html" },
    { name: "blurred safari", url: "blurredsafari.html" },
    { name: "scavenger hunt", url: "scavenger.html" },
    { name: "habitat puzzle", url: "puzzlegame.html" },
    { name: "food chain quiz", url: "foodchain.html" },
    { name: "explore forest", url: "https://edu.cospaces.io/ZAD-VTY" },
    { name: "quiz", url: "quiz.html" },
    { name: "zoopedia", url: "zoopedia.html" },
    { name: "animaltales", url: "Animaltales.html" }
];

// Function to Speak Text
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
        console.log("Speech ended. Starting to listen...");
        startListening();
    };
    synth.speak(utterance);
}

// Function to Stop Ongoing Speech and Recognition
function stopSpeechAndRecognition() {
    if (synth.speaking) {
        synth.cancel();  // Stop ongoing speech
        console.log("Speech synthesis canceled.");
    }
    if (recognition && isListening) {
        recognition.stop();  // Stop ongoing recognition
        isListening = false;
        console.log("Voice recognition stopped.");
    }
}

// Function to Initialize Voice Recognition
function initializeRecognition() {
    if (!recognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            console.log('Voice recognition started. Speak now...');
            isListening = true;
        };

        recognition.onresult = event => {
            const userQuery = event.results[0][0].transcript.toLowerCase();
            console.log('User said:', userQuery);
            processQuery(userQuery);
        };

        recognition.onerror = event => {
            console.error('SpeechRecognition error:', event.error);
            speak("I'm sorry, I couldn't hear you clearly. Can you repeat that?");
        };

        recognition.onend = () => {
            console.log('Voice recognition ended.');
            isListening = false;
            setTimeout(() => startListening(), 500); // Restart Listening
        };
    }
}

// Function to Start Listening
function startListening() {
    if (recognition && !isListening && !synth.speaking) {
        console.log("Starting recognition...");
        recognition.start();
        isListening = true;
    }
}

// Function to Give Description of Games Page
function describeGamesPage() {
    const description = `
        Welcome to the Games page! Here you can play educational and fun animal games.
        You can choose from Animal Matching, Blurred Safari, Zoo Scavenger Hunt,
        Habitat Puzzle, and the Food Chain Quiz. 
        Just ask me to open any game, or navigate to another page. 
        What would you like to do next?
    `;
    speak(description);
}

// Function to Navigate to Different Pages
function navigateToPage(query) {
    const page = pages.find(p => query.includes(p.name.toLowerCase()));
    if (page) {
        speak(`Navigating to ${page.name}.`);
        setTimeout(() => {
            stopSpeechAndRecognition();  // Stop speech and recognition before navigating
            window.location.href = page.url;
        }, 1000); // Reduced delay for faster navigation
    } else {
        speak("Sorry, I didn't understand that. Please try again.");
    }
}

// Function to Process User's Voice Query
function processQuery(query) {
    console.log('Processing query:', query);

    if (query.includes("go to") || query.includes("open") || query.includes("navigate to")) {
        navigateToPage(query);
    } else if (query.includes("describe games page") || query.includes("tell me about this page")) {
        describeGamesPage();
    } else if (query.includes("home")) {
        navigateToPage("home");
    } else if (query.includes("animal matching")) {
        navigateToPage("animal matching");
    } else if (query.includes("blurred safari")) {
        navigateToPage("blurred safari");
    } else if (query.includes("scavenger hunt")) {
        navigateToPage("scavenger hunt");
    } else if (query.includes("habitat puzzle")) {
        navigateToPage("habitat puzzle");
    } else if (query.includes("food chain quiz")) {
        navigateToPage("food chain quiz");
    } else if (query.includes("explore forest")) {
        navigateToPage("explore");
    } else if (query.includes("quiz")) {
        navigateToPage("quiz");
    } else if (query.includes("zoopedia")) {
        navigateToPage("zoopedia");
    } else if (query.includes("animaltales")) {
        navigateToPage("Animaltales");
    } else {
        speak("I'm sorry, I didn't understand that. Please try again.");
    }
}

// Activate Voice Assistant on Button Click
window.onload = function() {
    console.log('Window loaded, attaching event listener...');
    const voiceButton = document.getElementById('voice-assistant-btn');
    if (voiceButton) {
        voiceButton.addEventListener('click', () => {
            console.log('Voice button clicked.');
            if (isListening) {
                recognition.stop();  // Stop any ongoing recognition first
            }
            speak('Hello! I am your Zoo Guide.');
            setTimeout(() => {
                describeGamesPage();
            }, 1000);
        });
    } else {
        console.error('Voice assistant button not found.');
    }
}

// Stop Speech on Page Unload (for all navigation scenarios)
window.onbeforeunload = function() {
    stopSpeechAndRecognition();
};

// Initialize Recognition on Page Load
initializeRecognition();
