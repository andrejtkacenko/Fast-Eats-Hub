'use server';

/**
 * @fileOverview AI-powered food recommendation flow.
 *
 * - getRecommendations - A function that suggests complementary food items or popular combinations based on the current items in the user's cart.
 * - RecommendationsInput - The input type for the getRecommendations function.
 * - RecommendationsOutput - The return type for the getRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendationsInputSchema = z.object({
  cartItems: z
    .array(z.string())
    .describe('An array of items currently in the user\'s cart.'),
});
export type RecommendationsInput = z.infer<typeof RecommendationsInputSchema>;

const RecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of recommended food items.'),
});
export type RecommendationsOutput = z.infer<typeof RecommendationsOutputSchema>;

export async function getRecommendations(input: RecommendationsInput): Promise<RecommendationsOutput> {
  return recommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendationsPrompt',
  input: {schema: RecommendationsInputSchema},
  output: {schema: RecommendationsOutputSchema},
  prompt: `Based on the items in the user's cart, suggest complementary food items or popular combinations.

Cart Items: {{#each cartItems}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Recommendations:`,
});

const recommendationsFlow = ai.defineFlow(
  {
    name: 'recommendationsFlow',
    inputSchema: RecommendationsInputSchema,
    outputSchema: RecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
