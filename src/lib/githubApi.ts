export async function fetchRepositories(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }
  const data = await response.json();
  return data;
}

export async function fetchUserProfile(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  const data = await response.json();
  return data;
}
// src/lib/githubApi.ts
export async function fetchCommitActivity(username: string, repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repo}/stats/commit_activity`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch commit activity');
  }
  return response.json();
}