// Declaraciones de tipos globales para herramientas de analytics

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: {
        page_path?: string;
        page_title?: string;
        page_location?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        currency?: string;
        transaction_id?: string;
        items?: Array<{
          item_id: string;
          item_name: string;
          item_category: string;
          price: number;
          quantity?: number;
          currency: string;
        }>;
      }
    ) => void;
    dataLayer: any[];
  }
}

export {};
