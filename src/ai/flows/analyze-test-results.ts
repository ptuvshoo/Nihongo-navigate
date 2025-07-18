'use server';

/**
 * @fileOverview An AI agent to analyze JLPT test results.
 *
 * - analyzeTestResults - A function that handles the test result analysis process.
 * - AnalyzeTestResultsInput - The input type for the analyzeTestResults function.
 * - AnalyzeTestResultsOutput - The return type for the analyzeTestResults function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuestionResultSchema = z.object({
    question: z.string(),
    category: z.string(),
    userAnswer: z.string(),
    correctAnswer: z.string(),
    isCorrect: z.boolean(),
});

const AnalyzeTestResultsInputSchema = z.object({
  level: z.string().describe('The JLPT level of the test.'),
  results: z.array(QuestionResultSchema).describe('The list of user\'s answers and question details.'),
});
export type AnalyzeTestResultsInput = z.infer<typeof AnalyzeTestResultsInputSchema>;

const AnalyzeTestResultsOutputSchema = z.object({
  feedback: z.string().describe('Overall feedback for the user.'),
  weakAreas: z.array(z.string()).describe('A list of weak areas (e.g., Vocabulary, Grammar) based on incorrect answers.'),
});
export type AnalyzeTestResultsOutput = z.infer<typeof AnalyzeTestResultsOutputSchema>;

export async function analyzeTestResults(input: AnalyzeTestResultsInput): Promise<AnalyzeTestResultsOutput> {
    return analyzeTestResultsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTestResultsPrompt',
  input: { schema: AnalyzeTestResultsInputSchema },
  output: { schema: AnalyzeTestResultsOutputSchema },
  prompt: `You are a Japanese language teacher analyzing a student's JLPT {{level}} test results.
The user has provided a list of their answers.

Analyze the results to identify the student's weak areas.
Incorrect answers are where 'isCorrect' is false.
Base your analysis on the 'category' of the questions the user got wrong.

Provide brief, encouraging overall feedback.
List the top 2-3 categories where the user made the most mistakes as their "weak areas". If the user got everything correct, the weak areas array should be empty.

Here are the results:
{{#each results}}
---
Question: {{question}}
Category: {{category}}
User's Answer: {{userAnswer}}
Correct Answer: {{correctAnswer}}
Correct: {{isCorrect}}
---
{{/each}}
`,
});


const analyzeTestResultsFlow = ai.defineFlow(
  {
    name: 'analyzeTestResultsFlow',
    inputSchema: AnalyzeTestResultsInputSchema,
    outputSchema: AnalyzeTestResultsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
