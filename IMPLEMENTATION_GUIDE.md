# Implementation Guide: Interview Prep with AI

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Technology Stack](#technology-stack)
4. [Milestone 1: Basic HTML Structure](#milestone-1-basic-html-structure)
5. [Milestone 2: React Setup with ESM](#milestone-2-react-setup-with-esm)
6. [Milestone 3: Form Components](#milestone-3-form-components)
7. [Milestone 4: Prompt Generation Module](#milestone-4-prompt-generation-module)
8. [Milestone 5: Result Display & Copy Feature](#milestone-5-result-display--copy-feature)
9. [Milestone 6: AI Tool Links](#milestone-6-ai-tool-links)
10. [Milestone 7: Dark Mode](#milestone-7-dark-mode)
11. [Milestone 8: Share Feature with URL Parameters](#milestone-8-share-feature-with-url-parameters)
12. [Milestone 9: All Interview Types](#milestone-9-all-interview-types)
13. [Milestone 10: Polish & Responsive Design](#milestone-10-polish--responsive-design)
14. [Extension Ideas](#extension-ideas)
15. [Deployment](#deployment)

---

## Project Overview

**What we're building:** A static web application that generates customized AI interview preparation prompts based on user input (domain, experience level, and interview type).

**Why this project matters:**
- Teaches modern web development without build tools
- Demonstrates modular JavaScript architecture
- Shows how to use React via CDN (no npm/webpack needed)
- Implements practical features: dark mode, sharing, local storage
- Creates a genuinely useful tool for interview prep

**Final product features:**
- 3 interview types: Technical, System Design, Coding Round
- Dark mode with persistent preference
- Shareable URLs with pre-filled settings
- Copy-to-clipboard functionality
- Links to popular AI tools
- Fully responsive design
- Zero-build deployment to GitHub Pages

---

## Prerequisites

**Knowledge required:**
- Basic HTML/CSS
- JavaScript fundamentals (variables, functions, conditionals)
- DOM manipulation basics
- Understanding of ES6 modules (import/export)
- Basic Git commands

**Tools needed:**
- Text editor (VS Code, Sublime, etc.)
- Modern web browser (Chrome, Firefox, Safari)
- Git installed
- GitHub account (for deployment)
- Local web server (optional but recommended)

**Recommended local server setup:**
```bash
# Option 1: Python 3
python3 -m http.server 8000

# Option 2: Node.js http-server
npx http-server -p 8000

# Option 3: VS Code Live Server extension
# Just right-click index.html -> "Open with Live Server"
```

---

## Technology Stack

**Why these choices?**

1. **React via esm.sh** - No build step needed, modern React features
2. **React.createElement** - Direct API, no JSX compilation required
3. **Lucide Icons** - Beautiful, tree-shakeable icon library
4. **CSS Variables** - Easy theming without preprocessors
5. **ES6 Modules** - Native browser support, clean code organization
6. **GitHub Pages** - Free hosting for static sites

---

## Milestone 1: Basic HTML Structure

**Goal:** Create a minimal HTML page with gradient background and a centered card.

### Step 1.1: Create `index.html`

Create a new file called `index.html` and add this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interview Prep with AI</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            color: #333;
        }

        .container {
            max-width: 700px;
            margin: 0 auto;
            padding: 40px 0;
        }

        .card {
            background: white;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 8px;
            color: #1a1a1a;
        }

        .subtitle {
            color: #666;
            margin-bottom: 32px;
            font-size: 0.95rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Interview Prep with AI</h1>
            <p class="subtitle">Generate customized prompts for your interview preparation</p>
            <p>Content coming soon...</p>
        </div>
    </div>
</body>
</html>
```

### Step 1.2: Verify

**Open `index.html` in your browser.**

**Expected result:**
- Purple gradient background (top-left to bottom-right)
- White card centered on the page
- "Interview Prep with AI" heading
- Subtitle text
- "Content coming soon..." placeholder

**Troubleshooting:**
- If styles don't apply: Check that `<style>` tag is in `<head>`
- If card isn't centered: Check `.container` has `margin: 0 auto`
- If gradient looks wrong: Check browser supports linear-gradient (all modern browsers do)

**Why this matters:** This establishes the visual foundation. The card pattern is common in modern web design and provides a clean, focused interface.

---

## Milestone 2: React Setup with ESM

**Goal:** Get React running without any build tools using ES modules.

### Step 2.1: Add Import Map

Add this **before** the closing `</head>` tag:

```html
<script type="importmap">
{
    "imports": {
        "react": "https://esm.sh/react@19.2.0",
        "react-dom/client": "https://esm.sh/react-dom@19.2.0/client",
        "lucide-react": "https://esm.sh/lucide-react@0.554.0"
    }
}
</script>
```

**What this does:** Import maps let you use bare module specifiers (like `"react"`) instead of full URLs. The browser will fetch these from esm.sh, a CDN that serves ES modules.

### Step 2.2: Add React Root Element

Replace the card content with a root div. Change the `<body>` to:

```html
<body>
    <div id="root"></div>
</body>
```

### Step 2.3: Create React App Script

Add this **before** the closing `</body>` tag:

```html
<script type="module">
    import React from 'react';
    import { createRoot } from 'react-dom/client';

    const { createElement: h } = React;

    function App() {
        return h('div', { className: 'container' },
            h('div', { className: 'card' },
                h('h1', null, 'Interview Prep with AI'),
                h('p', { className: 'subtitle' },
                    'Generate customized prompts for your interview preparation'
                ),
                h('p', null, 'React is working! 🎉')
            )
        );
    }

    // Initialize app
    function initApp() {
        const rootElement = document.getElementById('root');
        if (rootElement) {
            const root = createRoot(rootElement);
            root.render(React.createElement(App));
        } else {
            console.error('Root element not found');
        }
    }

    // Ensure DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
</script>
```

### Step 2.4: Verify

**Refresh your browser.**

**Expected result:**
- Same visual appearance as before
- Text now says "React is working! 🎉"
- **Open browser console** - No errors
- In React DevTools (if installed): Should show `<App>` component

**Troubleshooting:**
- **Blank page:** Open console, check for errors
  - "Failed to fetch" → Internet connection issue or esm.sh is down
  - "Unexpected token '<'" → Check `type="module"` is on the script tag
- **Old content showing:** Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
- **Module not found:** Verify import map syntax (watch for missing commas)

### Understanding React.createElement

**Why `h('div', {}, 'text')` instead of `<div>text</div>`?**

JSX like `<div>text</div>` needs a build step (Babel) to convert to JavaScript. Using `React.createElement` directly (aliased as `h` for brevity) works in the browser immediately:

```javascript
// JSX (needs build step)
<div className="card">Hello</div>

// Equivalent React.createElement (works directly)
h('div', { className: 'card' }, 'Hello')

// Syntax: h(type, props, ...children)
```

**Why this matters:** This is foundational. Everything we build uses this pattern. Understanding `createElement` helps you debug React issues.

---

## Milestone 3: Form Components

**Goal:** Add interactive form fields with React state management.

### Step 3.1: Add Form Styles

Add these styles inside your `<style>` tag (after the existing styles):

```css
.form-group {
    margin-bottom: 24px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #444;
    font-size: 0.9rem;
}

input, select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    background: #ffffff;
    color: #1a1a1a;
}

input:focus, select:focus {
    outline: none;
    border-color: #667eea;
}

.btn {
    padding: 14px 28px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    width: 100%;
    justify-content: center;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn:disabled:hover {
    transform: none;
    box-shadow: none;
}
```

### Step 3.2: Add React State

Import `useState` at the top of your script:

```javascript
import React, { useState } from 'react';
```

### Step 3.3: Update App Component

Replace your `App` function with this:

```javascript
function App() {
    const [domain, setDomain] = useState('');
    const [experience, setExperience] = useState('fresher');
    const [promptType, setPromptType] = useState('technical');

    const handleSubmit = () => {
        console.log('Form submitted:', { domain, experience, promptType });
        alert(`Domain: ${domain}\nExperience: ${experience}\nType: ${promptType}`);
    };

    return h('div', { className: 'container' },
        h('div', { className: 'card' },
            h('h1', null, 'Interview Prep with AI'),
            h('p', { className: 'subtitle' },
                'Generate customized prompts for your interview preparation'
            ),

            // Domain input
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'domain' }, 'Domain / Role'),
                h('input', {
                    id: 'domain',
                    type: 'text',
                    placeholder: 'e.g., Frontend Development, Data Science, Backend Engineering',
                    value: domain,
                    onInput: (e) => setDomain(e.target.value)
                })
            ),

            // Experience select
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'experience' }, 'Experience Level'),
                h('select', {
                    id: 'experience',
                    value: experience,
                    onChange: (e) => setExperience(e.target.value)
                },
                    h('option', { value: 'fresher' }, 'Fresher (0 years)'),
                    h('option', { value: '1-2 years' }, '1-2 years'),
                    h('option', { value: '3-5 years' }, '3-5 years'),
                    h('option', { value: '5+ years' }, '5+ years'),
                    h('option', { value: '10+ years' }, '10+ years')
                )
            ),

            // Prompt type select
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'promptType' }, 'Interview Type'),
                h('select', {
                    id: 'promptType',
                    value: promptType,
                    onChange: (e) => setPromptType(e.target.value)
                },
                    h('option', { value: 'technical' }, 'Technical Interview'),
                    h('option', { value: 'system-design' }, 'System Design'),
                    h('option', { value: 'coding-round' }, 'Coding Round')
                )
            ),

            // Submit button
            h('button', {
                className: 'btn btn-primary',
                onClick: handleSubmit,
                disabled: !domain.trim()
            }, 'Generate Prompt')
        )
    );
}
```

### Step 3.4: Verify

**Refresh your browser.**

**Test checklist:**
1. ✅ Type in domain field → text appears
2. ✅ Button is disabled when domain is empty
3. ✅ Button becomes enabled when you type something
4. ✅ Change experience dropdown → selection updates
5. ✅ Change interview type dropdown → selection updates
6. ✅ Click "Generate Prompt" → alert shows your selections
7. ✅ Check console → should log form data

**Advanced verification (React DevTools):**
- Install React DevTools browser extension
- Open DevTools → "Components" tab
- Click on `<App>` component
- In right panel, see hooks: `State` with `domain`, `experience`, `promptType`
- Type in form → watch state update in real-time

**Troubleshooting:**
- **Button always disabled:** Check `!domain.trim()` logic
- **Dropdown not updating:** Make sure you're using `onChange` not `onInput`
- **Values not clearing:** This is expected - we haven't added a reset feature yet

**Why this matters:** This demonstrates React's core concept: state drives UI. When state changes, React re-renders. The `useState` hook makes this simple.

---

## Milestone 4: Prompt Generation Module

**Goal:** Separate business logic from UI by creating a dedicated prompt generation module.

### Step 4.1: Create `prompts.js`

Create a new file called `prompts.js` in the same directory as `index.html`:

```javascript
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
   - Add a hint: "Focus on..." (e.g., "Focus on explaining trade-offs")

2. **Stop & Wait:**
   - After asking the question, **STOP IMMEDIATELY**
   - Do NOT provide hints, examples, or move forward
   - Wait for my answer

3. **Feedback Loop (Keep under 100 words):**
   - **If correct:** Briefly confirm + highlight one key insight → Ask next question
   - **If wrong:** Explain why in 1-2 sentences + give correct answer with a simple analogy
   - **If partial:** Point out what's right and what's missing

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
   - **Phase 3 - Deep Dive:** You pick ONE component → I explain in detail → You give feedback
   - **Phase 4 - Trade-offs:** You ask about scalability/bottlenecks → I address them

3. **Stop & Wait After Each Phase:**
   - After each phase, **STOP**
   - Explicitly say: "Ready for Phase X?" before proceeding

4. **Feedback (Keep under 150 words per response):**
   - Point out 1-2 things I did well
   - Highlight 1-2 areas to improve
   - Ask ONE guiding question to deepen thinking

5. **Checkpoint Summary:**
   - After each phase, summarize my key decisions in 2-3 bullet points

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
   - Wait for me to write and share my code

3. **Code Review & Feedback (Keep under 150 words):**
   - **If correct:** Confirm it works + highlight what's good
   - **If wrong:** Point out the bug with a specific example → Give a hint
   - **If partially correct:** Explain what works + what's missing

4. **Ask About Complexity:**
   - After I solve, ask: "What's the time and space complexity?"

5. **Progression:**
   - Start with easier problems and increase difficulty
   - Aim for 4-6 coding problems total

6. **Never List All Problems:** Present one, wait for solution, review, then give next.

Present coding problem #1 now.`;
    }
}
```

### Step 4.2: Import the Module

In `index.html`, add this import at the top of your module script (after the React imports):

```javascript
import { generateInterviewPrompt } from './prompts.js';
```

### Step 4.3: Use the Prompt Generator

Replace the `handleSubmit` function with:

```javascript
const handleSubmit = () => {
    const prompt = generateInterviewPrompt(domain, experience, promptType);
    console.log('Generated prompt:', prompt);
    alert(prompt);
};
```

### Step 4.4: Verify

**Refresh your browser.**

**Test all interview types:**

1. **Technical Interview Test:**
   - Domain: "Frontend Development"
   - Experience: "3-5 years"
   - Type: "Technical Interview"
   - Click "Generate Prompt"
   - ✅ Alert shows prompt with "Ask ONE Question Only" rules
   - ✅ Mentions "Frontend Development" and "3-5 years"

2. **System Design Test:**
   - Domain: "Backend Engineering"
   - Experience: "5+ years"
   - Type: "System Design"
   - Click "Generate Prompt"
   - ✅ Alert shows prompt with "Work in Phases" rules
   - ✅ Mentions "Backend Engineering" and "5+ years"

3. **Coding Round Test:**
   - Domain: "Data Structures"
   - Experience: "Fresher"
   - Type: "Coding Round"
   - Click "Generate Prompt"
   - ✅ Alert shows prompt with "Present ONE Coding Problem" rules
   - ✅ Says "fresher with no prior work experience"

**Console verification:**
- Open console
- Submit form
- See full prompt logged

**Troubleshooting:**
- **"Failed to resolve module specifier":**
  - Make sure `prompts.js` is in the same directory as `index.html`
  - Must use a local server (file:// won't work with ES modules)
  - Check import path is `./prompts.js` (with `./`)
- **Prompt doesn't customize:**
  - Check template string uses `${domain}` not `{domain}`
  - Verify variables are in scope
- **Wrong experience text:**
  - Check the ternary operator logic in `expText`

**Why this matters:** Separation of concerns. The UI (React components) is separate from business logic (prompt generation). This makes code easier to test, maintain, and extend.

---

## Milestone 5: Result Display & Copy Feature

**Goal:** Show generated prompt in a nice box with copy-to-clipboard functionality.

### Step 5.1: Add Result Styles

Add to your `<style>` tag:

```css
.result-section {
    margin-top: 32px;
    padding-top: 32px;
    border-top: 2px solid #f0f0f0;
}

.prompt-box {
    background: #f9f9f9;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 16px;
    white-space: pre-wrap;
    line-height: 1.6;
    font-size: 0.95rem;
    color: #1a1a1a;
    max-height: 400px;
    overflow-y: auto;
}

.btn-secondary {
    background: #f5f5f5;
    color: #333;
    border: 2px solid #e0e0e0;
}

.btn-secondary:hover {
    background: #ebebeb;
}

.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #1a1a1a;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 8px;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
```

### Step 5.2: Add Icons Import

Update your import map to ensure Lucide icons are available, then import the icons:

```javascript
import { Sparkles, Copy, Check } from 'lucide-react';
```

### Step 5.3: Add State for Generated Prompt

Add new state variables in your `App` component:

```javascript
function App() {
    const [domain, setDomain] = useState('');
    const [experience, setExperience] = useState('fresher');
    const [promptType, setPromptType] = useState('technical');
    const [generatedPrompt, setGeneratedPrompt] = useState(''); // NEW
    const [copied, setCopied] = useState(false); // NEW

    // ... rest of code
}
```

### Step 5.4: Update Submit Handler

Replace `handleSubmit` with:

```javascript
const handleGeneratePrompt = () => {
    const prompt = generateInterviewPrompt(domain, experience, promptType);
    setGeneratedPrompt(prompt);
};

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(generatedPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    }
};
```

### Step 5.5: Update Generate Button

Replace the button with:

```javascript
h('button', {
    className: 'btn btn-primary',
    onClick: handleGeneratePrompt,
    disabled: !domain.trim()
},
    h(Sparkles, { size: 20 }),
    'Generate Prompt'
)
```

### Step 5.6: Add Result Display

After the generate button, add this conditional render:

```javascript
// After the button, before closing card div
generatedPrompt && h('div', { className: 'result-section' },
    h('div', { className: 'prompt-box' }, generatedPrompt),

    h('button', {
        className: 'btn btn-secondary',
        onClick: copyToClipboard
    },
        h(copied ? Check : Copy, { size: 18 }),
        copied ? 'Copied!' : 'Copy to Clipboard'
    )
),

// After the card div
copied && h('div', { className: 'toast' },
    h(Check, { size: 18 }),
    'Copied to clipboard!'
)
```

### Step 5.7: Complete App Component Structure

Your full App component should now look like this:

```javascript
function App() {
    const [domain, setDomain] = useState('');
    const [experience, setExperience] = useState('fresher');
    const [promptType, setPromptType] = useState('technical');
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGeneratePrompt = () => {
        const prompt = generateInterviewPrompt(domain, experience, promptType);
        setGeneratedPrompt(prompt);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generatedPrompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard');
        }
    };

    return h('div', { className: 'container' },
        h('div', { className: 'card' },
            h('h1', null, 'Interview Prep with AI'),
            h('p', { className: 'subtitle' },
                'Generate customized prompts for your interview preparation'
            ),

            // Domain input
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'domain' }, 'Domain / Role'),
                h('input', {
                    id: 'domain',
                    type: 'text',
                    placeholder: 'e.g., Frontend Development, Data Science',
                    value: domain,
                    onInput: (e) => setDomain(e.target.value)
                })
            ),

            // Experience select
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'experience' }, 'Experience Level'),
                h('select', {
                    id: 'experience',
                    value: experience,
                    onChange: (e) => setExperience(e.target.value)
                },
                    h('option', { value: 'fresher' }, 'Fresher (0 years)'),
                    h('option', { value: '1-2 years' }, '1-2 years'),
                    h('option', { value: '3-5 years' }, '3-5 years'),
                    h('option', { value: '5+ years' }, '5+ years'),
                    h('option', { value: '10+ years' }, '10+ years')
                )
            ),

            // Prompt type select
            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'promptType' }, 'Interview Type'),
                h('select', {
                    id: 'promptType',
                    value: promptType,
                    onChange: (e) => setPromptType(e.target.value)
                },
                    h('option', { value: 'technical' }, 'Technical Interview'),
                    h('option', { value: 'system-design' }, 'System Design'),
                    h('option', { value: 'coding-round' }, 'Coding Round')
                )
            ),

            // Generate button
            h('button', {
                className: 'btn btn-primary',
                onClick: handleGeneratePrompt,
                disabled: !domain.trim()
            },
                h(Sparkles, { size: 20 }),
                'Generate Prompt'
            ),

            // Result section (only shown when prompt is generated)
            generatedPrompt && h('div', { className: 'result-section' },
                h('div', { className: 'prompt-box' }, generatedPrompt),

                h('button', {
                    className: 'btn btn-secondary',
                    onClick: copyToClipboard
                },
                    h(copied ? Check : Copy, { size: 18 }),
                    copied ? 'Copied!' : 'Copy to Clipboard'
                )
            )
        ),

        // Toast notification (only shown when copied)
        copied && h('div', { className: 'toast' },
            h(Check, { size: 18 }),
            'Copied to clipboard!'
        )
    );
}
```

### Step 5.8: Verify

**Refresh your browser.**

**Complete test workflow:**

1. **Initial state:**
   - ✅ No result box visible
   - ✅ No toast notification

2. **Generate prompt:**
   - Fill domain: "React Development"
   - Select experience: "3-5 years"
   - Select type: "Technical Interview"
   - Click "Generate Prompt"
   - ✅ Result box appears below with full prompt
   - ✅ Prompt mentions "React Development" and "3-5 years"
   - ✅ "Copy to Clipboard" button appears

3. **Copy functionality:**
   - Click "Copy to Clipboard"
   - ✅ Button text changes to "Copied!"
   - ✅ Toast notification slides in from right
   - ✅ Wait 2 seconds → toast disappears
   - ✅ Button text changes back to "Copy to Clipboard"
   - ✅ Paste somewhere (Cmd+V / Ctrl+V) → full prompt appears

4. **Icon verification:**
   - Before copy: Copy icon shows
   - After copy: Checkmark icon shows
   - ✅ Icons render correctly (not placeholder text)

5. **Scrolling (long prompts):**
   - ✅ Prompt box has scrollbar if content > 400px
   - ✅ Can scroll within prompt box

6. **Regenerate:**
   - Change domain to "Python Backend"
   - Click "Generate Prompt" again
   - ✅ Prompt updates immediately
   - ✅ Old prompt is replaced, not appended

**Troubleshooting:**
- **Icons show as `[object Object]`:**
  - Check Lucide import is correct
  - Verify you're using `h(Copy, { size: 18 })` not `h('Copy', ...)`
- **Copy fails:**
  - Browser might block clipboard access on file://
  - Use local server (http://localhost:8000)
  - Check browser console for permission errors
- **Toast doesn't disappear:**
  - Check setTimeout is working
  - Verify `setCopied(false)` is called
- **Prompt box too small:**
  - Check `white-space: pre-wrap` is applied
  - Verify `max-height: 400px` and `overflow-y: auto`

**Why this matters:** This milestone demonstrates React's conditional rendering (`&&` operator), async operations (clipboard API), and state-driven UI updates. The copy feature uses modern browser APIs.

---

## Milestone 6: AI Tool Links

**Goal:** Add quick links to popular AI chat tools.

### Step 6.1: Add AI Links Styles

```css
.ai-links {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e0e0e0;
}

