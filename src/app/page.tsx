// app/page.jsx
import Link from "next/link";
import { getDays, getPostsByDay } from "./_services/notion";

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
        return { id: post.id, title, slug };
      });

      return { id: day.id, date, posts };
    })
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Calendário de Jogos</h1>
      {daysWithPosts.map((day) => (
        <section key={day.id} style={{ marginBottom: "2rem" }}>
          <h2>{new Date(day.date!).toLocaleDateString()}</h2>
          {day.posts.length ? (
            <ul>
              {day.posts.map((post) => (
                <li key={post.id}>
                  <Link href={`/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum jogo cadastrado para este dia.</p>
          )}
        </section>
      ))}
    </main>
  );
}
