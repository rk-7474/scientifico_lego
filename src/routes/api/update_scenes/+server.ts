import { pool, formatRow } from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (request: any) => {
    const scene = request.json();
    
    let [query, params] = formatRow(scene)

    const search = await pool.execute(`insert into scenes ${query}`, params)

    return new Response(JSON.stringify(search));
};