import { pipeline } from "@huggingface/transformers";

let generator;

async function initializeGenerator() {
    if (!generator) {
        console.log('Initializing generator...');
        generator = await pipeline(
            "text-generation",
            "onnx-community/Phi-4-mini-instruct-ONNX-GQA",
            { dtype: "q4f16" } // Specify the 4-bit quantized version
        );
        console.log('Generator initialized.');
    }
}

export async function generateResponse(userMessage) {
    await initializeGenerator();

    const messages = [
        { role: "user", content: userMessage }
    ];

    const output = await generator(messages, {
        max_new_tokens: 512,
        do_sample: false
    });

    return output[0].generated_text;
}
