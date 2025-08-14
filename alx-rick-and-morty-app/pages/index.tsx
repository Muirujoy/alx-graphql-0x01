import { useEffect, useState } from "react";

interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

export default function Home() {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEpisode() {
      try {
        const response = await fetch("https://rickandmortyapi.com/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                episode(id: 1) {
                  id
                  name
                  air_date
                  episode
                }
              }
            `,
          }),
        });

        const data = await response.json();
        setEpisode(data.data.episode);
      } catch (error) {
        console.error("Error fetching episode:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisode();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Episode Details</h1>
      {episode ? (
        <div className="border rounded-lg p-4 shadow-md bg-white">
          <p><strong>ID:</strong> {episode.id}</p>
          <p><strong>Name:</strong> {episode.name}</p>
          <p><strong>Air Date:</strong> {episode.air_date}</p>
          <p><strong>Episode:</strong> {episode.episode}</p>
        </div>
      ) : (
        <p>No episode found.</p>
      )}
    </div>
  );
}