.ai-links-title {
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 12px;
}

.button-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.ai-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    text-decoration: none;
    color: #333;
    font-size: 0.9rem;
    transition: all 0.2s;
}

.ai-link:hover {
    border-color: #667eea;
    background: #f9f9ff;
}
```

### Step 6.2: Import ExternalLink Icon

Update your imports:

```javascript
import { Sparkles, Copy, Check, ExternalLink } from 'lucide-react';
```

### Step 6.3: Add AI Tools Data

In your `App` component, add this array (after state declarations):

```javascript
const aiTools = [
    { name: 'ChatGPT', url: 'https://chat.openai.com' },
    { name: 'Claude', url: 'https://claude.ai' },
    { name: 'Gemini', url: 'https://gemini.google.com' },
    { name: 'Perplexity', url: 'https://www.perplexity.ai' }
];
```

### Step 6.4: Add AI Links Section

In the result section, after the copy button, add:

```javascript
generatedPrompt && h('div', { className: 'result-section' },
    h('div', { className: 'prompt-box' }, generatedPrompt),

    h('button', {
        className: 'btn btn-secondary',
        onClick: copyToClipboard
    },
        h(copied ? Check : Copy, { size: 18 }),
        copied ? 'Copied!' : 'Copy to Clipboard'
    ),

    // NEW: AI tool links
    h('div', { className: 'ai-links' },
        h('div', { className: 'ai-links-title' },
            'Open in your favorite AI tool:'
        ),
        h('div', { className: 'button-group' },
            ...aiTools.map(tool =>
                h('a', {
                    key: tool.name,
                    href: tool.url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'ai-link'
                },
                    tool.name,
                    h(ExternalLink, { size: 14 })
                )
            )
        )
    )
)
```

### Step 6.5: Verify

**Refresh your browser.**

**Test workflow:**

1. **Generate a prompt** (any domain/experience/type)

2. **Verify AI links appear:**
   - ✅ Section appears below copy button
   - ✅ Title: "Open in your favorite AI tool:"
   - ✅ 4 links: ChatGPT, Claude, Gemini, Perplexity
   - ✅ Each has external link icon
   - ✅ Links are styled with borders

3. **Test link behavior:**
   - Hover over each link
   - ✅ Border turns purple (#667eea)
   - ✅ Background becomes light purple
   - ✅ Cursor changes to pointer

4. **Test clicking links:**
   - Click "ChatGPT"
   - ✅ Opens chat.openai.com in **new tab**
   - ✅ Original page stays open
   - Test all 4 links to verify URLs

5. **Security check:**
   - Right-click any link → Inspect
   - ✅ Verify `rel="noopener noreferrer"` is present
   - (This prevents security vulnerabilities with `target="_blank"`)

6. **Mobile-friendly test:**
   - Resize browser to narrow width (< 400px)
   - ✅ Links wrap to multiple rows (flex-wrap: wrap)
   - ✅ Gap maintained between links

**Troubleshooting:**
- **Links don't appear:**
  - Check the `generatedPrompt &&` condition
  - Verify you generated a prompt first
- **Links open in same tab:**
  - Check `target: '_blank'` is in props
- **Icons missing:**
  - Verify `ExternalLink` is imported
  - Check icon component rendering: `h(ExternalLink, { size: 14 })`
- **Map error:**
  - Note the spread operator: `...aiTools.map()`
  - This spreads array elements as children

**Why this matters:** This demonstrates array mapping in React.createElement, security best practices (`noopener noreferrer`), and responsive design with flexbox.

---

## Milestone 7: Dark Mode

**Goal:** Implement dark mode with CSS variables and persistent localStorage preference.

### Step 7.1: Add CSS Variables

Replace your existing styles with this theme-aware version. At the top of your `<style>` tag:

```css
:root {
    --bg-gradient-start: #667eea;
    --bg-gradient-end: #764ba2;
    --card-bg: #ffffff;
    --text-primary: #1a1a1a;
    --text-secondary: #666;
    --text-tertiary: #444;
    --border-color: #e0e0e0;
    --input-bg: #ffffff;
    --btn-secondary-bg: #f5f5f5;
    --btn-secondary-hover: #ebebeb;
    --prompt-box-bg: #f9f9f9;
    --shadow-color: rgba(0, 0, 0, 0.3);
    --ai-link-hover-bg: #f9f9ff;
}

