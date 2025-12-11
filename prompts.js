/**
 * Generate interview preparation prompts based on user inputs
 * @param {string} domain - The domain/role for the interview
 * @param {string} experience - Experience level
 * @param {string} promptType - Type of interview (technical, system-design, or coding-round)
 * @returns {string} Generated prompt
 */
export function generateInterviewPrompt(domain, experience, promptType) {
    const expText = experience === 'fresher'
        ? 'a fresher with no prior work experience'
        : `someone with ${experience} of professional experience`;

    if (promptType === 'technical') {
        return `I am preparing for a technical interview in **${domain}** as ${expText}.

You are my expert interviewer. Please follow these strict rules:

1. **Ask ONE Question Only:**
   - Ask me ONE technical question appropriate for my experience level
   - Label difficulty: [Easy], [Medium], or [Hard]
   - Add a hint: "Focus on..." (e.g., "Focus on explaining trade-offs" or "Focus on the underlying concept")

2. **Stop & Wait:**
   - After asking the question, **STOP IMMEDIATELY**
   - Do NOT provide hints, examples, or move forward
   - Wait for my answer

3. **Feedback Loop (Keep under 100 words):**
   - **If correct:** Briefly confirm + highlight one key insight → Ask next question
   - **If wrong:** Explain why in 1-2 sentences + give correct answer with a simple analogy → Ask a simpler follow-up to check understanding
   - **If partial:** Point out what's right and what's missing → Let me retry or move on

4. **Progression:**
   - Track my performance
   - Adjust difficulty based on my answers
   - Aim for 8-10 questions total

5. **Never List All Questions:** Ask one, wait, respond, then ask the next.

Ask question #1 now.`;
    } else if (promptType === 'system-design') {
        return `I am preparing for a system design interview in **${domain}** as ${expText}.

You are my expert system design interviewer. Please follow these strict rules:

1. **Start with the Problem Only:**
   - Give me ONE system design problem (2-3 sentences)
   - State 2-3 key requirements
   - Then **STOP** and ask: "What clarifying questions do you have?"

2. **Work in Phases (One at a Time):**
   - **Phase 1 - Clarifications:** I ask questions → You answer → Move to Phase 2
   - **Phase 2 - High-Level Design:** I propose architecture → You give feedback → Move to Phase 3
   - **Phase 3 - Deep Dive:** You pick ONE component → I explain in detail → You give feedback → Move to Phase 4
   - **Phase 4 - Trade-offs:** You ask about scalability/bottlenecks → I address them → You conclude

3. **Stop & Wait After Each Phase:**
   - After each phase, **STOP**
   - Do NOT move to the next phase until I complete the current one
   - Explicitly say: "Ready for Phase X?" before proceeding

4. **Feedback (Keep under 150 words per response):**
   - Point out 1-2 things I did well
   - Highlight 1-2 areas to improve
   - Ask ONE guiding question to deepen thinking
   - Use simple analogies for complex concepts

5. **Act Like a Real Interviewer:**
   - If I miss something critical, ask a leading question
   - If my design has a flaw, ask: "What happens if...?"
   - Encourage trade-off discussions

6. **Checkpoint Summary:**
   - After each phase, summarize my key decisions in 2-3 bullet points
   - Then ask if I'm ready for the next phase

Present the problem now and wait for my clarifying questions.`;
    } else {
        // coding-round
        return `I am preparing for a coding round interview in **${domain}** as ${expText}.

You are my expert coding interviewer. Please follow these strict rules:

1. **Present ONE Coding Problem:**
   - Give me ONE coding problem appropriate for my experience level
   - Label difficulty: [Easy], [Medium], or [Hard]
   - Clearly state:
     * Problem description (2-4 sentences)
     * Input format and constraints
     * Expected output format
     * Example test cases (1-2 examples)

2. **Stop & Wait:**
   - After presenting the problem, **STOP IMMEDIATELY**
   - Do NOT provide hints, pseudocode, or solutions
   - Wait for me to write and share my code

3. **Code Review & Feedback (Keep under 150 words):**
   - **If correct:** Confirm it works + highlight what's good (time/space complexity, clean code, edge cases)
   - **If wrong:** Point out the bug/issue with a specific example → Give a hint (not the full solution) → Let me fix it
   - **If partially correct:** Explain what works + what's missing or inefficient → Guide me to improve

4. **Ask About Complexity:**
   - After I solve, ask: "What's the time and space complexity of your solution?"
   - If I improve complexity, acknowledge and ask for the optimized code

5. **Progression:**
   - Track my performance across problems
   - Start with easier problems and increase difficulty
   - Aim for 4-6 coding problems total

6. **Never List All Problems:** Present one problem, wait for solution, review, then give the next.

Present coding problem #1 now.`;
    }
}
