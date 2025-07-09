// Toggle Chat Visibility
function toggleChat() {
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.style.display = chatContainer.style.display === "none" ? "block" : "none";
}

// Send Message
function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    let chatBox = document.getElementById("chatBox");

    // Display User Message
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById("userInput").value = "";

    // Get and Display Bot Response
    let botResponse = getBotResponse(userInput);
    chatBox.innerHTML += `<p><strong>Zoo Guide:</strong> ${botResponse}</p>`;

    // Convert Text to Speech
    speak(botResponse);

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Basic Bot Response Logic
function getBotResponse(input) {
    let responses = {
        "hello": "Hello! Welcome to the Virtual Zoo!",
        "hi": "Hello! Welcome to the Virtual Zoo!",
        "what games are available?": "You can play Scavenger Hunt, Puzzle, Habitat Matching, Blurred Safari, and Quiz.",
        "what can i explore in the zoo": "You can visit Terrestrial, Aquatic, Snow, Desert, and Special Show zones.",
        "can i see all animals in one place": "Yes! The Zoopedia has information on all animals in the zoo.",
        "who are you": "I am your zoo guide.",
        "what is zoopedia": "It is a collection of facts about different animals.",
        "what is animal tales": "It is a section with stories and videos about animals.",
        "can i learn about rare animals here": "Yes! Some stories feature endangered species and their conservation.",
        "what is quiz": "It is a game that tests your animal knowledge.",
        "tell me about lion": "Lions are big cats known for their social behavior, living in groups called prides. They are strong hunters.",
        "what animals are here": "We have lions, tigers, elephants, and more!",
        "tell me a fun fact": "Did you know? Elephants can recognize themselves in a mirror!",
        "default": "I'm not sure, but you can explore our zoo for more info!"
    };

    let lowerInput = input.toLowerCase();
    return responses[lowerInput] || responses["default"];
}

// Text-to-Speech Function
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}