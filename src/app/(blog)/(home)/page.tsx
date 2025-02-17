// app/page.jsx
import Link from "next/link";
import { getDays, getPostsByDay } from "../_services/notion";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function Home() {
  // Busca todos os dias cadastrados
  const days = await getDays();

  // Para cada dia, busca os posts (jogos) relacionados
  const daysWithPosts = await Promise.all(
    days.map(async (day) => {
      // Extraindo a data (supondo que a propriedade seja "Date")
      const date = day.properties.date.date?.start;

      // Busca os posts vinculados ao dia
      const postsData = await getPostsByDay(day.id);

      // Mapeia os posts para extrair os dados necessários, como título
      const posts = postsData.map((post) => {
        const titleProp = post.properties.title;
        const title = titleProp?.title?.[0]?.plain_text || "Sem título";
        const slug = post.properties.slug?.rich_text?.[0]?.plain_text;
        const occursAt = post.properties.hour.date?.start;
        const hasPost = post.properties.hasPost.checkbox;

        return { id: post.id, title, occursAt, slug, hasPost };
      });

      return { id: day.id, date, posts };
    })
  );

  return (
    <div className="flex gap-12 flex-col">
      <header>
        <h1 className="font-semibold text-3xl tracking-tight">
          Football Planner
        </h1>
      </header>
      <div className="h-64 w-full bg-zinc-900 rounded-xl shadow-shape flex items-center justify-center">
        <span className="text-sm text-zinc-400">ADVERTISEMENT</span>
      </div>
      <main className="flex flex-col gap-8">
        {daysWithPosts.map((day) => (
          <section key={day.id} className="flex flex-col gap-3">
            <header className="flex gap-2 items-baseline">
              <span className="text-xl font-semibold text-zinc-300">
                Dia {format(parseISO(day.date!), "dd", { locale: ptBR })}
              </span>
              <span className="text-xs text-zinc-500">
                {format(parseISO(day.date!), "EEEE", { locale: ptBR })}
              </span>
            </header>
            {day.posts.length ? (
              <ul className="flex flex-col gap-3">
                {day.posts.map((post) =>
                  post.hasPost ? (
                    <Link href={`/${post.slug}`} key={post.id}>
                      <li className="bg-zinc-900 px-4 py-2.5 rounded-xl shadow-shape flex justify-between items-center">
                        <span>{post.title}</span>
                        <span className="text-sm text-zinc-400">
                          {format(post.occursAt!, "HH:mm")}h
                        </span>
                      </li>
                    </Link>
                  ) : (
                    <li
                      className="bg-zinc-900 px-4 py-2.5 rounded-xl shadow-shape flex justify-between items-center cursor-not-allowed"
                      key={post.id}
                    >
                      <span className="text-zinc-400">{post.title}</span>
                      <span className="text-sm text-zinc-400">
                        {format(post.occursAt!, "HH:mm")}h
                      </span>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">
                Nenhum jogo cadastrado para este dia.
              </p>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
