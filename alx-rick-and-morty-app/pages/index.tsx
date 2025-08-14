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

  if (loading) return <p className="p-4">Loading...<
