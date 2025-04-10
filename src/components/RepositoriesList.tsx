type Repository = {
    id: number;
    name: string;
    html_url: string;
  };
  
  type RepositoriesListProps = {
    repositories: Repository[];
  };
  
  export function RepositoriesList({ repositories }: RepositoriesListProps) {
    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Repositories</h3>
        <ul>
          {repositories.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // src/components/RepositoriesList.tsx

export {};
