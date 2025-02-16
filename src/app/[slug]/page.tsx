import ReactMarkdown from "react-markdown";
import { GetPostBySlugResponse } from "../../../types/post";
import { getPostBySlug } from "../_services/notion";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post: GetPostBySlugResponse = await getPostBySlug(slug);

  return (
    <main style={{ padding: "2rem" }}>
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-2xl text-blue-700" {...props} />
          ),
        }}
      >
        {post.content}
      </ReactMarkdown>
    </main>
  );
}
