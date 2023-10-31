import React from "react";
import RootLayout from "../../layouts/root";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { ArrowDownToLine } from "lucide-react";

export default function PerSubjectPage() {
  const params = useParams();

  const subjects = useQuery(["subjects"], async () => {
    return await axios.get(
      `/Subjects?filterByFormula=slug%3D'${params.subjectId}'`
    );
  });

  const subjectsData = subjects.isSuccess && subjects.data.data.records;

  const currentSubject = subjectsData[0];

  const res = useQuery(["resources"], async () => {
    return await axios.get("/Resources");
  });

  let grouped = res?.data?.data?.records?.reduce((result, item) => {
    let year = item.fields.Year;
    let session = item.fields.Session;
    let variant = item.fields.InternationalVariant;

    // Create year property if it doesn't exist
    if (!result[year]) {
      result[year] = {};
    }

    // Create session property in year if it doesn't exist
    if (!result[year][session]) {
      result[year][session] = {};
    }

    // Create variant property in session if it doesn't exist
    if (!result[year][session][variant]) {
      result[year][session][variant] = [];
    }

    // Push item to year, session and variant
    result[year][session][variant].push(item);

    return result;
  }, {});

  if (res.isLoading || subjects.isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <RootLayout>
        <div>
          <h1 className="font-bold text-4xl text-red-600">
            {currentSubject.fields.Subject}
          </h1>
          <p className="text-gray-500 text-sm">
            Number of Resources: {currentSubject.fields.Resources.length}
          </p>
          <div className="py-10">
            <div>
              {Object.keys(grouped).map((year) => (
                <div key={year}>
                  <h2 className="font-semibold text-2xl text-red-600  pb-2">
                    {year}
                  </h2>
                  {Object.keys(grouped[year]).map((session) => (
                    <div key={session} className="border-t  border-red-600">
                      <h3 className="py-2  font-semibold text-xl text-red-600">
                        Session: {session}
                      </h3>
                      {Object.keys(grouped[year][session]).map((variant) => (
                        <div
                          className="grid grid-cols-1 sm:grid-cols-4 gap-5 mt-2"
                          key={variant}
                        >
                          <h4>Variant: {variant}</h4>
                          {grouped[year][session][variant].map((item) => (
                            <div
                              key={item.id}
                              className="border-y border-y-red-500 py-2"
                            >
                              {/* Render your item here */}
                              <div className="flex flex-row justify-between items-center">
                                <div>
                                  <p className="bg-red-50 rounded-full px-2 w-fit text-sm">
                                    {item.fields.Type}
                                  </p>
                                  <p>{item.fields.Variant}</p>
                                </div>
                                <Link to={item.fields.URL}>
                                  <ArrowDownToLine />
                                </Link>
                              </div>
                              {/* Add more fields as needed */}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* <pre>{JSON.stringify(grouped, null, 2)}</pre>
          <pre>{JSON.stringify(currentSubject, null, 2)}</pre>
          <pre>{JSON.stringify(subjects, null, 2)}</pre>
          <pre>{JSON.stringify(res?.data, null, 2)}</pre>
          {res?.data?.data?.records?.length} */}
        </div>
      </RootLayout>
    </>
  );
}
