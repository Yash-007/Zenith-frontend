# Zenith

A personal growth platform that gamifies self-improvement through daily challenges, progress tracking, and real rewards.

## What is Zenith?

Zenith helps people build better habits by completing challenges across different areas of life—from physical wellness to skill development. Users earn points for their achievements and can redeem them for real money via UPI.

## Features

**Challenges**
- Browse 60+ curated challenges across multiple categories
- Submit custom challenges for activities not on the platform
- Three difficulty levels: Beginner, Intermediate, and Advanced
- Track submission status in real-time

**Rewards**
- Earn 80-100 points per completed challenge
- Redeem 3,000 points for ₹200 via UPI
- Maintain daily streaks for bonus multipliers
- View complete reward history

**AI Coach**
- Get advice on your personal growth journey
- Ask questions about platform features
- Access curated articles on personal development
- Receive insights on your progress

**Progress Tracking**
- Activity heatmap showing submission patterns
- Detailed statistics on points, streaks, and completions
- User levels that increase with activity
- Comprehensive personal dashboard

**Leaderboard**
- Compare your progress with other users
- Filter by age range and city
- Quick rank lookup

## Tech Stack

**Frontend**
- React 19
- Vite
- Redux Toolkit
- React Router v7
- Tailwind CSS
- Axios
- React Hot Toast
- React Calendar Heatmap

**Backend**
- Node.js + TypeScript + Express
- PostgreSQL + Prisma ORM
- Razorpay (Payments)
- Google Gemini (AI Chat)
- Redis (Caching)

## Getting Started

### Requirements
- Node.js v16 or higher
- Backend API (see [backend repository](https://github.com/Yash-007/Zenith-backend))

### Installation

Clone the repository:
```bash
git clone https://github.com/Yash-007/Zenith-frontend.git
cd Zenith-frontend
```

Install dependencies:
```bash
npm install
```

Configure the API endpoint in `src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // local
  // baseURL: 'https://zenith-backend-z8ig.onrender.com/api/v1', // production
});
```

Start the development server:
```bash
npm run dev
```

The app runs at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Output will be in the `dist` folder.

## Project Structure

```
src/
├── components/
│   ├── features/          # Feature-specific components
│   └── layout/            # Header and layout
├── hooks/                 # Custom hooks
├── pages/                 # Page components
│   ├── auth/             # Login and registration
│   ├── challenges/       # Challenge browsing and details
│   ├── coach/            # AI coach interface
│   ├── home/             # Landing page
│   ├── leaderboard/      # Rankings
│   ├── profile/          # User profile
│   ├── rewards/          # Reward redemption
│   └── submissions/      # Submission details
├── services/             # API service layer
├── store/                # Redux state management
└── utils/                # Utilities
```

## How It Works

### Challenge Categories
Challenges are organized into interests:
- Physical Wellness
- Mental Fitness
- Social Impact
- Skill Development
- Financial Wellness
- Personal Growth

Users select interests during registration and can filter challenges accordingly.

### Submission Process
1. Choose a challenge or create a custom submission
2. Write a description of what you did
3. Upload photos as proof
4. Wait for review (typically 24-48 hours)
5. Receive points when approved

### Redemption Process
1. Accumulate 3,000 points minimum
2. Go to Rewards page
3. Enter your UPI ID
4. Money is transferred within 24-48 hours

Redemption is capped at 3,000 points per transaction.

## Authentication

The platform uses JWT token-based authentication. Tokens are stored in localStorage and automatically included in API requests. Protected routes redirect to login if the token is missing or expired.

## API Configuration

The frontend expects the following backend endpoints:
- `/api/v1/user/*` - User management
- `/api/v1/challenge/*` - Challenge operations
- `/api/v1/submission/*` - Submission handling
- `/api/v1/reward/*` - Reward redemption
- `/api/v1/chat/*` - AI coach interactions
- `/api/v1/category/*` - Category data

See `src/services/api.js` for the complete API interface.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## Links

- Backend: [github.com/Yash-007/Zenith-backend](https://github.com/Yash-007/Zenith-backend)

## License

This is a personal project for educational purposes.
