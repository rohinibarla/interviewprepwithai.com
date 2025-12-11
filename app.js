import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, ExternalLink, Moon, Sun, Share2 } from 'lucide-react';
import { generateInterviewPrompt } from './prompts.js';

const { createElement: h, Fragment } = React;

export default function App() {
    const [domain, setDomain] = useState('');
    const [experience, setExperience] = useState('fresher');
    const [promptType, setPromptType] = useState('technical');
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [copied, setCopied] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [shareSuccess, setShareSuccess] = useState(false);

    // Initialize from URL params and localStorage on mount
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

    const generatePrompt = () => {
        const prompt = generateInterviewPrompt(domain, experience, promptType);
        setGeneratedPrompt(prompt);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(generatedPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
        }
    };

    const aiTools = [
        { name: 'ChatGPT', url: 'https://chat.openai.com' },
        { name: 'Claude', url: 'https://claude.ai' },
        { name: 'Gemini', url: 'https://gemini.google.com' },
        { name: 'Perplexity', url: 'https://www.perplexity.ai' }
    ];

    return h('div', { className: 'container' },
        h('div', { className: 'card' },
            h('button', {
                className: 'theme-toggle',
                onClick: toggleDarkMode,
                'aria-label': 'Toggle dark mode'
            },
                h(darkMode ? Sun : Moon, { size: 20 })
            ),

            h('h1', null, 'Interview Prep with AI'),
            h('p', { className: 'subtitle' },
                'Generate customized prompts for your interview preparation'
            ),

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

            h('div', { className: 'form-group' },
                h('label', { htmlFor: 'promptType' }, 'Interview Type'),
                h('select', {
                    id: 'promptType',
                    value: promptType,
                    onChange: (e) => setPromptType(e.target.value)
                },
                    h('option', { value: 'technical' }, 'Technical Interview'),
                    h('option', { value: 'system-design' }, 'System Design')
                )
            ),

            h('div', { className: 'button-group' },
                h('button', {
                    className: 'btn btn-primary',
                    onClick: generatePrompt,
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
            ),

            generatedPrompt && h('div', { className: 'result-section' },
                h('div', { className: 'prompt-box' }, generatedPrompt),

                h('button', {
                    className: 'btn btn-secondary',
                    onClick: copyToClipboard
                },
                    h(copied ? Check : Copy, { size: 18 }),
                    copied ? 'Copied!' : 'Copy to Clipboard'
                ),

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
        ),

        copied && h('div', { className: 'toast' },
            h(Check, { size: 18 }),
            'Copied to clipboard!'
        )
    );
}
