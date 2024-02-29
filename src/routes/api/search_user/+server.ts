import { pool } from '$lib/server/db';

export const GET = async (request: any) => {
    const query = request.url.searchParams.get('q');

    if (!query) return new Response(JSON.stringify([]));

    const [users] = await pool.execute("select id, username from users where username LIKE ?", [query + '%'])

    console.log(users, query);

    return new Response(JSON.stringify(users));
};