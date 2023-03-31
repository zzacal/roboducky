import { openaiClient } from "./openai";

export type ChatHandler = (prompt: string) => Promise<string>;

export type Command = {
  name: string,
  description: string,
  handler: ChatHandler
};

export const ChatGptCommand: Command = {
  name: "ChatGpt3",
  description: "openai chat gpt 3.5",
  handler: function (prompt: string): Promise<string> {
    openaiClient.createChatCompletion({
      model: "",
      messages: []
    })
  }
}
