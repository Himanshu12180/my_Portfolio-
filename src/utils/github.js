/**
 * GitHub API utilities for fetching user repositories
 * Includes fallback for rate limiting and error handling
 */

const GITHUB_API = "https://api.github.com";

export async function fetchRepos(username, perPage = 6) {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?per_page=${perPage}&sort=stars`
    );

    if (!response.ok) {
      // Handle rate limiting
      if (response.status === 403) {
        console.warn("GitHub API rate limited. Showing fallback projects.");
        return null;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    return repos
      .filter((repo) => !repo.fork) // Exclude forks
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "No description",
        url: repo.html_url,
        language: repo.language || "Unknown",
        stars: repo.stargazers_count,
        demo: repo.homepage,
      }));
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return null;
  }
}

export async function fetchGitHubUser(username) {
  try {
    const response = await fetch(`${GITHUB_API}/users/${username}`);

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
}