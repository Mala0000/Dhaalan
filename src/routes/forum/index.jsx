import React from "react";
import RootLayout from "../../layouts/root";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { HelpCircle, Speech } from "lucide-react";
import { Link } from "react-router-dom";

export default function Forum() {
  const posts = useQuery(["posts"], async () => {
    return await axios.get("/Posts");
  });

  return (
    <RootLayout>
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-4xl text-red-500">Digital Forum</h1>
        <div className="flex flex-col gap-y-2">
          {posts?.data?.data?.records.map((post) => (
            <Link
              to={`/forum/${post.id}`}
              className="border border-red-500 rounded-xl p-5 flex flex-row gap-5"
            >
              <div className="bg-red-50 rounded-full h-12 w-12 flex flex-col items-center justify-center">
                <HelpCircle size={32} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-500">
                  {post.fields.Title}
                </h3>
                <div
                  className="prose prose-sm line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.fields.Content }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
    </RootLayout>
  );
}
