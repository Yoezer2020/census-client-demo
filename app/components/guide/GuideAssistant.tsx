"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Sparkles,
  Loader2,
  Phone,
} from "lucide-react";
import {
  searchKnowledgeBase,
  commonQuestions,
  GuideContent,
} from "@/app/(navigation)/guide/context";
import {
  getFollowUpSuggestions,
  isComplexQuery,
  getComplexQueryResponse,
  logQuery,
} from "@/app/(navigation)/guide/smart-suggestions";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  relatedContent?: GuideContent[];
}

export default function GuideAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content:
        "Hello! I'm your CID/SR Card Application Guide Assistant. I can help you with questions about eligibility, required documents, application process, and more. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastContent, setLastContent] = useState<GuideContent | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const query = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Simulate processing delay for better UX
    setTimeout(() => {
      // Check if this is a complex/unique query first
      if (isComplexQuery(query)) {
        const complexResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: getComplexQueryResponse(query),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, complexResponse]);
        setIsTyping(false);
        logQuery(query, 0);
        return;
      }

      const results = searchKnowledgeBase(query);
      logQuery(query, results.length);

      let responseContent = "";
      if (results.length > 0) {
        // Store the first result for smart follow-ups
        setLastContent(results[0]);

        // Found relevant content
        responseContent = `Based on your question, here's what I found:\n\n`;
        results.forEach((result, index) => {
          if (index === 0) {
            responseContent += `**${result.title}**\n\n${result.content}\n\n`;
          } else {
            responseContent += `\n**Related: ${
              result.title
            }**\n${result.content.substring(0, 150)}...\n`;
          }
        });
        responseContent += `\n💡 **Need more help?** Feel free to ask follow-up questions or contact our service centers for personalized assistance.`;
      } else {
        // No match found - provide helpful alternatives
        responseContent = `I understand you're asking about "${query}", but I couldn't find specific information in my knowledge base.\n\n`;

        // Suggest common questions
        responseContent += `**Here are some common topics I can help with:**\n\n`;
        responseContent += commonQuestions
          .slice(0, 6)
          .map((q, i) => `${i + 1}. ${q.question}`)
          .join("\n");

        responseContent += `\n\n**For Complex or Unique Queries:**\n`;
        responseContent += `📞 Contact DCRC Head Office: Available during office hours\n`;
        responseContent += `📧 Visit the nearest service center for personalized assistance\n`;
        responseContent += `🌐 Check the official DCRC website for detailed information\n\n`;
        responseContent += `You can try rephrasing your question or ask about any of the topics above!`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: responseContent,
        timestamp: new Date(),
        relatedContent: results.length > 0 ? results : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (search: string) => {
    setInputValue(search);
    setTimeout(() => handleSend(), 100);
  };

  const formatMessageContent = (content: string) => {
    // Split by double newlines for paragraphs
    const paragraphs = content.split("\n\n");

    return paragraphs.map((paragraph, pIndex) => {
      // Check if it's a bold title (starts with **)
      if (paragraph.startsWith("**") && paragraph.includes("**")) {
        const titleMatch = paragraph.match(/\*\*(.*?)\*\*/);
        if (titleMatch) {
          const title = titleMatch[1];
          const rest = paragraph.replace(/\*\*(.*?)\*\*/, "").trim();
          return (
            <div key={pIndex} className="mb-3">
              <h4 className="font-bold text-secondary mb-1">
                {title}
              </h4>
              {rest && (
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {rest}
                </p>
              )}
            </div>
          );
        }
      }

      // Regular paragraph
      return (
        <p
          key={pIndex}
          className="text-gray-700 text-sm leading-relaxed mb-2 whitespace-pre-line"
        >
          {paragraph}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-primary hover:bg-primary-dark"
        } text-white group`}
        aria-label="Toggle Guide Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-secondary p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Guide Assistant</h3>
                <p className="text-xs text-gray-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI-powered help
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "user"
                      ? "bg-secondary"
                      : "bg-secondary/10"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-secondary" />
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={`flex-1 ${
                    message.type === "user" ? "items-end" : "items-start"
                  } flex flex-col`}
                >
                  <div
                    className={`rounded-2xl p-3 max-w-[85%] ${
                      message.type === "user"
                        ? "bg-secondary text-white rounded-tr-none"
                        : "bg-gray-100 rounded-tl-none"
                    }`}
                  >
                    {message.type === "user" ? (
                      <p className="text-sm">{message.content}</p>
                    ) : (
                      <div>{formatMessageContent(message.content)}</div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-secondary/10">
                  <Bot className="w-5 h-5 text-secondary" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions - Smart Suggestions */}
          {messages.length > 1 && (
            <div className="px-4 pb-3 border-t border-gray-200 pt-3">
              <p className="text-xs font-semibold text-gray-600 mb-2">
                💡 You might also want to know:
              </p>
              <div className="flex flex-wrap gap-2">
                {getFollowUpSuggestions(lastContent)
                  .slice(0, 4)
                  .map((q, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(q.search)}
                      className="text-xs px-3 py-1.5 bg-secondary/5 text-secondary rounded-full hover:bg-secondary/10 transition-colors"
                    >
                      {q.question}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Initial Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-3 border-t border-gray-200 border-gray-700 pt-3">
              <p className="text-xs font-semibold text-gray-600 text-gray-400 mb-2">
                Quick Questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {commonQuestions.slice(0, 4).map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(q.search)}
                    className="text-xs px-3 py-1.5 bg-blue-50 bg-blue-900/20 text-blue-700 text-blue-300 rounded-full hover:bg-blue-100 hover:bg-blue-900/30 transition-colors"
                  >
                    {q.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 border-gray-700">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 bg-gray-100 bg-gray-800 border border-gray-200 border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900 text-white"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-3 bg-secondary text-white rounded-full hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
