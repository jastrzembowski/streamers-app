import { useEffect } from "react";
import { Link } from "react-router-dom";
import Voting from "./Voting";

interface Props {
  active: boolean;
  streamers: never[];
  getStreamers: () => void;
}

interface Streamer {
  name: string;
  vote: number;
  description: string;
  service: string;
  id: number;
}

export default function List({ active, streamers, getStreamers }: Props) {
  useEffect(() => {
    getStreamers();
  }, [getStreamers]);

  return (
    <div className="list-container">
      {streamers.map((streamer: Streamer) => (
        <div className="list-element" key={streamer.id}>
          <h3>{streamer.name}</h3>
          {!active && <Voting streamer={streamer} />}
          <Link to={`/streamer/${streamer.id}`}>
            <button>See more</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
