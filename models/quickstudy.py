from transformers import T5Tokenizer, T5ForConditionalGeneration

tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("t5-small")

text = """Photosynthesis is a process used by plants and other organisms to convert light energy..."""
input_ids = tokenizer("summarize: " + text, return_tensors="pt", max_length=512, truncation=True).input_ids

outputs = model.generate(input_ids, max_length=80, num_beams=4, early_stopping=True)
summary = tokenizer.decode(outputs[0], skip_special_tokens=True)

print("📚 Notes:\n", summary)
