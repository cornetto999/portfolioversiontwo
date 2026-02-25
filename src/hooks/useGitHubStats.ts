import { useEffect, useState } from 'react';

interface GitHubLanguage {
  name: string;
  percentage: number;
  color: string;
}

interface GitHubStats {
  languages: GitHubLanguage[];
  totalRepos: number;
  totalStars: number;
  isLoading: boolean;
  error: string | null;
}

export const useGitHubStats = (username: string) => {
  const [stats, setStats] = useState<GitHubStats>({
    languages: [],
    totalRepos: 0,
    totalStars: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      if (!username) {
        setStats((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Missing GitHub username.',
        }));
        return;
      }

      try {
        setStats((prev) => ({ ...prev, isLoading: true, error: null }));

        const headers: HeadersInit = {
          Accept: 'application/vnd.github+json',
        };

        const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
        if (githubToken) {
          headers.Authorization = `token ${githubToken}`;
        }

        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
          { headers }
        );

        if (!reposResponse.ok) {
          if (reposResponse.status === 403) {
            throw new Error('GitHub API rate limit reached. Try again later or set VITE_GITHUB_TOKEN.');
          }
          if (reposResponse.status === 404) {
            throw new Error('GitHub user not found.');
          }
          throw new Error(`GitHub API error (${reposResponse.status}).`);
        }

        const repos = (await reposResponse.json()) as Array<{
          name: string;
          stargazers_count: number;
          fork: boolean;
        }>;

        const ownRepos = repos.filter((repo) => !repo.fork);
        const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

        const languageBytes: Record<string, number> = {};
        let totalBytes = 0;

        await Promise.all(
          ownRepos.map(async (repo) => {
            const langResponse = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/languages`,
              { headers }
            );

            if (!langResponse.ok) {
              return;
            }

            const repoLanguages = (await langResponse.json()) as Record<string, number>;
            Object.entries(repoLanguages).forEach(([lang, bytes]) => {
              languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
              totalBytes += bytes;
            });
          })
        );

        const languages = totalBytes
          ? Object.entries(languageBytes)
              .map(([name, bytes]) => ({
                name,
                percentage: Number(((bytes / totalBytes) * 100).toFixed(1)),
                color: getLanguageColor(name),
              }))
              .sort((a, b) => b.percentage - a.percentage)
              .slice(0, 10)
          : [];

        setStats({
          languages,
          totalRepos: ownRepos.length,
          totalStars,
          isLoading: false,
          error: totalBytes === 0 ? 'Language data unavailable. Repo stats loaded.' : null,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unable to fetch GitHub stats.';
        setStats({
          languages: [],
          totalRepos: 0,
          totalStars: 0,
          isLoading: false,
          error: errorMessage,
        });
      }
    };

    fetchGitHubStats();
  }, [username]);

  return stats;
};

const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3776ab',
    Java: '#f89820',
    'C#': '#239120',
    PHP: '#777bb4',
    Go: '#00add8',
    Rust: '#dea584',
    'C++': '#00599c',
    C: '#a8b9cc',
    HTML: '#e34f26',
    CSS: '#1572b6',
    SCSS: '#cf649a',
    Sass: '#cf649a',
    Less: '#1d365d',
    Vue: '#4fc08d',
    React: '#61dafb',
    Angular: '#dd0031',
    'Node.js': '#339933',
    Dart: '#0175c2',
    Flutter: '#02569b',
    Swift: '#fa7343',
    Kotlin: '#7f52ff',
    Ruby: '#cc342d',
    R: '#276dc3',
    Scala: '#dc322f',
    Haskell: '#5d4f85',
    Clojure: '#5881d8',
    Elixir: '#6e4a7e',
    Erlang: '#a90533',
    Lua: '#000080',
    Perl: '#39457e',
    Shell: '#89e051',
    PowerShell: '#5391fe',
    Dockerfile: '#384d54',
    YAML: '#cb171e',
    JSON: '#000000',
    Markdown: '#083fa1',
    SQL: '#336791',
    'PL/pgSQL': '#336791',
    Assembly: '#6e4c13',
    MATLAB: '#e16737',
    'Objective-C': '#438eff',
    Groovy: '#4298b8',
    Julia: '#a270ba',
    Nim: '#ffc200',
    Crystal: '#000100',
    'F#': '#b845fc',
    OCaml: '#3be133',
    Prolog: '#74283c',
    Tcl: '#e4cc98',
    'Vim script': '#199f4b',
    'Emacs Lisp': '#c065db',
    'Common Lisp': '#3fb68b',
    Scheme: '#1e4a72',
    Racket: '#3c5caa',
    D: '#ba595e',
  };

  return colors[language] || '#6b7280';
};
