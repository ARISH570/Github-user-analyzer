import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
};

function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await response.json();
      setRepos(data);
    } catch (error) {
      console.error("Error fetching repos:", error);
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
          <Button onClick={fetchRepos}>Fetch Repos</Button>
        </CardContent>
      </Card>

      {loading && <p className="mt-4">Loading...</p>}

      {repos.length > 0 && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Repositories</h2>
          {repos.map((repo) => (
            <Card key={repo.id} className="mb-4">
              <CardContent className="p-4">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {repo.name}
                </a>
                <p className="text-gray-600">{repo.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
