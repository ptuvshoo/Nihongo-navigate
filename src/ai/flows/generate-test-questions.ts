'use server';

/**
 * @fileOverview A JLPT exam question generator AI agent.
 *
 * - generateTestQuestions - A function that handles the test question generation process.
 * - GenerateTestQuestionsInput - The input type for the generateTestQuestions function.
 * - GenerateTestQuestionsOutput - The return type for the generateTestQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTestQuestionsInputSchema = z.object({
  level: z.enum(['N1', 'N2', 'N3', 'N4', 'N5']).describe('The JLPT level of the test.'),
  numberOfQuestions: z.number().default(10).describe('The number of questions to generate.'),
});
export type GenerateTestQuestionsInput = z.infer<typeof GenerateTestQuestionsInputSchema>;

const GenerateTestQuestionsOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe('The test question.'),
      options: z.array(z.string()).describe('The possible answers to the question.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
    })
  ).describe('A list of questions for the JLPT exam.'),
});
export type GenerateTestQuestionsOutput = z.infer<typeof GenerateTestQuestionsOutputSchema>;

export async function generateTestQuestions(input: GenerateTestQuestionsInput): Promise<GenerateTestQuestionsOutput> {
  return generateTestQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTestQuestionsPrompt',
  input: {schema: GenerateTestQuestionsInputSchema},
  output: {schema: GenerateTestQuestionsOutputSchema},
  prompt: `You are an expert in creating Japanese Language Proficiency Test (JLPT) questions.

You will generate {{numberOfQuestions}} multiple-choice questions for the JLPT level {{level}}.
Each question should have four answer options, and you should clearly indicate the correct answer.
The output should be a JSON object with a 'questions' array. Each element of the array should have question, options and correctAnswer. The options should be an array of strings.`, 
});

const generateTestQuestionsFlow = ai.defineFlow(
  {
    name: 'generateTestQuestionsFlow',
    inputSchema: GenerateTestQuestionsInputSchema,
    outputSchema: GenerateTestQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
