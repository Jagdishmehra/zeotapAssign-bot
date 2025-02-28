import { getAllDocuments } from "./docProcessor";

const helpText = `
I can help you with questions about these Customer Data Platforms (CDPs):
- Segment
- mParticle
- Lytics
- Zeotap

Try asking how to perform specific tasks, like:
- "How do I set up a new source in Segment?"
- "How can I create a user profile in mParticle?"
- "How do I build an audience segment in Lytics?"
- "How can I integrate my data with Zeotap?"

You can also ask for comparisons between platforms!
`;

// Detect if query is seeking a comparison between platforms
const isComparisonQuery = (query) => {
  const comparisonKeywords = [
    "compare",
    "comparison",
    "versus",
    "vs",
    "difference",
    "similar",
    "better",
  ];
  const platformMentions = ["segment", "mparticle", "lytics", "zeotap"].filter(
    (p) => query.toLowerCase().includes(p)
  );

  // Check if query has comparison keywords and mentions at least two platforms
  return (
    comparisonKeywords.some((keyword) =>
      query.toLowerCase().includes(keyword)
    ) && platformMentions.length >= 2
  );
};

// Detect if query is about a specific platform
const detectPlatform = (query) => {
  const platforms = {
    segment: ["segment"],
    mparticle: ["mparticle", "mparticle"],
    lytics: ["lytics"],
    zeotap: ["zeotap"],
  };

  for (const [platform, keywords] of Object.entries(platforms)) {
    if (keywords.some((keyword) => query.toLowerCase().includes(keyword))) {
      return platform;
    }
  }
  return null;
};

// Check if query is a how-to question
const isHowToQuery = (query) => {
  const howToPatterns = [
    "how to",
    "how do i",
    "how can i",
    "how would i",
    "steps to",
    "guide for",
    "process of",
    "procedure for",
  ];

  return howToPatterns.some((pattern) => query.toLowerCase().includes(pattern));
};

// Check if query is off-topic or irrelevant
const isIrrelevantQuery = (query) => {
  const cdpKeywords = [
    "cdp",
    "customer data platform",
    "segment",
    "mparticle",
    "lytics",
    "zeotap",
    "data",
    "integration",
    "audience",
    "profile",
    "source",
    "destination",
  ];

  // Check if query contains at least one CDP-related keyword
  return !cdpKeywords.some((keyword) => query.toLowerCase().includes(keyword));
};

export const processQuery = async (query, docIndex) => {
  if (!query.trim()) {
    return helpText;
  }

  // Handle irrelevant queries
  if (isIrrelevantQuery(query)) {
    return "I'm a CDP support assistant focusing on Segment, mParticle, Lytics, and Zeotap. Please ask me questions related to these platforms.";
  }

  try {
    let results = [];
    let response = "";

    // Handle comparison queries specifically
    if (isComparisonQuery(query)) {
      results = docIndex.search.search("platform:comparison");
    }
    // Handle platform-specific how-to questions
    else if (isHowToQuery(query)) {
      const platform = detectPlatform(query);
      if (platform) {
        // Search for the query within the specific platform
        results = docIndex.search.search(`${query} platform:${platform}`);
      } else {
        // If no specific platform detected, search across all platforms
        results = docIndex.search.search(query);
      }
    } else {
      // General query
      results = docIndex.search.search(query);
    }

    if (results.length === 0) {
      return "I couldn't find specific information about that. Could you try rephrasing your question or be more specific about which CDP you're asking about?";
    }

    // Get the top result
    const topResult = docIndex.documents[results[0].ref];

    if (isComparisonQuery(query)) {
      response = `## ${topResult.title}\n\n${topResult.content}`;
    } else {
      response = `## ${topResult.title}\n\n${topResult.content}\n\n_Platform: ${
        topResult.platform.charAt(0).toUpperCase() + topResult.platform.slice(1)
      }_`;
    }

    return response;
  } catch (error) {
    console.error("Error processing query:", error);
    return "I encountered an error while trying to answer your question. Please try again.";
  }
};
