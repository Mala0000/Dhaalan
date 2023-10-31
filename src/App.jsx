import React from "react";

import RootLayout from "./layouts/root";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <RootLayout>
        <div>
          <h1 className="font-bold text-5xl text-red-500">Subjects</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5  py-5">
            <SubjectCard
              title="English as a Second Language"
              link="/subjects/e2l"
            />
            <SubjectCard title="Physics" link="/subjects/physics" />
            <SubjectCard title="Chemistry" link="/subjects/chemistry" />
            <SubjectCard title="Biology" link="/subjects/biology" />
            <SubjectCard title="Economics" link="/subjects/Economics" />
            <SubjectCard
              title="Business Studies"
              link="/subjects/businessStudies"
            />
            <SubjectCard title="Commerce" link="/subjects/commerce" />
            <SubjectCard title="Computer Science" link="/subjects/compsci" />
          </div>
        </div>
      </RootLayout>
    </>
  );
}

const SubjectCard = ({ title, link, image }) => (
  <div className="">
    <Link className="font-medium text-sm" to={link}>
      <div className="h-44 w-44 sm:h-60 sm:w-60 rounded-2xl bg-gradient-to-t from-red-500 via-red-400 to-red-300 overflow-hidden p-3 flex flex-col justify-end">
        <h1 className="text-2xl font-bold  text-white leading-6">{title}</h1>
      </div>
    </Link>
  </div>
);
