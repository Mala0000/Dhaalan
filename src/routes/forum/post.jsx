import React from "react";
import RootLayout from "../../layouts/root";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Post() {
  const params = useParams();

  const post = useQuery(["post", params.postId], async () => {
    return await axios.get(`/Posts/${params.postId}`);
  });

  const postId = post?.data?.data?.id;

  const comments = useQuery(["comments", postId], async () => {
    return await axios.get("/Comments");
  });

  const filteredComments = comments?.data?.data?.records.filter(
    (comment) => comment.fields.Post[0] === postId
  );

  if (post.isLoading) {
    return <p>Loading...</p>;
  }

  const postData = post.isSuccess && post.data.data.fields;

  return (
    <RootLayout>
      <div>
        <div className="p-4 bg-white border border-red-500 mb-4">
          <h1 className="text-red-500 text-2xl font-semibold">
            {postData.Title}
          </h1>
          <p className="text-gray-500 text-sm">{postData.Subtitle}</p>
          <p className="text-gray-500 text-sm">
            Posted on: {post.data.data.createdTime}
          </p>
          <div
            className="prose py-5"
            dangerouslySetInnerHTML={{ __html: postData.Content }}
          />
        </div>
        <div className="ml-10 flex flex-col gap-y-2">
          {filteredComments?.map((comment) => {
            return (
              <div className="p-4 bg-white border border-red-500">
                <p className="text-gray-500 text-sm">
                  Posted on: {comment.createdTime}
                </p>
                <div
                  className="prose py-5"
                  dangerouslySetInnerHTML={{ __html: comment.fields.Comment }}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* <pre>{JSON.stringify(filteredComments, null, 2)}</pre>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      <pre>{JSON.stringify(postData, null, 2)}</pre> */}
    </RootLayout>
  );
}
