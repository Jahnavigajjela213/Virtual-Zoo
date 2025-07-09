import pyaudio
import pyttsx3  # pip install pyttsx3
import speech_recognition as sr  # pip install SpeechRecognition
import datetime
import wikipedia  # pip install wikipedia
import webbrowser
import os

# Initialize the speech engine
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)

# Function to make the assistant speak
def speak(audio):
    engine.say(audio)
    engine.runAndWait()

# Function to wish the user
def wishMe():
    hour = int(datetime.datetime.now().hour)
    if hour >= 0 and hour < 12:
        speak("Good Morning!")

    elif hour >= 12 and hour < 18:
        speak("Good Afternoon!")

    else:
        speak("Good Evening!")

    speak("I am your Zoo Assistant. How may I help you today?")

# Function to take voice commands from the user
def takeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1
        audio = r.listen(source)

    try:
        print("Recognizing...")
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}\n")

    except Exception as e:
        print("Could not understand. Please say that again...")
        return "None"
    return query.lower()

# Main function
if __name__ == "__main__":
    wishMe()
    while True:
        query = takeCommand()

        # Wikipedia Search
        if 'wikipedia' in query:
            speak('Searching Wikipedia...')
            query = query.replace("wikipedia", "")
            results = wikipedia.summary(query, sentences=2)
            speak("According to Wikipedia")
            print(results)
            speak(results)

        # Navigate to Virtual Zoo Pages
        elif 'open animal tales' in query:
            speak("Opening Animal Tales page.")
            webbrowser.open("http://localhost/VirtualZoo/animalTales.html")

        elif 'open zoo pedia' in query:
            speak("Opening Zoo Pedia page.")
            webbrowser.open("http://localhost/VirtualZoo/zooPedia.html")

        elif 'open games' in query:
            speak("Opening Games page.")
            webbrowser.open("http://localhost/VirtualZoo/games.html")

        elif 'open homepage' in query or 'go to home' in query:
            speak("Navigating to the Homepage.")
            webbrowser.open("http://localhost/VirtualZoo/index.html")

        # General Web Navigation
        elif 'open youtube' in query:
            speak("Opening YouTube.")
            webbrowser.open("youtube.com")

        elif 'open google' in query:
            speak("Opening Google.")
            webbrowser.open("google.com")

        # Time Inquiry
        elif 'the time' in query:
            strTime = datetime.datetime.now().strftime("%H:%M:%S")
            speak(f"The time is {strTime}")

        # Exit Command
        elif 'quit' in query or 'exit' in query:
            speak("Goodbye! Have a great day.")
            break
