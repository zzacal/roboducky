import { openaiClient } from "./ai-clients";

export type ChatHandler = (prompt: string) => Promise<string>;

export type Command = {
  name: string,
  description: string,
  handler: ChatHandler
};

export const ChatGptCommand: Command = {
  name: "ChatGpt3",
  description: "openai chat gpt 3.5",
  handler: async function (prompt: string) {
    const result = await openaiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt}],
      temperature: 0.7
    })
    return result.data.choices.map(c => c.message?.content).join("\n") ?? "";
  }
}
