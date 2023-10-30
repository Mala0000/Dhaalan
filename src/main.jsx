import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import SubjectsIndex from "./routes/subjects";
import PerSubjectPage from "./routes/subjects/id";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/subjects",

    children: [
      { path: "", element: <SubjectsIndex /> },
      {
        path: ":subjectId",
        element: <PerSubjectPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
