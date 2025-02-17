import ReactMarkdown from "react-markdown";
import { GetPostBySlugResponse } from "../../../../types/post";
import { getPostBySlug } from "../_services/notion";
import Link from "next/link";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post: GetPostBySlugResponse = await getPostBySlug(slug);

  return (
    <div className="flex flex-col gap-12">
      <header className="text-center">
        <Link href="/" className="font-semibold text-2xl tracking-tight">
          Football Planner
        </Link>
      </header>
      <div className="h-64 w-full bg-zinc-900 rounded-xl shadow-shape flex items-center justify-center">
        <span className="text-sm text-zinc-400">ADVERTISEMENT</span>
      </div>
      <div className="flex flex-row gap-6">
        <main className="prose prose-invert m-auto">
          <ReactMarkdown
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="font-semibold text-3xl tracking-tight mb-6"
                  {...props}
                />
              ),
              p: ({ ...props }) => <p className="text-zinc-400" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </main>
      </div>
      <div className="h-64 w-full bg-zinc-900 rounded-xl shadow-shape flex items-center justify-center">
        <span className="text-sm text-zinc-400">ADVERTISEMENT</span>
      </div>
    </div>
  );
}
