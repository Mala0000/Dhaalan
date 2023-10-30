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
    <div className="h-44 w-44 rounded-2xl border border-red-500 overflow-hidden p-2 flex flex-col justify-end">
      <h1 className="text-4xl font-bold font-outline-2 text-yellow-50 ">
        {title}
      </h1>
    </div>
    <div className="py-2">
      <p className="text-red-500 font-semibold">{title}</p>
      <Link className="font-medium text-sm" to={link}>
        Read More{" "}
      </Link>
    </div>
  </div>
);
