import { approvedKnowledgeDocuments } from "./knowledge-base";
import { ragConfig } from "./config";
import type { KnowledgeChunk, KnowledgeRetriever, KnowledgeRetrievalInput } from "./types";

const collectionByIntent: Record<string, string[]> = {
  daily_fortune: ["score_interpretation", "safety_policy", "localized_terminology"],
  timing_advice: ["timing_methodology", "score_interpretation", "safety_policy"],
  compatibility: ["compatibility_methodology", "safety_policy"],
  multi_system_comparison: ["score_interpretation", "safety_policy"],
  fortune_method_explanation: ["fortune_methodology", "plugin_documentation", "localized_terminology"],
  result_explanation: ["score_interpretation", "timing_methodology", "safety_policy"],
  profile_help: ["product_help"],
  subscription_help: ["subscription_help", "product_help"],
  coupon_help: ["coupon_help", "product_help"],
  product_support: ["product_help"]
};

function score(content: string, query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return terms.reduce((sum, term) => sum + (content.toLowerCase().includes(term) ? 1 : 0), 0);
}

export const localKnowledgeRetriever: KnowledgeRetriever = {
  async retrieve(input: KnowledgeRetrievalInput): Promise<KnowledgeChunk[]> {
    const allowedCollections = collectionByIntent[input.intent] ?? [];
    return approvedKnowledgeDocuments
      .filter((document) => document.status === "approved")
      .filter((document) => document.locale === input.locale || document.locale === "th")
      .filter((document) => allowedCollections.includes(document.collection))
      .map((document) => ({
        documentId: document.id,
        collection: document.collection,
        title: document.title,
        content: document.content.slice(0, 700),
        locale: document.locale,
        score: score(`${document.title} ${document.content}`, input.query)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, ragConfig.maxChunks);
  }
};
