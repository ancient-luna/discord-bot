# Ancient Luna Bot

<p align="center">
  <img src="https://cdn.discordapp.com/avatars/839380589508558910/3c9a9d7846a724afa359b581024315d9.webp?size=128" alt="Ancient Luna Bot" width="128" height="128">
</p>

<p align="center">
  우리는 마치 달을 만난 것처럼 달렸다
</p>

---

## 🌙 About

Ancient Luna Bot is a powerful Discord bot designed to enhance your server with utility, moderation, entertainment, and community engagement features. Born from the ancient wisdom of Dae, this relic traverses the digital cosmos to bring harmony and functionality to Discord communities.

## Features

- **Utility Commands** - Helpful tools for everyday Discord use
- **Moderation Tools** - Keep your server safe and organized
- **Entertainment** - Fun commands to engage your community
- **Community Engagement** - Systems for suggestions, tickets, and confessions
- **Scheduled Reminders** - Never forget important events
- **Role Management** - Automated role synchronization
- **External Integrations** - Connect with Spotify, MyAnimeList, and more

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js v20.x
- npm (comes with Node.js)
- Git

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Daeva/ancient-luna-bot.git

# Navigate to the project directory
cd ancient-luna-bot

# Install dependencies
npm install
```

### 3. Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Discord bot token
```

### 4. Environment Variables
- `DISCORD_TOKEN` - Your Discord bot token (required)
- `DATABASE_PATH` - Path to the SQLite database file (optional, defaults to `./database.sqlite`)

## Starting the Bot
```bash
npm run start
```

The bot will be available at http://localhost:8080 (web server endpoint).

## ☁️ Cloud Deployment

### DigitalOcean App Platform
The bot works seamlessly with DigitalOcean's App Platform. Simply:
1. Connect your GitHub repository
2. Set your `DISCORD_TOKEN` in the environment variables
3. Deploy!

Optional environment variable for custom database path:
```
DATABASE_PATH=./data/database.sqlite
```

## 🧙 Commands

The bot features a wide array of commands organized into categories:
- **General** - Utility and information commands
- **Fun** - Entertainment and playful interactions
- **Moderator** - Server management tools using Discord AutoModerator
- **Game-specific utilities** - For Black Desert Online and Dead Frontier
- *and more ..*

## 🛡️ Security

- All tokens are stored in environment variables
- Regular security audits through `npm audit`
- Minimal dependency footprint for reduced attack surface

## 🤝 Support

For issues, feature requests, or questions, please visit our [Discord Server](https://discord.gg/Sbp2nt8QHe).