[data-theme="dark"] {
    --bg-gradient-start: #1a1a2e;
    --bg-gradient-end: #16213e;
    --card-bg: #0f3460;
    --text-primary: #e8e8e8;
    --text-secondary: #b0b0b0;
    --text-tertiary: #d0d0d0;
    --border-color: #2a4a6a;
    --input-bg: #1a3a5a;
    --btn-secondary-bg: #1a3a5a;
    --btn-secondary-hover: #2a4a6a;
    --prompt-box-bg: #1a3a5a;
    --shadow-color: rgba(0, 0, 0, 0.6);
    --ai-link-hover-bg: #2a4a6a;
}
```

### Step 7.2: Update Existing Styles to Use Variables

Replace all hard-coded colors with variables:

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
    min-height: 100vh;
    padding: 20px;
    color: var(--text-primary);
    transition: background 0.3s ease;
}

.card {
    background: var(--card-bg);
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 20px 60px var(--shadow-color);
    transition: background 0.3s ease;
    position: relative;
}

h1 {
    font-size: 2rem;
    margin-bottom: 8px;
    color: var(--text-primary);
}

.subtitle {
    color: var(--text-secondary);
    margin-bottom: 32px;
    font-size: 0.95rem;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-tertiary);
    font-size: 0.9rem;
}

input, select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    background: var(--input-bg);
    color: var(--text-primary);
}

.btn-secondary {
    background: var(--btn-secondary-bg);
    color: var(--text-primary);
    border: 2px solid var(--border-color);
}

.btn-secondary:hover {
    background: var(--btn-secondary-hover);
}

.result-section {
    margin-top: 32px;
    padding-top: 32px;
    border-top: 2px solid var(--border-color);
}

.prompt-box {
    background: var(--prompt-box-bg);
    border: 2px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 16px;
    white-space: pre-wrap;
    line-height: 1.6;
    font-size: 0.95rem;
    color: var(--text-primary);
    max-height: 400px;
    overflow-y: auto;
}

.ai-links {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--border-color);
}

.ai-links-title {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 12px;
}

.ai-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: var(--card-bg);
    border: 2px solid var(--border-color);
    border-radius: 6px;
    text-decoration: none;
    color: var(--text-primary);
    font-size: 0.9rem;
    transition: all 0.2s;
}

.ai-link:hover {
    border-color: #667eea;
    background: var(--ai-link-hover-bg);
}
```

