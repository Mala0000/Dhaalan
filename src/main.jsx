import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import axios from "axios";

// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import App from "./App";
import SubjectsIndex from "./routes/subjects";
import PerSubjectPage from "./routes/subjects/id";
import Forum from "./routes/forum";
import Post from "./routes/forum/post";

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
  {
    path: "/forum",
    children: [
      {
        path: "",
        element: <Forum />,
      },
      {
        path: ":postId",
        element: <Post />,
      },
    ],
  },
]);

axios.defaults.baseURL = "https://api.airtable.com/v0/applRp9KQkpA7OkEU";

axios.defaults.headers.common["Authorization"] =
  import.meta.env.VITE_AIRTABLE_TOKEN;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
