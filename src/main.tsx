import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { CreateTrip } from "./pages/CreateTrip";
import { TripDetails } from "./pages/TripDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTrip/>,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetails/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);