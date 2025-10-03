import { useCallback, useMemo, useState } from 'react';

const SYSTEM_PROMPT = `You are FocusMate AI, an empathetic productivity mentor. Your role is to help users with studying, productivity, success habits, and effective work methods.
- Provide concise, structured, and motivational answers with actionable steps when applicable.
- Maintain a professional and encouraging tone.
- If a user asks a question that is irrelevant, offensive, or trolling, you must respond with exactly: "Sorry, I can only answer questions related to studying, productivity, and success strategies."`;

const DEFAULT_MODEL = 'gpt-3.5-turbo';

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 11);
};

export function useAI(initialMessages = []) {
  const [messages, setMessages] = useState(() => initialMessages.map((message) => ({ ...message })));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = useMemo(() => import.meta.env.VITE_OPENAI_API_KEY || '', []);
  const model = useMemo(() => import.meta.env.VITE_OPENAI_MODEL || DEFAULT_MODEL, []);

  const sendMessage = useCallback(
    async (content) => {
      if (!content?.trim()) {
        return;
      }

      if (!apiKey) {
        setError('Missing API key. Please provide VITE_OPENAI_API_KEY in your environment.');
        return;
      }

      const userMessage = {
        id: createId(),
        role: 'user',
        content: content.trim(),
        createdAt: new Date().toISOString()
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const recentMessages = messages.slice(-8).map(({ role, content: text }) => ({
          role,
          content: text
        }));

        const conversation = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...recentMessages,
          { role: 'user', content: content.trim() }
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model,
            messages: conversation,
            temperature: 0.7,
            presence_penalty: 0.2,
            max_tokens: 600
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch response. Please try again.');
        }

        const data = await response.json();
        const aiMessage = {
          id: createId(),
          role: 'assistant',
          content: data?.choices?.[0]?.message?.content?.trim() ||
            'Sorry, I can only answer questions related to studying, productivity, and success strategies.',
          createdAt: new Date().toISOString()
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey, messages, model]
  );

  const resetChat = useCallback(() => {
    setMessages(initialMessages.map((message) => ({ ...message })));
    setError(null);
  }, [initialMessages]);

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    resetChat
  };
}