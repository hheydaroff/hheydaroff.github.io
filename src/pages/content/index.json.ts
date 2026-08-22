import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('posts'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const base = site?.origin ?? 'https://heyhido.com';

  return new Response(
    JSON.stringify(
      {
        title: "Hido's Blog",
        description: 'Machine-readable index of all published posts by Hidayat Heydarov (Hido).',
        url: `${base}/`,
        generatedAt: new Date().toISOString(),
        count: posts.length,
        posts: posts.map((post) => ({
          title: post.data.title,
          slug: post.id,
          url: `${base}/posts/${post.id}/`,
          datePublished: post.data.date.toISOString(),
          tags: post.data.tags ?? [],
          description: post.data.description ?? '',
        })),
      },
      null,
      2,
    ),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
};