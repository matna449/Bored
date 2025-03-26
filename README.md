# Daily Quote & Mood Generator

A web application that provides daily inspirational quotes with mood analysis and visualization.

## Features

- Fetches a new inspirational quote each day
- Performs sentiment analysis on quotes to determine mood
- Visualizes mood with color gradients and indicators
- Allows saving favorite quotes
- Tracks quote history
- Responsive design for all devices
- Accessibility features for all users

## Technologies Used

- React for UI components
- TypeScript for type safety
- Sentiment.js for mood analysis
- Styled Components for styling
- Axios for API requests
- Local Storage for data persistence

## Getting Started

### Prerequisites
- Node.js (v14 or newer) and npm installed
- Git (for cloning the repository)

### Installation
1. Clone the repository (if you haven't already):
   ```bash
   git clone <repository-url>
   cd Bored
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

4. Visit `localhost:3000` in your browser to see the application

### Troubleshooting
- If you encounter any package errors, try `npm clean-install`
- For port conflicts, you can specify a different port: `PORT=3001 npm start`

## API

This project uses the [Quotable API](https://github.com/lukePeavey/quotable) for retrieving random quotes.

## License

MIT

## Notes

I was bored at March 26 2025, so I made this.
