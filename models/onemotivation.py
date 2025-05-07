import random
from transformers import pipeline

classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")

user_input = "I'm feeling really anxious about exams."
emotion = classifier(user_input)[0]['label']

quotes = {
    "joy": ["Keep smiling, it makes people wonder what you’re up to."],
    "anger": ["Don’t let anger control you — channel it into focus."],
    "sadness": ["This too shall pass. You’re stronger than you think."],
    "fear": ["Courage doesn’t mean no fear — it means acting anyway."],
    "surprise": ["Every surprise is an opportunity in disguise."],
    "neutral": ["You got this. One step at a time."]
}

quote = random.choice(quotes.get(emotion.lower(), quotes["neutral"]))
print(f"💬 Mood: {emotion}\n✨ Quote: {quote}")
