import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { fetchRepositories, fetchUserProfile, fetchCommitActivity } from "./lib/githubApi";
import { CommitChart } from "./components/commitchart";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
};

type User = {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  followers: number;
  following: number;
  html_url: string;
};

type CommitData = {
  week: number;
  days: number[];
  total: number;
  [key: string]: any;
}[];

function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [commitData, setCommitData] = useState<CommitData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchRepos = async () => {
    if (!username) {
      setError("Please enter a GitHub username");
      return;
    }
    setLoading(true);
    setError("");
    setCommitData(null);
    try {
      const [reposData, userData] = await Promise.all([
        fetchRepositories(username),
        fetchUserProfile(username),
      ]);
      setRepos(reposData);
      setUser(userData);

      if (reposData.length > 0) {
        try {
          const commits = await fetchCommitActivity(username, reposData[0].name);
          if (commits.length > 0) {
            setCommitData(commits);
          }
        } catch (commitError) {
          console.warn("Could not load commit data:", commitError);
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Check username.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFetchRepos()}
          />
          <Button onClick={handleFetchRepos} disabled={loading}>
            {loading ? "Loading..." : "Fetch Data"}
          </Button>
        </CardContent>
      </Card>

      {loading && <p className="mt-4 text-gray-700">Loading...</p>}

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* User Profile Section */}
      {user && (
        <div className="mt-8 w-full max-w-2xl flex flex-col items-center">
          <img
            src={user.avatar_url}
            alt={user.name || user.login}
            className="w-32 h-32 rounded-full mb-4 hover:scale-110 transition"
          />
          <h1 className="text-2xl font-bold">{user.name || user.login}</h1>
          <p className="text-gray-600 text-center">{user.bio}</p>
          <div className="flex gap-4 mt-2 text-gray-700">
            <span>Followers: {user.followers}</span>
            <span>Following: {user.following}</span>
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-500 underline"
          >
            View GitHub Profile
          </a>
        </div>
      )}

      {/* Repo List Section */}
      {repos.length > 0 && (
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-4">Repositories</h2>
          <div className="grid gap-4">
            {repos.map((repo) => (
              <Card key={repo.id} className="p-4 hover:shadow-lg transition">
                <CardContent>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 font-semibold text-lg"
                  >
                    {repo.name}
                  </a>
                  <p className="text-gray-600">{repo.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Commit Chart Section */}
      {commitData && (
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-4">Commit Activity</h2>
          <CommitChart commitData={commitData} />

        </div>
      )}
    </div>
  );
}

export default App;