### Step 7.3: Add Theme Toggle Styles

```css
.theme-toggle {
    position: absolute;
    top: 20px;
    right: 20px;
    background: var(--btn-secondary-bg);
    border: 2px solid var(--border-color);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.theme-toggle:hover {
    background: var(--btn-secondary-hover);
    transform: rotate(180deg);
}
```

### Step 7.4: Import Theme Icons

```javascript
import { Sparkles, Copy, Check, ExternalLink, Moon, Sun } from 'lucide-react';
```

### Step 7.5: Add Dark Mode State & Logic

Update imports to include `useEffect`:

```javascript
import React, { useState, useEffect } from 'react';
```

Add dark mode state in `App`:

```javascript
const [darkMode, setDarkMode] = useState(false);
```

Add theme initialization and toggle function:

```javascript
// Initialize from localStorage on mount
useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setDarkMode(true);
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}, []);

// Toggle dark mode
const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
};
```

### Step 7.6: Add Theme Toggle Button

Add this as the first child of the card (before the h1):

```javascript
h('button', {
    className: 'theme-toggle',
    onClick: toggleDarkMode,
    'aria-label': 'Toggle dark mode'
},
    h(darkMode ? Sun : Moon, { size: 20 })
)
```

### Step 7.7: Verify

**Refresh your browser.**

