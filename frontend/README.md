# ALEX.DEV Portfolio — React/Vite

This project is a React/Vite reconstruction of the supplied ALEX.DEV portfolio design. The page remains a single scrolling experience; each visual section is a reusable React component.

## Run

```bash
npm install
npm run dev
```

Create `.env` from `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_GITHUB_USERNAME=your-github-username
```

## Architecture

- `src/components/layout` — navbar, mobile drawer, footer
- `src/components/sections` — Hero, About, Skills, Featured Case, Projects, Experience, Achievements, Contact
- `src/components/common` — reusable UI primitives
- `src/hooks` — scroll behavior and API data hooks
- `src/services` — all external API access lives here
- `src/data/fallbackData.js` — temporary local data used when portfolio API is unavailable
- `src/config/env.js` — environment configuration
- `src/styles/globals.css` — global design tokens and base rules

## Expected backend API

Recommended endpoints:

| Method | Endpoint | UI use |
|---|---|---|
| GET | `/api/profile` | Hero, About, social links, contact metadata |
| GET | `/api/skills` | Skills grid + filtering |
| GET | `/api/featured-project` | Featured case study |
| GET | `/api/projects` | Projects archive + search/filter |
| GET | `/api/experience` | Experience timeline |
| GET | `/api/achievements` | Certifications / achievements |
| POST | `/api/contact` | Contact form submission |

### Suggested response shapes

`GET /api/profile`

```json
{
  "name": "Krishna Kumar",
  "role": "Backend / Full-Stack Developer",
  "eyebrow": "AVAILABLE FOR OPPORTUNITIES",
  "initEnv": "production",
  "node": "us-west-2",
  "bio": "...",
  "about": [],
  "stats": [],
  "social": { "github": "...", "linkedin": "...", "email": "mailto:..." },
  "contact": { "email": "...", "location": "...", "pgp": "...", "sla": "..." }
}
```

`POST /api/contact`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "backend",
  "message": "Project requirements..."
}
```

The frontend currently falls back to local data for public portfolio content so the UI remains usable before the backend is connected. Contact does **not** fake success: it calls `POST /api/contact` and reports failure when the API is unavailable.

## GitHub

GitHub public profile/repository information is fetched directly from GitHub in `src/services/githubService.js`. For a production application, proxy this through your backend if you need server-side caching, rate-limit protection, or contribution-history aggregation.

## Important

The supplied HTML used a temporary remote profile image. The Hero keeps that source URL and has an avatar fallback if it fails. Replace it with your real image under `src/assets/` when you have it.
