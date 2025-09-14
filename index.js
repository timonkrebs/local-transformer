import { pipeline } from "@huggingface/transformers";

async function run() {
    let now = new Date();
    console.log('start', now.toString());

    /* Create a text generation pipeline with ONNX-compatible DeepSeek Coder model or Qwen2.5-Coder
    const generator = await pipeline(
        "text-generation",
        "onnx-community/deepseek-coder-1.3b-instruct-ONNX", // runs much faster or use "onnx-community/Qwen2.5-Coder-1.5B-Instruct"
        { dtype: "q4" }
    );*/
    const generator = await pipeline(
        "text-generation",
        "onnx-community/Phi-4-mini-instruct-ONNX-GQA",
        { dtype: "q4f16"  } // Specify the 4-bit quantized version
    );
    now = new Date();
    console.log('initialized generator', now.toString());

    // Define chat messages as required format (array of {role, content})
    const messages = [
        { role: "user", content: "Can you write a function outputs fibonaccy in c#?" }
    ];

    // Generate a response from the model
    const output = await generator(messages, {
        max_new_tokens: 512,
        do_sample: false
    });

    // Log the generated content
    now = new Date();
    console.log(now.toString(), output[0].generated_text);
}

run();
