'use server';

import { generateTestQuestions, GenerateTestQuestionsInput, GenerateTestQuestionsOutput } from '@/ai/flows/generate-test-questions';
import { analyzeTestResults, AnalyzeTestResultsInput, AnalyzeTestResultsOutput } from '@/ai/flows/analyze-test-results';
import { z } from 'zod';

const LevelEnum = z.enum(['N1', 'N2', 'N3', 'N4', 'N5']);

export async function getTestQuestions(level: string): Promise<{ success: true, data: GenerateTestQuestionsOutput } | { success: false, error: string }> {
  const parsedLevel = LevelEnum.safeParse(level);

  if (!parsedLevel.success) {
    return { success: false, error: 'Invalid level provided.' };
  }

  const input: GenerateTestQuestionsInput = {
    level: parsedLevel.data,
    numberOfQuestions: 10,
  };

  try {
    const result = await generateTestQuestions(input);
    if (!result || !result.questions || result.questions.length === 0) {
      return { success: false, error: 'Failed to generate questions. The AI returned an empty set.' };
    }
    return { success: true, data: result };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'An unexpected error occurred while generating questions.' };
  }
}

export async function getTestAnalysis(input: AnalyzeTestResultsInput): Promise<{ success: true, data: AnalyzeTestResultsOutput } | { success: false, error: string }> {
  try {
    const result = await analyzeTestResults(input);
    return { success: true, data: result };
  } catch(e) {
    console.error(e);
    return { success: false, error: 'An unexpected error occurred while analyzing your results.'}
  }
}
