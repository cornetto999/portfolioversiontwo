# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d1fd8837-4cd6-4300-9ccf-dcf744a62d02

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d1fd8837-4cd6-4300-9ccf-dcf744a62d02) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## GitHub API Integration

This portfolio automatically fetches GitHub statistics to display your coding languages and repository information. However, GitHub's API has rate limits:

- **Without authentication**: 60 requests per hour
- **With authentication**: 5000 requests per hour

### Handling Rate Limits

The app includes intelligent fallback handling:

1. **Automatic Fallback**: When rate limited, the app automatically switches to fallback data
2. **No Console Errors**: Rate limit errors are handled gracefully without cluttering the console
3. **Persistent Skip**: Once rate limited, the app remembers to use fallback data for the session

### Optional: Using GitHub Token

To get higher rate limits, create a `.env` file in the project root:

```bash
VITE_GITHUB_TOKEN=your_github_token_here
```

Get your token from: https://github.com/settings/tokens

### Development Commands

- **Re-enable GitHub API**: Run `clearGitHubSkip()` in browser console
- **Check API Status**: The app will show fallback data when GitHub API is unavailable

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d1fd8837-4cd6-4300-9ccf-dcf744a62d02) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
