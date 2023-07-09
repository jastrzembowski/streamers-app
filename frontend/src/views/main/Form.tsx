import { useForm } from "react-hook-form";

interface Props {
  getStreamers: () => void;
}

export default function Form({ getStreamers }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addStreamer = (data: {}) => {
    fetch("http://localhost:5000/streamers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, vote: 0 }),
    })
      .then((response) => response.json())
      .then(() => {
        getStreamers();
        reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>
        Streamer <br />
        Submission Form
      </h1>
      <form onSubmit={handleSubmit(addStreamer)}>
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        {errors.name && <p className="error">Name is required</p>}

        <select {...register("service", { required: true })}>
          <option value="" selected disabled hidden>
            Choose service
          </option>
          <option value="Twitch">Twitch</option>
          <option value="YouTube">YouTube</option>
          <option value="TikTok">TikTok</option>
          <option value="Kick">Kick</option>
          <option value="Rumble">Rumble</option>
        </select>
        {errors.service && <p className="error">Service is required</p>}

        <textarea
          maxLength={4000}
          minLength={30}
          placeholder="Add description"
          {...register("description", { required: true, minLength: 30 })}
        />
        {errors.description && (
          <p className="error">
            Description is required and should be at least 30 characters long
          </p>
        )}

        <button type="submit">Add streamer</button>
      </form>
    </>
  );
}