**Complete dark mode test:**

1. **Initial state (light mode):**
   - ✅ Purple gradient background
   - ✅ White card
   - ✅ Dark text
   - ✅ Moon icon in top-right corner

2. **Toggle to dark mode:**
   - Click moon icon
   - ✅ Background becomes dark blue gradient
   - ✅ Card becomes dark blue (#0f3460)
   - ✅ Text becomes light gray
   - ✅ Icon changes to Sun
   - ✅ Smooth transition (0.3s)
   - ✅ Button rotates 180°

3. **Verify all elements:**
   - ✅ Input fields: dark background, light text
   - ✅ Dropdowns: dark background, light text
   - ✅ Generate button: still has gradient (unchanged)
   - ✅ Generated prompt box: dark background
   - ✅ Copy button: dark background
   - ✅ AI links: dark background, light text

4. **Persistence test:**
   - With dark mode ON, refresh page
   - ✅ Dark mode persists (doesn't reset to light)
   - Open browser console
   - Type: `localStorage.getItem('theme')`
   - ✅ Returns "dark"

5. **Toggle back to light:**
   - Click sun icon
   - ✅ Returns to light theme
   - ✅ Icon changes back to moon
   - Refresh page
   - ✅ Light mode persists

6. **Icon hover effect:**
   - Hover over toggle button
   - ✅ Background darkens slightly
   - ✅ Rotates 180°

**Advanced verification:**

1. **Check HTML attribute:**
   - Dark mode ON: Inspect `<html>` tag
   - ✅ Has `data-theme="dark"` attribute
   - Light mode:
   - ✅ No `data-theme` attribute

2. **CSS variable inspection:**
   - Open DevTools → Elements
   - Select `<html>` tag
   - Go to "Computed" tab
   - Search for `--card-bg`
   - Light mode: ✅ `#ffffff`
   - Dark mode: ✅ `#0f3460`

**Troubleshooting:**
- **Dark mode doesn't apply:**
  - Check `data-theme="dark"` is on `<html>` element
  - Verify CSS variables are in `:root` and `[data-theme="dark"]`
  - Check you're using `var(--variable-name)` everywhere
- **Theme doesn't persist:**
  - Check localStorage is working: `localStorage.setItem('test', 'value')`
  - Verify browser allows localStorage (incognito mode blocks it)
  - Check `useEffect` runs: add `console.log` inside
- **Transition too fast/slow:**
  - Adjust `transition: background 0.3s ease` in body and card
- **Some elements don't change color:**
  - Find the hardcoded color and replace with `var(--variable)`

**Why this matters:** This demonstrates CSS custom properties (variables), `useEffect` hook for side effects, localStorage API, and the HTML5 `data-*` attributes. It's a professional-grade theming implementation.

---

## Milestone 8: Share Feature with URL Parameters

**Goal:** Generate shareable URLs that pre-fill form fields.

### Step 8.1: Add Share Button Styles

```css
.btn-share {
    background: var(--btn-secondary-bg);
    color: var(--text-primary);
    border: 2px solid var(--border-color);
    margin-left: 12px;
}

.btn-share:hover {
    background: var(--btn-secondary-hover);
}
```

### Step 8.2: Import Share Icon

```javascript
import { Sparkles, Copy, Check, ExternalLink, Moon, Sun, Share2 } from 'lucide-react';
```

### Step 8.3: Add Share State

```javascript
const [shareSuccess, setShareSuccess] = useState(false);
```

### Step 8.4: Update useEffect to Read URL Parameters

Replace your existing `useEffect` with this enhanced version:

```javascript
useEffect(() => {
    // Check for URL parameters
    const params = new URLSearchParams(window.location.search);
    const urlDomain = params.get('domain');
    const urlExperience = params.get('experience');
    const urlPromptType = params.get('type');

    if (urlDomain) setDomain(decodeURIComponent(urlDomain));
    if (urlExperience) setExperience(urlExperience);
    if (urlPromptType) setPromptType(urlPromptType);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setDarkMode(true);
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}, []);
```

### Step 8.5: Add Share Function

```javascript
const shareSettings = async () => {
    const params = new URLSearchParams({
        domain: domain,
        experience: experience,
        type: promptType
    });
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    try {
        await navigator.clipboard.writeText(shareUrl);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
    } catch (err) {
        console.error('Failed to copy share link:', err);
        // Fallback: show URL in prompt
        prompt('Copy this URL to share:', shareUrl);
    }
};
```

### Step 8.6: Update Button Layout

Wrap the generate button in a button group and add share button:

```javascript
h('div', { className: 'button-group' },
    h('button', {
        className: 'btn btn-primary',
        onClick: handleGeneratePrompt,
        disabled: !domain.trim(),
        style: { flex: 1 }
    },
        h(Sparkles, { size: 20 }),
        'Generate Prompt'
    ),

    h('button', {
        className: 'btn btn-share',
        onClick: shareSettings,
        disabled: !domain.trim(),
        title: 'Copy shareable link'
    },
        h(shareSuccess ? Check : Share2, { size: 18 }),
        shareSuccess ? 'Copied!' : 'Share'
    )
)
```

### Step 8.7: Verify

**Refresh your browser.**

**Complete share feature test:**

1. **Share button appearance:**
   - ✅ "Share" button appears next to "Generate Prompt"
   - ✅ Has share icon (two connected nodes)
   - ✅ Disabled when domain is empty
   - ✅ Enabled when domain has text

2. **Generate share link:**
   - Fill: Domain = "React Development"
   - Experience = "3-5 years"
   - Type = "System Design"
   - Click "Share" button
   - ✅ Button text changes to "Copied!"
   - ✅ Icon changes to checkmark
   - ✅ Wait 2 seconds → reverts to "Share"

3. **Verify URL copied:**
   - Paste into notepad/text editor
   - ✅ URL format: `http://localhost:8000/?domain=React%20Development&experience=3-5%20years&type=system-design`
   - ✅ Contains all three parameters
   - ✅ Domain is URL-encoded (spaces = %20)

4. **Test URL sharing:**
   - Copy the URL
   - Open in **new private/incognito window**
   - ✅ Domain field shows "React Development"
   - ✅ Experience dropdown shows "3-5 years"
   - ✅ Interview type shows "System Design"
   - ✅ Can immediately click "Generate Prompt"

5. **Edge case: Special characters:**
   - Domain = "Full-Stack (Node.js & React)"
   - Click "Share"
   - Paste URL in new tab
   - ✅ Parentheses, ampersand encoded correctly
   - ✅ Domain restored exactly

6. **Edge case: URL without params:**
   - Navigate to bare URL (no `?domain=...`)
   - ✅ Form shows defaults (empty domain, fresher, technical)
   - ✅ No errors in console

7. **Multi-share test:**
   - Change domain to "Python Backend"
   - Click "Share" again
   - ✅ New URL has updated domain
   - ✅ Old URL from clipboard is replaced

**Console verification:**

```javascript
// In browser console, test URL parameter parsing:
const params = new URLSearchParams('?domain=Test&experience=fresher&type=technical');
console.log(params.get('domain')); // "Test"
console.log(params.get('experience')); // "fresher"
console.log(params.get('type')); // "technical"
```

**Troubleshooting:**
- **URL not copying:**
  - Must use https:// or localhost (not file://)
  - Check browser console for clipboard permission error
  - Fallback prompt() should appear if clipboard fails
- **Parameters not pre-filling:**
  - Check `useEffect` runs on mount (add console.log)
  - Verify `setDomain`, `setExperience`, `setPromptType` are called
  - Check `decodeURIComponent` is used (handles %20 spaces)
- **Wrong URL generated:**
  - Verify `window.location.origin` and `window.location.pathname`
  - Check `URLSearchParams` creates correct query string
- **useEffect runs multiple times:**
  - This is OK - dependency array `[]` ensures it only runs on mount
  - If it runs on every render, check you have empty `[]`

**Why this matters:** This demonstrates the URL API (`URLSearchParams`), `useEffect` dependency arrays, graceful fallbacks (prompt if clipboard fails), and deep linking UX pattern.

---

## Milestone 9: All Interview Types

**Goal:** Ensure all three interview types have proper prompts and work correctly.

### Step 9.1: Verify prompts.js

Make sure your `prompts.js` has all three interview types. It should have been completed in Milestone 4, but double-check:

```javascript
// prompts.js should have:
if (promptType === 'technical') { ... }
else if (promptType === 'system-design') { ... }
else { // coding-round
    ...
}
```

### Step 9.2: Comprehensive Testing

**Test each interview type thoroughly:**

#### Test 1: Technical Interview

1. Domain: "JavaScript"
2. Experience: "1-2 years"
3. Type: "Technical Interview"
4. Click "Generate Prompt"

**Verify prompt contains:**
- ✅ "JavaScript" mentioned
- ✅ "1-2 years of professional experience"
- ✅ "Ask ONE Question Only"
- ✅ "Stop & Wait" section
- ✅ "Feedback Loop" section
- ✅ "Ask question #1 now" at the end

#### Test 2: System Design

1. Domain: "E-commerce Platform"
2. Experience: "5+ years"
3. Type: "System Design"
4. Click "Generate Prompt"

**Verify prompt contains:**
- ✅ "E-commerce Platform" mentioned
- ✅ "5+ years of professional experience"
- ✅ "Work in Phases" section
- ✅ "Phase 1 - Clarifications"
- ✅ "Phase 2 - High-Level Design"
- ✅ "Phase 3 - Deep Dive"
- ✅ "Phase 4 - Trade-offs"
- ✅ "Present the problem now" at the end

#### Test 3: Coding Round

1. Domain: "Data Structures & Algorithms"
2. Experience: "Fresher"
3. Type: "Coding Round"
4. Click "Generate Prompt"

**Verify prompt contains:**
- ✅ "Data Structures & Algorithms" mentioned
- ✅ "fresher with no prior work experience"
- ✅ "Present ONE Coding Problem"
- ✅ "Input format and constraints"
- ✅ "Example test cases"
- ✅ "Code Review & Feedback" section
- ✅ "Ask About Complexity" section
- ✅ "Present coding problem #1 now" at the end

### Step 9.3: Test Type Switching

**Sequential type changes:**

1. Generate Technical prompt
   - ✅ Technical prompt appears
2. Change type to "System Design" (don't change domain)
   - Click "Generate Prompt"
   - ✅ Prompt updates to System Design format
   - ✅ Domain stays the same
3. Change type to "Coding Round"
   - Click "Generate Prompt"
   - ✅ Prompt updates to Coding Round format
   - ✅ Domain still the same

### Step 9.4: Test with Share Feature

1. Set: Domain = "Python", Experience = "3-5 years", Type = "Coding Round"
2. Click "Share"
3. Copy URL and paste in new tab
4. ✅ All three fields pre-filled correctly
5. Click "Generate Prompt"
6. ✅ Gets Coding Round prompt for Python

### Step 9.5: Edge Case Testing

**Empty domain handling:**
- Leave domain empty
- ✅ Generate button disabled
- ✅ Share button disabled
- Type "Test" in domain
- ✅ Both buttons become enabled

**Whitespace-only domain:**
- Type "   " (only spaces)
- ✅ Buttons stay disabled (`.trim()` catches this)

**Very long domain name:**
- Domain: "Full-Stack Web Development with React, Node.js, PostgreSQL, Docker, Kubernetes, AWS, and CI/CD"
- ✅ Generate works
- ✅ Share URL encodes correctly
- ✅ Prompt includes full domain name

**Special characters:**
- Domain: "C++ & C# (Low-Level Systems)"
- ✅ Generate works
- ✅ Share URL encodes: `C%2B%2B%20%26%20C%23%20%28Low-Level%20Systems%29`
- ✅ Restored correctly from URL

### Step 9.6: Verify All Icons

Make sure all icons are imported and rendering:

```javascript
// Verify these are all imported:
import {
    Sparkles,      // Generate button
    Copy,          // Copy button (before copy)
    Check,         // Copy button (after copy) & toast & share success
    ExternalLink,  // AI tool links
    Moon,          // Dark mode toggle (light mode)
    Sun,           // Dark mode toggle (dark mode)
    Share2         // Share button
} from 'lucide-react';
```

**Visual verification:**
- ✅ Generate button: Sparkle icon
- ✅ Share button: Share icon (before click), Checkmark (after click)
- ✅ Copy button: Copy icon (before), Checkmark (after)
- ✅ Theme toggle: Moon (light mode), Sun (dark mode)
- ✅ AI links: External link icon on each
- ✅ Toast: Checkmark icon

**Troubleshooting:**
- **Icon shows as object:** Check you're using `h(IconName, props)` not string
- **Wrong icon shows:** Verify icon name matches import
- **Icon too big/small:** Check `size` prop (typically 14-20)

---

## Milestone 10: Polish & Responsive Design

**Goal:** Make the app production-ready with responsive design and polish.

### Step 10.1: Add Meta Tags

Add these meta tags in `<head>`:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Generate customized AI interview preparation prompts for technical, system design, and coding interviews.">
    <meta name="keywords" content="interview prep, AI prompts, technical interview, system design, coding interview">
    <meta name="author" content="Your Name">
    <title>Interview Prep with AI - Generate Custom Interview Prompts</title>
</head>
```

### Step 10.2: Add Responsive Styles

Add these responsive breakpoints:

```css
/* Tablet */
@media (max-width: 768px) {
    .container {
        padding: 20px 0;
    }

    .card {
        padding: 30px 24px;
    }

    h1 {
        font-size: 1.75rem;
    }

    .button-group {
        flex-direction: column;
    }

    .btn-share {
        margin-left: 0;
        margin-top: 12px;
    }

    .theme-toggle {
        top: 16px;
        right: 16px;
    }
}

/* Mobile */
@media (max-width: 480px) {
    body {
        padding: 12px;
    }

    .card {
        padding: 24px 20px;
    }

    h1 {
        font-size: 1.5rem;
    }

    .subtitle {
        font-size: 0.875rem;
    }

    .prompt-box {
        font-size: 0.875rem;
        padding: 16px;
        max-height: 300px;
    }

    .ai-link {
        font-size: 0.85rem;
        padding: 6px 12px;
    }

    .toast {
        right: 12px;
        top: 12px;
        font-size: 0.9rem;
    }
}
```

### Step 10.3: Add Loading States (Enhancement)

Add a loading state for generating prompts:

```javascript
const [isGenerating, setIsGenerating] = useState(false);

const handleGeneratePrompt = () => {
    setIsGenerating(true);
    // Simulate brief processing time for UX
    setTimeout(() => {
        const prompt = generateInterviewPrompt(domain, experience, promptType);
        setGeneratedPrompt(prompt);
        setIsGenerating(false);
    }, 100);
};
```

Update generate button:

```javascript
h('button', {
    className: 'btn btn-primary',
    onClick: handleGeneratePrompt,
    disabled: !domain.trim() || isGenerating,
    style: { flex: 1 }
},
    h(Sparkles, { size: 20 }),
    isGenerating ? 'Generating...' : 'Generate Prompt'
)
```

### Step 10.4: Add Keyboard Shortcuts (Enhancement)

Add Enter key support for form submission:

```javascript
// Add to domain input:
h('input', {
    id: 'domain',
    type: 'text',
    placeholder: 'e.g., Frontend Development, Data Science',
    value: domain,
    onInput: (e) => setDomain(e.target.value),
    onKeyDown: (e) => {
        if (e.key === 'Enter' && domain.trim()) {
            handleGeneratePrompt();
        }
    }
})
```

### Step 10.5: Comprehensive Testing

**Desktop (1920x1080):**
- ✅ Card centered, 700px max width
- ✅ All elements properly spaced
- ✅ Icons render at correct size
- ✅ Hover effects work smoothly

**Tablet (768px wide):**
- ✅ Card padding reduces to 30px
- ✅ Heading smaller (1.75rem)
- ✅ Share button below Generate (vertical stack)
- ✅ Theme toggle repositioned

**Mobile (375px wide - iPhone SE):**
- ✅ All content fits without horizontal scroll
- ✅ Text readable without zooming
- ✅ Buttons large enough to tap (min 44px)
- ✅ Prompt box scrolls within 300px height
- ✅ AI links wrap to multiple rows
- ✅ Form inputs full width

**Keyboard navigation:**
- Press Tab repeatedly
- ✅ Can navigate through: domain input → experience select → type select → generate button → share button
- ✅ Focus indicators visible
- Type in domain field, press Enter
- ✅ Generates prompt

**Accessibility:**
- Use browser reader mode
- ✅ Content is readable
- ✅ Semantic HTML (labels, headings)
- Right-click theme toggle → Inspect
- ✅ Has `aria-label="Toggle dark mode"`

**Performance:**
- Open DevTools → Network tab
- Refresh page
- ✅ React loads from esm.sh CDN
- ✅ Lucide icons load
- ✅ Total page size < 500KB
- ✅ Page interactive in < 1 second

### Step 10.6: Final Verification Checklist

**Visual:**
- ✅ No layout shifts on load
- ✅ Smooth transitions (dark mode, hover effects)
- ✅ Consistent spacing
- ✅ No text overflow
- ✅ Icons properly aligned

**Functional:**
- ✅ All three interview types work
- ✅ Dark mode toggles and persists
- ✅ Copy to clipboard works
- ✅ Share generates correct URL
- ✅ URL parameters pre-fill form
- ✅ AI tool links open in new tabs
- ✅ Form validation (empty domain)
- ✅ Keyboard shortcuts work

**Browser compatibility:**
Test in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari

**No console errors:**
- ✅ Open DevTools → Console
- ✅ No errors (red text)
- ✅ No warnings about keys in lists
- ✅ No CORS errors

---

## Extension Ideas

Now that you have a fully functional app, here are ideas to extend it:

### Extension 1: Interview History

**Goal:** Save generated prompts to localStorage and show recent history.

**Implementation:**

```javascript
// Add state
const [promptHistory, setPromptHistory] = useState([]);

// Load from localStorage on mount
useEffect(() => {
    const saved = localStorage.getItem('promptHistory');
    if (saved) {
        setPromptHistory(JSON.parse(saved));
    }
}, []);

// Save to history when generating
const handleGeneratePrompt = () => {
    const prompt = generateInterviewPrompt(domain, experience, promptType);
    setGeneratedPrompt(prompt);

    // Add to history
    const historyItem = {
        id: Date.now(),
        domain,
        experience,
        promptType,
        timestamp: new Date().toISOString()
    };

    const newHistory = [historyItem, ...promptHistory].slice(0, 10); // Keep last 10
    setPromptHistory(newHistory);
    localStorage.setItem('promptHistory', JSON.stringify(newHistory));
};

// Render history
h('div', { className: 'history-section' },
    h('h3', null, 'Recent Prompts'),
    ...promptHistory.map(item =>
        h('div', {
            key: item.id,
            className: 'history-item',
            onClick: () => {
                setDomain(item.domain);
                setExperience(item.experience);
                setPromptType(item.promptType);
            }
        },
            `${item.domain} - ${item.promptType}`
        )
    )
)
```

**New skills learned:**
- Complex localStorage with JSON
- Array manipulation (slice, spread)
- Timestamp handling
- Click handlers for history items

### Extension 2: Prompt Templates Library

**Goal:** Pre-made domain templates users can select.

**Implementation:**

Create `templates.js`:

```javascript
export const templates = [
    {
        name: 'Frontend React Developer',
        domain: 'Frontend Development (React, TypeScript)',
        experience: '3-5 years',
        promptType: 'technical'
    },
    {
        name: 'Backend Node.js Engineer',
        domain: 'Backend Development (Node.js, Express, MongoDB)',
        experience: '3-5 years',
        promptType: 'system-design'
    },
    {
        name: 'Data Structures & Algorithms',
        domain: 'Computer Science Fundamentals',
        experience: 'fresher',
        promptType: 'coding-round'
    },
    // Add more templates
];
```

Add template selector:

```javascript
import { templates } from './templates.js';

// In component:
h('select', {
    onChange: (e) => {
        const template = templates.find(t => t.name === e.target.value);
        if (template) {
            setDomain(template.domain);
            setExperience(template.experience);
            setPromptType(template.promptType);
        }
    }
},
    h('option', { value: '' }, 'Select a template...'),
    ...templates.map(t => h('option', { value: t.name }, t.name))
)
```

**New skills learned:**
- Multi-module architecture
- Data-driven UI
- Form pre-filling from templates

### Extension 3: Export Prompts

**Goal:** Download prompts as text files.

**Implementation:**

```javascript
const downloadPrompt = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `interview-prep-${domain.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

// Add download button
h('button', {
    className: 'btn btn-secondary',
    onClick: downloadPrompt
}, 'Download as .txt')
```

**New skills learned:**
- Blob API
- File downloads from JavaScript
- URL.createObjectURL
- String manipulation for filenames

### Extension 4: Custom Prompt Builder

**Goal:** Let users customize the prompt rules.

**Implementation:**

Add customization state:

```javascript
const [customRules, setCustomRules] = useState({
    questionCount: 10,
    includeDifficulty: true,
    includeExamples: true,
    feedbackWordLimit: 100
});
```

Add customization UI:

```javascript
h('details', null,
    h('summary', null, 'Customize Prompt'),
    h('div', { className: 'custom-rules' },
        h('label', null,
            'Number of questions: ',
            h('input', {
                type: 'number',
                value: customRules.questionCount,
                onChange: (e) => setCustomRules({
                    ...customRules,
                    questionCount: parseInt(e.target.value)
                })
            })
        ),
        // Add more customization options
    )
)
```

Update `generateInterviewPrompt` to accept custom rules:

```javascript
export function generateInterviewPrompt(domain, experience, promptType, customRules = {}) {
    const questionCount = customRules.questionCount || 10;
    // Use customRules throughout prompt
}
```

**New skills learned:**
- Object spreading for state updates
- Details/summary HTML elements
- Passing objects as parameters
- Default parameter values

### Extension 5: Practice Session Timer

**Goal:** Track how long users spend in practice sessions.

**Implementation:**

```javascript
const [sessionStart, setSessionStart] = useState(null);
const [sessionTime, setSessionTime] = useState(0);

useEffect(() => {
    if (generatedPrompt && !sessionStart) {
        setSessionStart(Date.now());
    }
}, [generatedPrompt]);

useEffect(() => {
    if (!sessionStart) return;

    const interval = setInterval(() => {
        setSessionTime(Math.floor((Date.now() - sessionStart) / 1000));
    }, 1000);

    return () => clearInterval(interval);
}, [sessionStart]);

// Display timer
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

h('div', { className: 'timer' },
    'Session time: ',
    formatTime(sessionTime)
)
```

**New skills learned:**
- useEffect cleanup functions
- setInterval/clearInterval
- Time formatting
- Multiple useEffect hooks

### Extension 6: Multi-Language Support (i18n)

**Goal:** Support multiple languages.

**Implementation:**

Create `translations.js`:

```javascript
export const translations = {
    en: {
        title: 'Interview Prep with AI',
        subtitle: 'Generate customized prompts for your interview preparation',
        domain: 'Domain / Role',
        experience: 'Experience Level',
        generate: 'Generate Prompt'
    },
    es: {
        title: 'Preparación de Entrevistas con IA',
        subtitle: 'Genera indicaciones personalizadas para tu preparación de entrevistas',
        domain: 'Dominio / Rol',
        experience: 'Nivel de Experiencia',
        generate: 'Generar Indicación'
    }
};
```

Add language state:

```javascript
const [language, setLanguage] = useState('en');
const t = translations[language];

// Use throughout:
h('h1', null, t.title)
h('label', null, t.domain)
```

**New skills learned:**
- Internationalization patterns
- Object lookup for translations
- Language switcher UI

### Extension 7: AI Integration (Advanced)

**Goal:** Actually call AI APIs instead of just generating prompts.

**Implementation:**

```javascript
const callAI = async (prompt) => {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'your-api-key',
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 1024,
            messages: [{ role: 'user', content: prompt }]
        })
    });

    const data = await response.json();
    return data.content[0].text;
};
```

**New skills learned:**
- Fetch API
- Async/await
- API authentication
- Error handling with try/catch

**Note:** This requires API keys and has security implications (don't expose keys in frontend code).

---

## Deployment

### Deployment Option 1: GitHub Pages (Recommended)

**Step 1: Create GitHub Repository**

```bash
git init
git add .
git commit -m "Initial commit: Interview Prep with AI"
git branch -M main
git remote add origin https://github.com/yourusername/interview-prep-ai.git
git push -u origin main
```

**Step 2: Enable GitHub Pages**

1. Go to repository Settings
2. Scroll to "Pages" section
3. Source: "Deploy from branch"
4. Branch: `main`
5. Folder: `/ (root)`
6. Click "Save"

**Step 3: Wait for Deployment**

- Usually takes 1-2 minutes
- Check Actions tab for build status
- Site will be at: `https://yourusername.github.io/interview-prep-ai/`

**Step 4: Custom Domain (Optional)**

1. Buy domain on Namecheap
2. In GitHub: Settings → Pages → Custom domain
3. Enter: `yoursite.com`
4. In Namecheap DNS:
   - Add A records:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add CNAME: `www` → `yourusername.github.io`

### Deployment Option 2: Netlify

**Drag-and-drop deployment:**

1. Go to netlify.com
2. Drag your folder into Netlify Drop
3. Instant deployment!
4. Get URL like: `amazing-curie-123456.netlify.app`

**From Git:**

1. Push to GitHub (see above)
2. Connect Netlify to GitHub repo
3. No build command needed (static files)
4. Auto-deploys on push

### Deployment Option 3: Vercel

```bash
npm install -g vercel
cd your-project
vercel
```

Follow prompts, get instant deployment.

### Deployment Verification

**After deployment, test:**

1. ✅ Visit your URL
2. ✅ All styles load correctly
3. ✅ React initializes (no console errors)
4. ✅ Generate prompts works
5. ✅ Dark mode works
6. ✅ Copy to clipboard works
7. ✅ Share URLs work (test the full URL)
8. ✅ AI tool links work
9. ✅ Mobile responsive (test on phone)

**Common deployment issues:**

- **Module not found:** Check file paths are relative (`./prompts.js`)
- **CORS errors:** Not applicable for this static site
- **Assets not loading:** Check all imports use relative paths
- **404 on refresh:** Not applicable (single HTML file)

---

## Conclusion

**What you've built:**
- A production-ready web application
- Modern React architecture without build tools
- Modular, maintainable code
- Professional UI with dark mode
- Shareable URLs
- Mobile-responsive design
- Deployed to the web

**Skills learned:**
- React hooks (useState, useEffect)
- ES6 modules
- CSS custom properties
- LocalStorage API
- Clipboard API
- URL API (URLSearchParams)
- Responsive design
- Git and deployment

**Next steps:**
- Add analytics (Google Analytics, Plausible)
- Implement one of the extension ideas
- Contribute to open source (make your repo public!)
- Build a similar project for another domain
- Learn React with JSX (use Create React App or Vite)
- Explore TypeScript for type safety

**Congratulations!** You've built a real-world application that solves an actual problem. This is portfolio-worthy work.

---

## Troubleshooting Guide

### Common Issues and Solutions

**Issue: "Failed to resolve module specifier"**
- **Cause:** ES modules require a server
- **Solution:** Use `python3 -m http.server` or Live Server extension

**Issue: Dark mode doesn't persist**
- **Cause:** LocalStorage blocked (private browsing)
- **Solution:** Use normal browser window, not incognito

**Issue: Icons show as `[object Object]`**
- **Cause:** Using string instead of component: `h('Copy')` vs `h(Copy)`
- **Solution:** Import icon and use as component

**Issue: State doesn't update**
- **Cause:** Mutating state directly
- **Solution:** Always use setState, never modify state directly

**Issue: useEffect runs infinitely**
- **Cause:** Missing or wrong dependency array
- **Solution:** Add `[]` for run-once, or include dependencies

**Issue: Clipboard doesn't work**
- **Cause:** Insecure context (not HTTPS or localhost)
- **Solution:** Use localhost:8000, not file://

**Issue: Styles don't apply**
- **Cause:** CSS selector specificity or typo in className
- **Solution:** Inspect element, check computed styles

**Issue: Share URL doesn't work**
- **Cause:** Base URL wrong
- **Solution:** Check `window.location.origin` in console

**Getting Help:**
- Read error messages carefully
- Use browser DevTools console
- Check React DevTools
- Search error messages on Stack Overflow
- Review the relevant milestone in this guide

---

**Happy Coding! 🚀**
