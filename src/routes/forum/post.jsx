import React from "react";
import RootLayout from "../../layouts/root";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Post() {
  const params = useParams();

  const form = useForm({
    defaultValues: {
      comment: "",
      postId: params?.postId ?? "",
    },
  });

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

  const onSubmit = async (data) => {
    alert(JSON.stringify(data, null, 2));
  };

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
          <div>
            {/* <form onSubmit={form.handleSubmit(onSubmit)}>
              <Controller
                name="comment"
                control={form.control}
                defaultValue={EditorState.createEmpty()}
                as={<WYSIWYGEditor />}
              />
            </form> */}
          </div>
        </div>
      </div>
      <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
      <pre>{JSON.stringify(filteredComments, null, 2)}</pre>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      <pre>{JSON.stringify(postData, null, 2)}</pre>
    </RootLayout>
  );
}

const WYSIWYGEditor = ({ onChange, value }) => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    onChange(editorState.getCurrentContent().getPlainText());
  };

  return (
    <div className="editor">
      <Editor
        editorState={editorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};
