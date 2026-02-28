"use client";
import { useState, useEffect } from "react";

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounce logic wait 1 second after typing stops
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (message.length > 20) getAISuggestion(message);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [message]);

  async function getAISuggestion(text: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setSuggestion(data.subject);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-black text-white">
      <h1 className="text-xl font-bold mb-4">Smart Contact Form</h1>

      <label className="block text-sm font-medium mb-1">Subject Line</label>
      <input
        className="w-full p-2 text-sm border mb-4 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
        placeholder={loading ? "Generating..." : "Suggested subject will appear..."}
      />

      <label className="block text-sm font-medium mb-1">Message</label>
      <textarea
        className="w-full p-2 border h-32 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Start typing your message..."
      />
    </div>
  );
}
