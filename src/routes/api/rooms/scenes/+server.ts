import { pool, formatRow } from '$lib/server/db';
import type { Editors, Rooms } from '$lib/types';
import { fail, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request, locals }: RequestEvent) => {
    const scene = await request.json();

	if (!locals.user?.id || !scene.id) fail(400);
    
    console.log(scene.id)

    const [[room]] = await pool.execute<Rooms[]>('select user_id from rooms where uuid = ?', [scene.id]);  

    console.log(room.user_id, locals.user?.id);

    if (room && room.user_id !== Number(locals.user?.id)) {
        const [editors] = await pool.execute<Editors[]>('select * from editors where room_id = ? AND user_id = ?', [scene.id, locals.user?.id]);  
        if (editors.length === 0 || !editors.some((e) => e.user_id === locals.user?.id))
            fail(403);
    }

    let [query, params] = formatRow(scene)

    console.log(query, params)

    await pool.execute(`insert into scenes ${query}`, params)

    return new Response(null, {status: 200});
};


export const DELETE: RequestHandler = async (request: any) => {
    const id = request.text();
    
    await pool.execute(`delete from scenes where id = ?`, [id])

    return new Response();
};