import { pool, formatRow } from '$lib/server/db';
import { fail, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
    const {user_id, room_id} = await request.json();
    
    if (!user_id || !room_id) fail(400);

    await pool.execute(`delete from editors where user_id = ? AND room_id = ?`, [user_id, room_id])

    return new Response("success");
};  