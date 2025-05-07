from transformers import RobertaTokenizer, T5ForConditionalGeneration

tokenizer = RobertaTokenizer.from_pretrained("Salesforce/codet5-base")
model = T5ForConditionalGeneration.from_pretrained("Salesforce/codet5-base")

buggy_code = "def add(a, b):\n  return a - b"  # bug: should be a + b
input_text = f"fix: {buggy_code}"
input_ids = tokenizer.encode(input_text, return_tensors="pt", truncation=True)

outputs = model.generate(input_ids, max_length=100)
fixed_code = tokenizer.decode(outputs[0], skip_special_tokens=True)

print("🛠️ Fixed Code:\n", fixed_code)
