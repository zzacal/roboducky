import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-CAPBii6Jy9RxOZx91vRnHmek",
    apiKey: process.env.OPENAI_API_KEY,
});
export const openaiClient = new OpenAIApi(configuration);
