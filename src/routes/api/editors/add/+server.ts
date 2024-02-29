import { pool, formatRow } from '$lib/server/db';
import { fail, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
    const {user_id, room_id, username} = await request.json();

    if (!user_id || !room_id) fail(400);

    const [query, params] = formatRow({user_id, room_id, username});

    await pool.execute(`insert into editors ${query}`, [...params])

    return new Response("success");
};  