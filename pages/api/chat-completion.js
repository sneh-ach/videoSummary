import { openai } from "../../src/backend/utilities/openai";

const SYSTEM_MESSAGE = `
You are an assistant who aids in providing context and additional information for YouTube videos and lecture content. Your primary tasks are:

1. Interpret and understand the context of the video or lecture being watched by the user.
2. Quote relevant portions of the transcript when offering explanations or additional context to ensure clarity and specificity.
3. Provide educational content and elaborate on topics discussed in the video only when you are certain of the accuracy. Explicitly state if you are not certain about the information.
4. Use technical or domain-specific vocabulary where applicable, ensuring that your language matches the complexity of the video or lecture content.
5. Maintain a tone that is educational but approachable, fitting the likely audience of the video or lecture.
6. Follow all privacy norms and guidelines, ensuring no unauthorized data collection or user tracking.
7. Assist by providing context-aware information or answering questions related to the content, but do not attempt to lead the interpretation or direction of the user's viewing experience.

Your primary goal is to augment the user's understanding and enjoyment of the video or lecture with accurate, context-aware information.
`;

const GENERIC_PART = `The JSON object above contains a transcript from a video. Each object has a 'text' field for spoken content and a 'timestamp' field in seconds from the start of the video.`;
const CONSTRAINT_PART = `Cite using timestamps in [minutes:seconds-minutes:seconds] format where [01:23-1:45] indicates that the sources are from 1 minute 23 seconds to 1 minute 45 seconds. All timestamps must be within the video length. For instance, if the last timestamp is '5:00', do not exceed it.`;

const LEADING_MESSAGE = `${GENERIC_PART} ${CONSTRAINT_PART}`;
const LEADING_MESSAGE_KIDS = `${LEADING_MESSAGE} Also explain like I am five who doesn't know much. Don't use any vocabulatory that is too hard for me to understand.`;

export default async function handler(req, res) {
  const { transcript, question, isKidsMode } = req.body;

  const combinedMessage = `${transcript} ${isKidsMode ? LEADING_MESSAGE_KIDS : LEADING_MESSAGE} ${question}`;

  if (!isValidTokenLength(combinedMessage, SYSTEM_MESSAGE)) {
    res.status(400).json({
      error: "Your message is too long. Please shorten it and try again."
    });
    return;
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_MESSAGE },
        { role: "user", content: combinedMessage },
      ],
      model: "gpt-3.5-turbo",
    });
    res.status(200).json({ chatCompletion });
  } catch (error) {
    // Handle other errors here
    res.status(500).json({
      error: "An error occurred while processing your request. Please try again later."
    });
  }
}

function isValidTokenLength(userMessage, systemMessage) {
  const tokenLimit = 8192; // Adjust if needed
  const totalTokens = estimateTokenCount(userMessage) + estimateTokenCount(systemMessage);
  
  return totalTokens <= tokenLimit;
}

function estimateTokenCount(message) {
  // This is a naive method by counting words; you should consider a better method.
  return message.split(/\s+/).length; 
}
