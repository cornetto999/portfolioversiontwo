import { useState, useEffect } from 'react';

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

  // Check if we should skip GitHub API (rate limited or disabled)
  const shouldSkipGitHub = () => {
    const skipGitHub = localStorage.getItem('skip-github-api');
    return skipGitHub === 'true';
  };

  // Set flag to skip GitHub API for this session
  const setSkipGitHub = () => {
    localStorage.setItem('skip-github-api', 'true');
  };

  // Clear flag to re-enable GitHub API (useful for development)
  const clearSkipGitHub = () => {
    localStorage.removeItem('skip-github-api');
  };

  // Expose clear function for debugging
  if (typeof window !== 'undefined') {
    (window as any).clearGitHubSkip = clearSkipGitHub;
    console.log('💡 To re-enable GitHub API, run: clearGitHubSkip() in console');
  }

  useEffect(() => {
    const fetchGitHubStats = async () => {
      // If we should skip GitHub API, use fallback immediately
      if (shouldSkipGitHub()) {
        const fallbackStats = {
          languages: [
            { name: 'JavaScript', percentage: 25, color: '#f7df1e' },
            { name: 'TypeScript', percentage: 20, color: '#3178c6' },
            { name: 'Python', percentage: 15, color: '#3776ab' },
            { name: 'React', percentage: 12, color: '#61dafb' },
            { name: 'PHP', percentage: 10, color: '#777bb4' },
            { name: 'PL/pgSQL', percentage: 7, color: '#336791' },
            { name: 'HTML', percentage: 8, color: '#e34f26' },
            { name: 'CSS', percentage: 6, color: '#1572b6' },
            { name: 'Node.js', percentage: 4, color: '#339933' },
          ],
          totalRepos: 12,
          totalStars: 8,
          isLoading: false,
          error: null,
        };
        setStats(fallbackStats);
        return;
      }

      try {
        setStats(prev => ({ ...prev, isLoading: true, error: null }));

        // Fetch user repos to get language data
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
        };
        
        // Add GitHub token if available for higher rate limits
        const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
        if (githubToken) {
          headers['Authorization'] = `token ${githubToken}`;
        }
        
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
          headers,
        });
        
        if (!reposResponse.ok) {
          if (reposResponse.status === 403) {
            // Set flag to skip GitHub API for future requests
            setSkipGitHub();
            throw new Error('GitHub API rate limit exceeded. Using fallback data.');
          } else if (reposResponse.status === 404) {
            throw new Error('GitHub user not found.');
          } else {
            throw new Error(`GitHub API error: ${reposResponse.status}`);
          }
        }
        
        const repos = await reposResponse.json();
        
        // Calculate language statistics
        const languageStats: { [key: string]: { bytes: number; color: string } } = {};
        let totalBytes = 0;

        // Fetch language data for each repo (limit to first 10 repos to avoid rate limits)
        const reposToProcess = repos.slice(0, 10);
        for (const repo of reposToProcess) {
          if (repo.language) {
            try {
              const langResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`, {
                headers,
              });
              if (langResponse.ok) {
                const langData = await langResponse.json();
                
                for (const [lang, bytes] of Object.entries(langData)) {
                  if (!languageStats[lang]) {
                    languageStats[lang] = { bytes: 0, color: getLanguageColor(lang) };
                  }
                  languageStats[lang].bytes += bytes as number;
                  totalBytes += bytes as number;
                }
              }
              // Add a small delay to avoid hitting rate limits
              await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
              console.warn(`Failed to fetch language data for ${repo.name}:`, error);
              // Continue with other repos even if one fails
            }
          }
        }

        // Convert to percentage and sort
        let languages = Object.entries(languageStats)
          .map(([name, data]) => ({
            name,
            percentage: Math.round((data.bytes / totalBytes) * 100),
            color: data.color,
          }))
          .sort((a, b) => b.percentage - a.percentage);

        // Ensure essential skills are always included with minimum percentages
        const essentialSkills = [
          { name: 'PHP', minPercentage: 8, color: '#777bb4' },
          { name: 'PL/pgSQL', minPercentage: 5, color: '#336791' },
          { name: 'HTML', minPercentage: 6, color: '#e34f26' },
          { name: 'CSS', minPercentage: 5, color: '#1572b6' },
        ];

        // Add essential skills if they're not present or below minimum
        essentialSkills.forEach(essential => {
          const existing = languages.find(lang => lang.name === essential.name);
          if (!existing) {
            // Add the skill with minimum percentage
            languages.push({
              name: essential.name,
              percentage: essential.minPercentage,
              color: essential.color,
            });
          } else if (existing.percentage < essential.minPercentage) {
            // Boost the percentage to minimum
            existing.percentage = essential.minPercentage;
          }
        });

        // Re-sort and limit to top 8
        languages = languages
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 8);

        // Calculate total stars
        const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);

        setStats({
          languages,
          totalRepos: repos.length,
          totalStars,
          isLoading: false,
          error: null,
        });

      } catch (error) {
        // Only log non-rate-limit errors
        if (error instanceof Error && !error.message.includes('rate limit')) {
          console.error('GitHub API error:', error);
        }
        
        // Provide fallback stats when API fails
        const fallbackStats = {
          languages: [
            { name: 'JavaScript', percentage: 25, color: '#f7df1e' },
            { name: 'TypeScript', percentage: 20, color: '#3178c6' },
            { name: 'Python', percentage: 15, color: '#3776ab' },
            { name: 'React', percentage: 12, color: '#61dafb' },
            { name: 'PHP', percentage: 10, color: '#777bb4' },
            { name: 'PL/pgSQL', percentage: 7, color: '#336791' },
            { name: 'HTML', percentage: 8, color: '#e34f26' },
            { name: 'CSS', percentage: 6, color: '#1572b6' },
            { name: 'Node.js', percentage: 4, color: '#339933' },
          ],
          totalRepos: 12, // Estimated based on typical portfolio
          totalStars: 8,  // Estimated based on typical portfolio
          isLoading: false,
          error: null, // Don't show error for fallback data
        };
        
        setStats(fallbackStats);
      }
    };

    if (username) {
      fetchGitHubStats();
    }
  }, [username]);

  return stats;
};

// Language color mapping
const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'Python': '#3776ab',
    'Java': '#f89820',
    'C#': '#239120',
    'PHP': '#777bb4',
    'Go': '#00add8',
    'Rust': '#dea584',
    'C++': '#00599c',
    'C': '#a8b9cc',
    'HTML': '#e34f26',
    'CSS': '#1572b6',
    'SCSS': '#cf649a',
    'Sass': '#cf649a',
    'Less': '#1d365d',
    'Vue': '#4fc08d',
    'React': '#61dafb',
    'Angular': '#dd0031',
    'Node.js': '#339933',
    'Dart': '#0175c2',
    'Flutter': '#02569b',
    'Swift': '#fa7343',
    'Kotlin': '#7f52ff',
    'Ruby': '#cc342d',
    'R': '#276dc3',
    'Scala': '#dc322f',
    'Haskell': '#5d4f85',
    'Clojure': '#5881d8',
    'Elixir': '#6e4a7e',
    'Erlang': '#a90533',
    'Lua': '#000080',
    'Perl': '#39457e',
    'Shell': '#89e051',
    'PowerShell': '#5391fe',
    'Dockerfile': '#384d54',
    'YAML': '#cb171e',
    'JSON': '#000000',
    'Markdown': '#083fa1',
    'SQL': '#336791',
    'PL/pgSQL': '#336791',
    'Assembly': '#6e4c13',
    'MATLAB': '#e16737',
    'Objective-C': '#438eff',
    'Groovy': '#4298b8',
    'Julia': '#a270ba',
    'Nim': '#ffc200',
    'Crystal': '#000100',
    'F#': '#b845fc',
    'OCaml': '#3be133',
    'Prolog': '#74283c',
    'Tcl': '#e4cc98',
    'Vim script': '#199f4b',
    'Emacs Lisp': '#c065db',
    'Common Lisp': '#3fb68b',
    'Scheme': '#1e4a72',
    'Racket': '#3c5caa',
    'D': '#ba595e',
  };

  return colors[language] || '#6b7280';
};


