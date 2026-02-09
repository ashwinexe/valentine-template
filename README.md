# Valentine Week Template

A Valentine Week website you can customize for your loved one. Features daily unlocking love letters, a terminal animation, a couples quiz, and optional Firebase integration.

Built with Next.js 16, React 19, and Tailwind CSS 4.

## Quick Start

1. Click **"Use this template"** on GitHub (or fork this repo)
2. Clone your new repo
3. Edit `packages/web/src/lib/config.ts` with your names
4. Edit `packages/web/src/lib/data.ts` with your messages, quiz questions, and letters
5. (Optional) Add your photos to `packages/web/public/letters/`
6. Deploy to Vercel

## Setup

```bash
# Install dependencies
npm install

# Run locally
cd packages/web
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Customization

### 1. Basic Config (`config.ts`)

Edit `packages/web/src/lib/config.ts`:

- **senderName** — your name (shown in footer)
- **recipientName** — your partner's name (shown in hero)
- **recipientPronoun** — He / She / They (shown under letter replies)
- **year** — the year for Valentine Week dates
- **siteUrl** — your deployed URL
- **cliCommand** — the npx command for your CLI package

### 2. Content (`data.ts`)

Edit `packages/web/src/lib/data.ts`:

- **Timeline** — one message per day (Feb 7–14)
- **Terminal** — daily messages shown in the terminal animation
- **Quiz** — couple trivia questions with answers and feedback
- **Letters** — daily love letters with optional photo attachments

### 3. Photos

Place photos in `packages/web/public/letters/` named like:

```
rose-day.jpeg
propose-day.jpeg
chocolate-day.jpeg
teddy-day.jpeg
promise-day.jpeg
hug-day.jpeg
kiss-day.jpeg
valentine-day.jpeg
```

Then reference them in `data.ts`:

```ts
{ date: "2026-02-07", day: "Rose Day", photo: "/letters/rose-day.jpeg", letter: "..." }
```

### 4. Password Protection (Optional)

Set `SITE_PASSWORD` in your `.env.local` to require a password to view the site. Share the password with your partner.

```
SITE_PASSWORD=our-secret
```

Leave it empty or unset for a public site.

### 5. Firebase (Optional)

For reply persistence across devices:

1. Create a free Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable **Realtime Database**
3. Copy your credentials to `.env.local` (see `.env.local.example`)

Without Firebase, replies save to the browser's localStorage — the site works perfectly fine either way.

### 6. CLI Package (Optional)

The `packages/valentine-cli/` folder contains a terminal tool that shows a heart animation and daily messages. Customize messages in `src/messages.js` and the URL in `src/index.js`.

To publish your own:

```bash
cd packages/valentine-cli
# Update the name in package.json to something unique
npm publish
```

## Deploy

Push to GitHub and import in [Vercel](https://vercel.com). Set the root directory to `packages/web` and add your env vars in the Vercel dashboard.

## Date System

Content unlocks progressively from Feb 7 (Rose Day) to Feb 14 (Valentine's Day). The year is configured in `config.ts`. To preview all content during development, temporarily set the year to a past year.

## License

MIT
