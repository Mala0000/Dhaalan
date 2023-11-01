import React from "react";
import RootLayout from "../../layouts/root";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { cn } from "../../utils/cn";
import { isLatin } from ".";

import { useQuery } from "@tanstack/react-query";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";

export default function PerSubjectPage() {
  const params = useParams();

  const subjects = useQuery(["subjects"], async () => {
    return await axios.get(
      `/Subjects?filterByFormula=slug%3D'${params.subjectId}'`
    );
  });

  const subjectsData = subjects.isSuccess && subjects.data.data.records;

  const currentSubject = subjectsData[0];

  const res = useQuery(["resources", currentSubject], async () => {
    return await axios.get("/Resources");
  });

  let filteredArray = res?.data?.data?.records?.filter((item) =>
    item.fields.Subject.includes(currentSubject?.id)
  );

  const otherResources = useQuery(["otherResources"], async () => {
    return await axios.get("/OtherResources");
  });

  let filteredOtherResources = otherResources?.data?.data?.records?.filter(
    (item) => item.fields.Subject.includes(currentSubject?.id)
  );

  let grouped = filteredArray?.reduce((result, item) => {
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

  if (res.isLoading || subjects.isLoading || otherResources.isLoading) {
    return <p>Loading....</p>;
  }

  const isDhivehi = !isLatin(currentSubject?.fields?.Subject);

  return (
    <>
      <RootLayout>
        <div>
          <h1
            className={cn(
              "font-bold text-4xl text-red-600",
              isDhivehi && "font-dhivehi text-right font-normal"
            )}
          >
            {currentSubject.fields?.Subject}
          </h1>
          <p className="text-gray-500 text-sm">
            Number of Resources: {currentSubject.fields?.Resources?.length ?? 0}
          </p>
          <div className="py-10">
            <div>
              {Object.keys(grouped).length === 0 ? (
                <div className="border border-gray-300 rounded-lg p-5 flex flex-col items-center gap-y-4 justify-center">
                  <img src="/kite.svg" className="h-60 w-auto" />
                  <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-semibold text-red-500">
                      Empty!
                    </h3>
                    <p>
                      No resources found under {currentSubject.fields?.Subject}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="font-semibold text-2xl text-red-600  pb-2">
                    Past Papers
                  </h2>
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
                          {Object.keys(grouped[year][session]).map(
                            (variant) => (
                              <div
                                className="grid grid-cols-1 sm:grid-cols-4 gap-5 mt-2"
                                key={variant}
                              >
                                <h4 className="font-semibold text-xl">
                                  Variant: {variant}
                                </h4>
                                {grouped[year][session][variant].map((item) => (
                                  <div
                                    key={item?.id}
                                    className="border-y border-y-red-500 py-2"
                                  >
                                    {item && item.fields && (
                                      <div className="flex flex-row justify-between items-center">
                                        <div>
                                          <p className="bg-red-50 rounded-full px-2 w-fit text-sm">
                                            {item?.fields?.Type}
                                          </p>
                                          <p>{item?.fields?.Variant}</p>
                                        </div>
                                        <a
                                          href={item?.fields?.URL}
                                          download
                                          // to={item?.fields?.URL}s
                                        >
                                          <ArrowDownToLine />
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                  <div>
                    <h2 className="font-semibold text-2xl text-red-600  pb-2">
                      Other Resources
                    </h2>
                    <div className="grid sm:grid-cols-4 gap-5">
                      {filteredOtherResources.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className="flex flex-row justify-between items-center border-y border-y-red-500 py-2"
                          >
                            <div>
                              <p className="bg-red-50 rounded-full px-2 w-fit text-sm mb-2">
                                {item?.fields?.Category}
                              </p>
                              <p>{item?.fields?.Title}</p>
                            </div>
                            <a
                              href={item?.fields?.URL}
                              target="_blank"
                              // to={item?.fields?.URL}s
                            >
                              <ArrowUpRight />
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <pre>{JSON.stringify(filteredOtherResources, null, 2)}</pre>
          <pre>{JSON.stringify(grouped, null, 2)}</pre>
          <pre>{JSON.stringify(currentSubject, null, 2)}</pre>
          {res?.data?.data?.records?.length}
          <pre>{JSON.stringify(filteredArray, null, 2)}</pre>
          <pre>{JSON.stringify(grouped, null, 2)}</pre>
          <pre>{JSON.stringify(subjects, null, 2)}</pre>
          <pre>{JSON.stringify(res?.data, null, 2)}</pre>
        </div>
      </RootLayout>
    </>
  );
}
