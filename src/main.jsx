import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import axios from "axios";

import App from "./App";
import SubjectsIndex from "./routes/subjects";
import PerSubjectPage from "./routes/subjects/id";
import { token } from "./utils/airtable";

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

axios.defaults.baseURL = "https://api.airtable.com/v0/applRp9KQkpA7OkEU";

axios.defaults.headers.common["Authorization"] = token;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
