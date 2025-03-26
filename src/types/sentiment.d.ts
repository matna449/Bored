declare module 'sentiment' {
  export interface SentimentResult {
    score: number;
    comparative: number;
    positive: string[];
    negative: string[];
  }

  export default class Sentiment {
    analyze(text: string): SentimentResult;
  }
}
