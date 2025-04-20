import OpenAI from "openai";

const openai = new OpenAI({
    apiKey:  "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" 
});

const run = async () => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            store: true,
            messages: [
                { role: "user", content: "write a haiku about ai" }
            ],
        });

        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
    }
};

run();
