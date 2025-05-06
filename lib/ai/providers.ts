import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

const openaiApiKey = process.env.OPENAI_API_KEY;

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': openai('gpt-3.5-turbo', { apiKey: openaiApiKey }),
        'chat-model-reasoning': openai('gpt-4', { apiKey: openaiApiKey }),
        'title-model': openai('gpt-3.5-turbo', { apiKey: openaiApiKey }),
        'artifact-model': openai('gpt-3.5-turbo', { apiKey: openaiApiKey }),
      },
      // imageModels: { ... } // OpenAI image models can be added if needed
    });
