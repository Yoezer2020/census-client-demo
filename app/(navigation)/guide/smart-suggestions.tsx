/**
 * Smart Suggestions Engine
 * Provides contextual suggestions based on conversation flow
 */

import { GuideContent, commonQuestions } from "./context";

export interface SmartSuggestion {
  question: string;
  search: string;
  reason?: string;
}

/**
 * Generate smart follow-up suggestions based on what was just discussed
 */
export function getFollowUpSuggestions(
  lastContent: GuideContent | null
): SmartSuggestion[] {
  if (!lastContent) {
    return commonQuestions.map((q) => ({ ...q }));
  }

  // Contextual follow-ups based on what they just learned
  const suggestions: SmartSuggestion[] = [];

  // If they asked about eligibility, suggest documents next
  if (lastContent.id.includes("eligibility")) {
    suggestions.push({
      question: "What documents do I need?",
      search: "required documents",
      reason: "Next logical step after eligibility",
    });
    suggestions.push({
      question: "Where can I apply?",
      search: "service centers",
      reason: "You'll need to know where to go",
    });
  }

  // If they asked about documents, suggest process
  if (lastContent.id.includes("documents")) {
    suggestions.push({
      question: "How do I apply?",
      search: "application process",
      reason: "Now that you know what documents you need",
    });
    suggestions.push({
      question: "What if I lost my health card?",
      search: "lost MCH health card",
      reason: "Common concern",
    });
  }

  // If they asked about process, suggest tracking
  if (lastContent.id.includes("process")) {
    suggestions.push({
      question: "How do I track my application?",
      search: "track status",
      reason: "After submitting",
    });
    suggestions.push({
      question: "When can I collect my card?",
      search: "collection",
      reason: "You'll want to know this",
    });
    suggestions.push({
      question: "How much does it cost?",
      search: "fees",
      reason: "You'll need to pay at the counter",
    });
  }

  // If they asked about service centers, suggest specifics
  if (lastContent.id.includes("service-centers")) {
    suggestions.push({
      question: "Which office in Thimphu should I go to?",
      search: "Thimphu offices",
      reason: "Get specific locations",
    });
    suggestions.push({
      question: "What are the office hours?",
      search: "office hours contact",
      reason: "Plan your visit",
    });
  }

  // If they asked about collection, suggest tracking
  if (lastContent.id.includes("collection")) {
    suggestions.push({
      question: "How do I track my status?",
      search: "track application status",
      reason: "To know when it's ready",
    });
  }

  // If they asked about fees, suggest process
  if (lastContent.id.includes("fees")) {
    suggestions.push({
      question: "What's the full application process?",
      search: "application process steps",
      reason: "Understand the complete procedure",
    });
  }

  // If we have contextual suggestions, add a few common ones
  if (suggestions.length > 0 && suggestions.length < 4) {
    const commonToAdd = commonQuestions.filter(
      (cq) => !suggestions.some((s) => s.question === cq.question)
    );
    suggestions.push(...commonToAdd.slice(0, 4 - suggestions.length));
  }

  // If no contextual suggestions, return common ones
  return suggestions.length > 0 ? suggestions : commonQuestions.slice(0, 4);
}

/**
 * Detect if query is a unique/complex question that needs human support
 */
export function isComplexQuery(query: string): boolean {
  const complexIndicators = [
    "my case is different",
    "special case",
    "exception",
    "urgent",
    "emergency",
    "problem with",
    "error",
    "rejected",
    "denied",
    "appeal",
    "wrong information",
    "mistake",
    "correction",
    "change details",
    "update information",
  ];

  const lowerQuery = query.toLowerCase();
  return complexIndicators.some((indicator) => lowerQuery.includes(indicator));
}

/**
 * Detect if user is frustrated or needs escalation
 */
export function needsEscalation(messages: any[]): boolean {
  if (messages.length < 6) return false;

  // If user asked more than 3 questions and still asking
  const userMessages = messages.filter((m) => m.type === "user");
  if (userMessages.length > 3) {
    const lastUserMessage =
      userMessages[userMessages.length - 1]?.content || "";
    const frustrationWords = [
      "still don't understand",
      "not clear",
      "confused",
      "doesn't help",
      "need to talk",
      "speak to someone",
      "call me",
      "not helpful",
    ];

    return frustrationWords.some((word) =>
      lastUserMessage.toLowerCase().includes(word)
    );
  }

  return false;
}

/**
 * Generate helpful response for complex queries
 */
export function getComplexQueryResponse(query: string): string {
  return `I understand your situation regarding "${query}" may require personalized assistance.\n\n**For the best help with your specific case, I recommend:**\n\n📞 **Call DCRC Head Office**\n• They can provide case-specific guidance\n• Available during office hours\n\n🏢 **Visit the Nearest Service Center**\n• Thimphu: DCRC Head Office, Chhophel lam (02-323662)\n• Dzongkhag CRC Office (02-321934)\n• Thromde CRC Office (02-332429)\n\n💬 **What I Can Still Help With:**\n• General application procedures\n• Document requirements\n• Office locations and timings\n• Standard process steps\n\nWould you like to know about any of these general topics?`;
}

/**
 * Track common queries for analytics (optional implementation)
 */
export function logQuery(query: string, resultsFound: number): void {
  // In production, you could send this to analytics
  if (typeof window !== "undefined") {
    // Store in localStorage for simple tracking
    try {
      const queries = JSON.parse(
        localStorage.getItem("assistant_queries") || "[]"
      );
      queries.push({
        query,
        resultsFound,
        timestamp: new Date().toISOString(),
      });
      // Keep only last 100 queries
      const recentQueries = queries.slice(-100);
      localStorage.setItem("assistant_queries", JSON.stringify(recentQueries));
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  }
}

/**
 * Get query statistics (for admin/development purposes)
 */
export function getQueryStats(): {
  totalQueries: number;
  commonQueries: { query: string; count: number }[];
  noResultQueries: string[];
} {
  try {
    const queries = JSON.parse(
      localStorage.getItem("assistant_queries") || "[]"
    );

    const queryMap = new Map<string, number>();
    const noResults: string[] = [];

    queries.forEach(
      (item: { query: string; resultsFound: number; timestamp: string }) => {
        queryMap.set(item.query, (queryMap.get(item.query) || 0) + 1);
        if (item.resultsFound === 0) {
          noResults.push(item.query);
        }
      }
    );

    const commonQueries = Array.from(queryMap.entries())
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalQueries: queries.length,
      commonQueries,
      noResultQueries: Array.from(new Set(noResults)),
    };
  } catch (e) {
    return { totalQueries: 0, commonQueries: [], noResultQueries: [] };
  }
}
