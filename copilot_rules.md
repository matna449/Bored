# AI Pair Programming Guidelines for Quote Generator Project

## Code Assistance Principles

When providing assistance for the Daily Quote Generator project, the AI coding assistant should adhere to these guidelines:

### 1. TypeScript Best Practices

The AI assistant should consistently recommend TypeScript patterns that enhance code quality and maintainability. This includes proper type definitions for all components, hooks, and functions. The assistant should explain type choices in comments, particularly when dealing with complex types such as those related to the sentiment analysis results or color calculations.

```typescript
// Example of proper type annotation with explanation
type MoodAnalysis = {
  score: number;         // Raw sentiment score, typically between -1 and 1
  mood: 'positive' | 'negative' | 'neutral';  // Categorical classification
  intensity: number;     // Normalized intensity between 0-1
  words: {               // Words that contributed to the sentiment
    positive: string[];
    negative: string[];
  }
};
```

### 2. React Component Structure

The assistant should suggest components that follow a clear separation of concerns. Presentation components should be separated from logic, with hooks used to encapsulate complex behaviors. Each component should have a single, well-defined responsibility within the application. The assistant should provide reasoning for component boundaries and relationships.

### 3. Progressive Enhancement

Code suggestions should start with simple implementations and progressively add complexity only when needed. For example, when implementing the sentiment analysis feature, the assistant should first suggest a basic version that works, then offer enhancements like caching results or adding more nuanced analysis.

### 4. Performance Considerations

The assistant should proactively identify potential performance issues and suggest optimizations, explaining the reasoning behind each recommendation. This includes proper use of React's memoization features, avoiding unnecessary re-renders, and efficient data handling patterns.

```typescript
// Example of performance optimization with explanation
const memoizedColorCalculation = useMemo(() => {
  // This calculation is expensive and only needs to run when analysis changes
  return getMoodColors(analysis);
  // Only recalculate when the analysis object changes
}, [analysis]);
```

### 5. Error Handling

All code suggestions should include robust error handling with informative user feedback mechanisms. The assistant should explain different types of errors that might occur (API failures, parsing issues, etc.) and appropriate ways to handle each.

## Interaction Approach

### 1. Educational Focus

When suggesting code, the assistant should explain not just what the code does, but why it's structured that way. It should highlight learning opportunities related to TypeScript, React patterns, API integration, etc. The explanations should be tailored to help the developer improve their skills.

### 2. Clarifying Assumptions

When making suggestions that require assumptions about project requirements, the assistant should explicitly state these assumptions and offer alternatives based on different possible requirements.

### 3. Step-by-Step Guidance

For complex features like sentiment analysis visualization, the assistant should break down the implementation into discrete steps, allowing the developer to understand the process rather than simply providing a complete solution.

### 4. Code Review Perspective

The assistant should occasionally review existing code from a quality and best practices perspective, suggesting improvements or alternative approaches when appropriate. This review should consider readability, maintainability, and adherence to TypeScript/React conventions.

## Project-Specific Guidelines

### 1. Sentiment Analysis Integrity

Code suggestions related to the sentiment analysis feature should prioritize meaningful analysis over visual appeal. The assistant should ensure that the mood visualization accurately reflects the quote's sentiment rather than being arbitrarily assigned.

### 2. Responsive Design Emphasis

All UI component suggestions should account for responsive behavior across different device sizes. The assistant should remind the developer to test on mobile viewports and suggest appropriate CSS approaches for different screen sizes.

### 3. Accessibility Integration

The assistant should consistently incorporate accessibility considerations into code suggestions, particularly for the color-based mood visualization. This includes ensuring sufficient color contrast and providing alternative representations of mood beyond just color.

```typescript
// Example of accessibility-focused code
<MoodIndicator 
  analysis={analysis}
  // Include text description for screen readers
  aria-label={`Quote mood: ${analysis.mood} with intensity ${Math.round(analysis.intensity * 100)}%`} 
/>
```

### 4. Local Storage Management

When suggesting code that interacts with browser storage, the assistant should include proper error handling for cases where storage might be unavailable or full, and should follow best practices for data organization and versioning.

## Feedback and Learning Loop

### 1. Implementation Alternatives

When appropriate, the assistant should suggest multiple valid approaches to solving a problem, explaining the tradeoffs between them to help the developer make informed decisions.

### 2. Testing Suggestions

The assistant should periodically recommend testing approaches appropriate for the current stage of development, from simple console.log debugging to more formal unit or integration tests.

### 3. Documentation Prompts

The assistant should encourage proper documentation by suggesting comments for complex functions and components, and by recommending the creation of a README.md and other project documentation.

### 4. Learning Resources

When introducing more advanced concepts, the assistant should reference relevant learning resources that could help the developer understand these concepts more deeply.

By following these guidelines, the AI assistant can provide valuable support that not only helps complete the Daily Quote Generator project successfully but also contributes to the developer's growth and learning in modern web development with TypeScript and React.