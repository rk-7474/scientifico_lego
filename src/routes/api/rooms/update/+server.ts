import { pool, formatRow } from '$lib/server/db';
import type { Rooms } from '$lib/types';
import { fail, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }: RequestEvent) => {
    const {room, id} = await request.json();
    
    if (!locals.user?.id) fail(400);

    const [[{user_id}]] = await pool.execute<Rooms[]>('select user_id from rooms where uuid = ?', [id]);
   
    if (user_id !== Number(locals.user?.id)) fail(401);

    let [query, params] = formatRow(room)

    await pool.execute(`update rooms ${query} where id = ?`, [...params, id])

    return new Response(null, {status: 200});
};