
# Blueprint: "Nihongo Challenge" as a Feature

This document provides a comprehensive guide to understanding and integrating the "Nihongo Challenge" JLPT quiz feature into another Next.js application.

## 1. Feature Overview

The "Nihongo Challenge" is a self-contained feature that allows users to take AI-generated mock exams for the Japanese Language Proficiency Test (JLPT). It consists of three main parts:

1.  **Level Selection UI**: A starting page where users choose their desired JLPT level (N1-N5).
2.  **Quiz UI**: A dynamic, paper-like quiz interface that presents questions fetched from an AI backend.
3.  **Results UI**: A summary screen that shows the user's score and provides AI-powered feedback on their performance, including identifying weak areas.

## 2. Technology Stack

To integrate this feature, the target project should ideally use the same stack:

-   **Framework**: Next.js (with App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: shadcn/ui
-   **AI Backend**: Genkit (using `@genkit-ai/googleai`)
-   **Icons**: `lucide-react`

## 3. Core Files to Copy

To duplicate this feature, you will need to copy the following files and directories from this project into the target project.

### a. UI Components & Pages

-   **/src/app/page.tsx**: The homepage/level selection screen. (Can be adapted or merged).
-   **/src/app/test/page.tsx**: The main page for taking the test.
-   **/src/components/quiz.tsx**: The core component that renders the list of questions.
-   **/src/components/score-summary.tsx**: The component that displays the final score and AI analysis.

### b. AI Backend (Genkit Flows)

-   **/src/ai/genkit.ts**: The Genkit configuration file.
-   **/src/ai/flows/generate-test-questions.ts**: The flow that creates the quiz questions.
-   **/src/ai/flows/analyze-test-results.ts**: The flow that analyzes the user's answers and provides feedback.

### c. Server Actions (The Glue)

-   **/src/app/actions.ts**: This file acts as the bridge, providing type-safe functions that allow the frontend components to securely call the backend Genkit flows.

## 4. Architecture Deep Dive

### a. Data Flow for Generating a Test

1.  **User Interaction**: The user clicks a level button (e.g., "N5") on `page.tsx`.
2.  **Navigation**: The app navigates to `/test?level=N5`.
3.  **Frontend Request**: The `TestPageContent` component in `/test/page.tsx` calls the `getTestQuestions(level)` server action from `actions.ts`.
4.  **Server Action**: The `getTestQuestions` function in `actions.ts` validates the input and calls the `generateTestQuestions` flow from `generate-test-questions.ts`.
5.  **AI Flow**: The Genkit flow communicates with the Gemini model to generate a list of questions based on the prompt and specified output schema.
6.  **Response**: The generated questions are returned through the action to the frontend, where they are rendered by the `Quiz` component.

### b. Data Flow for Analyzing Results

1.  **User Interaction**: The user answers all questions and clicks "Finish & See Results" in the `Quiz` component.
2.  **State Change**: The UI switches to render the `ScoreSummary` component, passing the user's answers as props.
3.  **Frontend Request**: The `ScoreSummary` component calls the `getTestAnalysis(results)` server action from `actions.ts`.
4.  **Server Action**: The `getTestAnalysis` function in `actions.ts` calls the `analyzeTestResults` flow from `analyze-test-results.ts`.
5.  **AI Flow**: The Genkit flow sends the user's results to the Gemini model to get feedback and identify weak areas.
6.  **Response**: The AI analysis is returned to the `ScoreSummary` component and displayed to the user.

## 5. Integration Steps

Here is a high-level guide for merging this feature into an existing Next.js project.

### Step 1: Copy Files

Copy all the files listed in **Section 3** into the corresponding directories of your target project.

### Step 2: Merge `package.json` Dependencies

Add the following dependencies from this project's `package.json` to your target project's `package.json`, then run `npm install`.

```json
"dependencies": {
  "@genkit-ai/googleai": "^1.13.0",
  "genkit": "^1.13.0",
  "lucide-react": "^0.475.0",
  "zod": "^3.24.2"
  // ... plus any missing shadcn/ui dependencies
},
"devDependencies": {
  "genkit-cli": "^1.13.0"
  // ...
}
```

### Step 3: Merge Styling & Fonts

-   **`src/app/globals.css`**: Copy the CSS variables (`:root` and `.dark`) and the base layer styles into your target project's main CSS file.
-   **`tailwind.config.ts`**: Merge the `fontFamily` extensions (`body`, `headline`) and any other theme settings.
-   **`src/app/layout.tsx`**: Ensure the necessary fonts (Poppins, Noto Sans JP) are linked in your root layout.

### Step 4: Configure Environment Variables

If you are using a different Google Cloud project, make sure your environment is configured correctly for Genkit to authenticate with the Google AI services.

### Step 5: Adapt Routing

You may want to place the quiz under a different route (e.g., `/learn/jlpt-quiz`). Adjust the `Link` components in `page.tsx` accordingly and move the `/test` directory if needed.

By following this blueprint, you can effectively lift the "Nihongo Challenge" functionality and embed it as a complete feature within another application.
