import React from "react";

import RootLayout from "./layouts/root";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isLatin } from "./routes/subjects";
import { cn } from "./utils/cn";

export default function App() {
  const subjects = useQuery(["subjects"], async () => {
    return await axios.get(`/Subjects`);
  });

  if (subjects.isLoading) {
    return <p>Loading....</p>;
  }
  return (
    <>
      <RootLayout>
        <div>
          <h1 className="font-bold text-5xl text-red-500">Subjects</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5  py-5">
            {subjects?.data?.data?.records?.map((subject) => (
              <SubjectCard
                title={subject?.fields?.Subject}
                link={`/subjects/${subject?.fields?.slug}`}
              />
            ))}
          </div>
        </div>
      </RootLayout>
    </>
  );
}

const SubjectCard = ({ title, link, image }) => {
  const isDhivehi = !isLatin(title);

  return (
    <div className="">
      <Link className="font-medium text-sm" to={link}>
        <div className="h-44 w-44 sm:h-60 sm:w-60 rounded-2xl bg-gradient-to-t from-red-500 via-red-400 to-red-300 overflow-hidden p-3 flex flex-col justify-end">
          <h1
            className={cn(
              "text-2xl font-bold  text-white leading-6",
              isDhivehi && "font-dhivehi text-right font-normal"
            )}
          >
            {title}
          </h1>
        </div>
      </Link>
    </div>
  );
};
