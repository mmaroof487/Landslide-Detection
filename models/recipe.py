from transformers import T5Tokenizer, T5ForConditionalGeneration

tokenizer = T5Tokenizer.from_pretrained("flax-community/t5-recipe-generation")
model = T5ForConditionalGeneration.from_pretrained("flax-community/t5-recipe-generation")

ingredients = "onion, tomato, rice, cumin"
input_text = f"ingredients: {ingredients}"

input_ids = tokenizer(input_text, return_tensors="pt").input_ids
outputs = model.generate(input_ids, max_length=150)
recipe = tokenizer.decode(outputs[0], skip_special_tokens=True)

print("🍛 Suggested Recipe:\n", recipe)
