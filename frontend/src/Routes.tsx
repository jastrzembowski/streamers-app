import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Details from "./views/details/Details";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "streamer/:id", element: <Details /> },
  { path: "*", element: <Navigate replace to="/" /> },
]);
export default router;
