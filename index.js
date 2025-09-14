import { pipeline } from "@huggingface/transformers";
// npm i @huggingface/transformers

async function runDeepSeekCoder() {
    console.log('start');
  // Create a text generation pipeline with ONNX-compatible DeepSeek Coder model
  const generator = await pipeline(
    "text-generation",
    "onnx-community/deepseek-coder-1.3b-instruct-ONNX",
    { dtype: "q4" }
  );
  console.log('generator');
  // Define chat messages as required format (array of {role, content})
  const messages = [
    { role: "user", content: "Can you write a function outputs fibbonaccy in c#?" }
  ];
  var now = new Date();
  console.log('messages', now.toString());
  // Generate a response from the model
  const output = await generator(messages, { 
    max_new_tokens: 512,
    do_sample: false
  });
  // Log the generated content
  now = new Date();
  console.log(now.toString(), output[0].generated_text);
}

runDeepSeekCoder();