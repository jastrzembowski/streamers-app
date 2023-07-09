import { useCallback, useState } from "react";

import "./main.scss";
import Form from "./Form";
import List from "./List";

export default function Main() {
  const [active, setActive] = useState(true);
  const [streamers, setStreamers] = useState([]);

  const getStreamers = useCallback(() => {
     fetch("http://localhost:5000/streamers")
      .then((response) => response.json())
      .then((data) => setStreamers(data))
      .catch((error) => console.log(error));
    }, []);
    
  return (
    <>
      <div className="main-container">
        <div
          className={`main-form ${active ? "active" : ""}`}
          onClick={() => setActive(true)}
        >
          <Form getStreamers={getStreamers}/>
        </div>
        <div
          className={`main-list ${!active ? "active" : ""}`}
          onClick={() => setActive(false)}
        >
          <List active={active} getStreamers={getStreamers} streamers={streamers} />
        </div>
      </div>
    </>
  );
}
