import { useState } from "react";
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";

interface Props {
  streamer: {
    name: string;
    vote: number;
    description: string;
    service: string;
    id: number;
  };
}

export default function Voting({ streamer }: Props) {
  const [voteCount, setVoteCount] = useState<number>(streamer.vote || 0);

  const voteStreamer = (vote: string, id: number) => {
    fetch(`http://localhost:5000/streamers/${id}/${vote}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setVoteCount(data.vote);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="votes-box">
      <p>Vote streamer:</p>
      <BsFillHandThumbsDownFill
        onClick={() => {
          voteStreamer("downvote", streamer.id);
          setVoteCount(voteCount - 1);
        }}
      />
      <h4>{voteCount}</h4>
      <BsFillHandThumbsUpFill
        onClick={() => {
          voteStreamer("upvote", streamer.id);
          setVoteCount(voteCount + 1);
        }}
      />
    </div>
  );
}
