// Initialize Speech Synthesis
const synth = window.speechSynthesis;
let recognition;
let isListening = false;

// Animal Data Included Directly in JS
const animalsData = [
    { name: "lion", info: "The lion is known as the king of the jungle, famous for its majestic mane and powerful roar." },
    { name: "elephant", info: "Elephants are the largest land animals on Earth, known for their intelligence, memory, and long trunks." },
    { name: "tiger", info: "Tigers are big cats known for their orange fur and black stripes, making them excellent hunters." },
    { name: "cheetah", info: "Cheetahs are the fastest land animals, capable of reaching speeds up to 70 mph in short bursts." },
    { name: "monkey", info: "Monkeys are playful primates known for their intelligence, agility, and social behavior in troops." },
    { name: "fox", info: "Foxes are small, cunning animals known for their bushy tails and adaptability to different habitats." },
    { name: "giraffe", info: "Giraffes are the tallest land animals, recognized by their long necks and unique spotted coats." },
    { name: "hippopotamus", info: "Hippos are large, semi-aquatic mammals known for their massive mouths and spending time in water." },
    { name: "bear", info: "Bears are powerful mammals with thick fur, found in forests and mountains, known for hibernation." },
    { name: "zebra", info: "Zebras are herbivorous animals with distinctive black-and-white striped coats." },
    { name: "crocodile", info: "Crocodiles are large reptiles with powerful jaws, known for their stealth and aquatic hunting skills." },
    { name: "peacock", info: "Peacocks are known for their vibrant, iridescent tail feathers displayed during courtship." },
    { name: "koala", info: "Koalas are marsupials native to Australia, known for their eucalyptus diet and sleepy nature." },
    { name: "panda", info: "Pandas are gentle giants known for their black-and-white fur and bamboo diet." },
    { name: "hyena", info: "Hyenas are scavengers known for their powerful jaws and distinctive laughing calls." },
    { name: "red panda", info: "Red pandas are small, tree-dwelling mammals with reddish-brown fur and a bushy tail." },
    { name: "flamingo", info: "Flamingos are wading birds known for their pink feathers, long legs, and distinctive curved beaks." },
    { name: "rhinoceros", info: "Rhinoceroses are large herbivores known for their thick skin and iconic horns on their snouts." },
    { name: "gorilla", info: "Gorillas are the largest primates, living in forests and moving in family groups. They are mostly herbivorous and highly intelligent." },
    { name: "artic hare", info: "Arctic hares have thick white fur that helps them blend into the snow. They can run up to 60 km/h to escape predators." },
    { name: "Russian Blue (Cat) ", info: "This cat breed has a dense blue-gray coat and green eyes. It is known for its friendly yet shy nature." },
    { name: "Snow Leopard", info: "Snow leopards are elusive big cats with thick fur and long tails for balance. They live in the cold mountains of Central Asia." },
    { name: "Snow Bear (Polar Bear)", info: "Polar bears are strong swimmers that hunt seals on Arctic ice. Their white fur helps them camouflage in the snow." },
    { name: "Swan", info: "Swans are graceful water birds known for their long necks and lifelong pair bonds. They are excellent swimmers and strong flyers." },
    { name: "crab", info: "Crabs have hard shells and walk sideways with their ten legs. Some species can survive both in water and on land." },
    { name: "Orca (Killer Whale) ", info: "Orcas are intelligent marine mammals that hunt in groups. They are powerful predators with a diet ranging from fish to seals." },
    { name: "Dolphin ", info: "Dolphins are social and playful creatures known for their intelligence. They use echolocation to navigate underwater." },
    { name: "Turtle ", info: "Turtles have protective shells and can live both on land and in water. Some sea turtles migrate thousands of miles across oceans." },
    { name: "whale", info: "Whales are the largest animals on Earth, with some species communicating through deep underwater songs. They are vital to ocean ecosystems." },
    { name: "Starfish ", info: "Starfish have five or more arms and can regenerate lost limbs. They move using tiny tube feet underneath their bodies." },
    { name: "shark", info: "Sharks are ancient predators with sharp teeth and powerful senses. They detect even the slightest movements in water." },
    { name: "horse", info: " Horses are strong, fast, and domesticated for transport and farming. Wild horses still roam certain desert regions." },
    { name: "snakes", info: "Desert snakes like the rattlesnake and sand boa have adapted to survive in extreme heat. Some burrow under the sand to stay cool." },
    { name: "camel", info: " Camels, known as ships of the desert, store fat in their humps to survive long periods without water. They have thick eyelashes to block sand." },
    
];

// Function to Speak Text
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
        console.log('SpeechSynthesis finished.');
        // Resume Listening After Speaking
        setTimeout(() => listen(), 800);
    };
    utterance.onerror = event => {
        console.error('SpeechSynthesis error:', event.error);
    };
    synth.speak(utterance);
}

// Function to Initialize Voice Recognition
function initializeRecognition() {
    // Only initialize once
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
            // Restart Listening to Keep It Active
            setTimeout(() => listen(), 500);
        };
    }
}

// Start Listening
function listen() {
    if (recognition && !isListening && !synth.speaking) {
        recognition.start();
    }
}

// Function for Homepage Tour & Project Overview
function giveProjectOverview() {
    const overview = `
        Welcome to the Virtual Zoo! 
        Here, you can learn about amazing animals, 
        listen to their descriptions, play educational games, 
        and explore a virtual forest. 
        Just ask me about any animal to learn more!
    `;
    speak(overview);
}

// Activate Voice Assistant on Button Click
const voiceButton = document.getElementById('voice-assistant-btn');
if (voiceButton) {
    voiceButton.addEventListener('click', () => {
        speak('Hello! I am your Zoo Guide.');
        setTimeout(() => {
            giveProjectOverview();
        }, 1000); // Small delay before starting the overview
        initializeRecognition();
        listen();
    });
}

// Page Navigation Data
const pages = [
    { name: "home", url: "index.html" },
    { name: "games", url: "games.html" },
    { name: "quiz", url: "quiz.html" },
    { name: "zoo pedia", url: "zoopedia.html" },
    { name: "animal tales", url: "Animaltales.html" },
    { name: "explore forest", url: "https://edu.cospaces.io/ZAD-VTY" }
];

// Function to Navigate to Different Pages
function navigateToPage(query) {
    const page = pages.find(p => query.includes(p.name.toLowerCase()));
    if (page) {
        // Stop ongoing speech immediately
        synth.cancel(); 
        
        // Announce navigation without continuing speech
        const announcement = new SpeechSynthesisUtterance(`Navigating to ${page.name}.`);
        announcement.onend = () => {
            // Stop recognition to avoid restarting
            if (recognition) {
                recognition.onend = null; 
                recognition.stop();
            }

            // Navigate to the new page
            window.location.href = page.url;
        };
        synth.speak(announcement);
    } else {
        speak("Sorry, I didn't understand that. Please try again.");
    }
}

// Function to Process User's Voice Query
function processQuery(query) {
    console.log('Processing query:', query);

    // Check if user wants an animal description
    if (animalsData.some(a => query.includes(a.name.toLowerCase()))) {
        const animal = animalsData.find(a => query.includes(a.name.toLowerCase()));
        speak(`The ${animal.name} is ${animal.info}`);
    }
    else if (query.includes("go to") || query.includes("open")) {
        navigateToPage(query);
    }
    else {
        speak("I'm sorry, I didn't understand that. Please try again.");
    }
}

// Ensure speech stops when leaving the page
window.onbeforeunload = function() {
    synth.cancel();
    if (recognition) {
        recognition.stop();
    }
};
