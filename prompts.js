/**
 * Generate interview preparation prompts based on user inputs
 * @param {string} domain - The domain/role for the interview
 * @param {string} experience - Experience level
 * @param {string} promptType - Type of interview (technical or system-design)
 * @returns {string} Generated prompt
 */
export function generateInterviewPrompt(domain, experience, promptType) {
    const expText = experience === 'fresher'
        ? 'a fresher with no prior work experience'
        : `someone with ${experience} of professional experience`;

    if (promptType === 'technical') {
        return `I'm preparing for a technical interview in the ${domain} domain as ${expText}.

Please help me prepare by:

1. Asking me 10 technical questions that are appropriate for my experience level
2. Starting with easier questions and gradually increasing difficulty
3. After I answer each question, provide:
   - Whether my answer is correct
   - A detailed explanation of the correct answer
   - Additional context or related concepts I should know

Let's start with the first question when I'm ready.`;
    } else {
        return `I'm preparing for a system design interview in the ${domain} domain as ${expText}.

Please help me prepare by:

1. Giving me a system design problem appropriate for my experience level
2. Guiding me through the design process step by step
3. Asking clarifying questions as I would encounter in a real interview
4. Providing feedback on my design decisions
5. Suggesting improvements and discussing trade-offs

Please present the system design problem when I'm ready to start.`;
    }
}
