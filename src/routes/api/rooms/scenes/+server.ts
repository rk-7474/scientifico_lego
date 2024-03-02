import { pool, formatRow } from '$lib/server/db';
import type { Editors } from '$lib/types';
import { fail, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request, locals }: RequestEvent) => {
    const scene = await request.json();

	if (!locals.user?.id || !scene.id) fail(400);
    
    const [editors] = await pool.execute<Editors[]>('select * from editors where room_id = ? AND user_id = ?', [scene.id, locals.user?.id]);  

    if (editors.length === 0) fail(400);

    let [query, params] = formatRow(scene)

    await pool.execute(`insert into scenes ${query}`, params)

    return new Response(null, {status: 200});
};


export const DELETE: RequestHandler = async (request: any) => {
    const id = request.text();
    
    await pool.execute(`delete from scenes where id = ?`, [id])

    return new Response();
};