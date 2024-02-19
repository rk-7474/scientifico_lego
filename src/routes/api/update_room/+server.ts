import { pool, formatRow } from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (request: any) => {
    const {room, id} = request.json();
    
    let [query, params] = formatRow(room)

    const search = await pool.execute(`update rooms ${query} where id = ?`, [...params, id])

    return new Response(JSON.stringify(search));
};