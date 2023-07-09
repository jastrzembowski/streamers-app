import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./details.scss";

interface Streamer {
  name?: string;
  description?: String;
  service?: String;
  vote?: number;
  id?: number;
}

export default function Details() {
  const { id } = useParams();
  const [streamer, setStreamer] = useState<Streamer>({});
  const [voteCount, setVoteCount] = useState<number>(streamer.vote || 0);

  const fetchStreamer = (id: string | undefined) => {
    fetch(`http://localhost:5000/streamer/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStreamer(data);
        setVoteCount(data.vote);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchStreamer(id);
  }, [id]);

  const voteStreamer = (vote: string) => {
    fetch(`http://localhost:5000/streamers/${id}/${vote}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="details-container">
        <div className="details-box">
          <Link to="/" className="details-box__back">
            <AiOutlineArrowLeft /> Back to all streamers
          </Link>
          <img
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"
            alt="streamer profile"
          ></img>
          <h1>{streamer.name}</h1>
          <p>{streamer.description}</p>
          <div className="votes-box">
            <BsFillHandThumbsDownFill
              onClick={() => {
                voteStreamer("downvote");
                setVoteCount(voteCount - 1);
              }}
            />
            <h3>{voteCount}</h3>
            <BsFillHandThumbsUpFill
              onClick={() => {
                voteStreamer("upvote");
                setVoteCount(voteCount + 1);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
