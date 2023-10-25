import speech_recognition as sr
from googletrans import Translator

# Initialize the recognizer
r = sr.Recognizer()
translator = Translator()

# Function to interpret speech
def interpret_speech():
    with sr.Microphone() as source:
        print("Speak something.....")
        audio = r.listen(source)

        try:
            text = r.recognize_google(audio)
            print(f"Recognized: {text}")
            translation = translator.translate(text, dest='en')
            print(f"Translation: {translation.text}")

        except sr.UnknownValueError:
            print("Could not understand audio")

        except sr.RequestError as e:
            print(f"Could not request results; {e}")

# Call the function
interpret_speech()
