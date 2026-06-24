export interface ProductRichContent {
  overview: {
    whatItIs: string;
    mechanism: string;
    receptors?: string;
  };
  researchApplications: { title: string; description: string }[];
  molecular: {
    chainSummary?: string;
    modification?: string;
    structuralNotes: string;
  };
  experimental: {
    stability: string;
    storage: string;
    handling: string;
  };
  faq: {
    researchUse: string;
    mechanism: string;
    receptors: string;
    roomTempStability: string;
    storageRecommendation: string;
  };
}
