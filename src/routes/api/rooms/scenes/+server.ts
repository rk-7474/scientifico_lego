import { pool, formatRow } from '$lib/server/db';
import type { Editors, Rooms } from '$lib/types';
import { fail, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import { hasPerms } from '$lib/server/perms';

export const PUT: RequestHandler = async ({ request, locals }: RequestEvent) => {
    const scene = await request.json();

	if (!locals.user?.id || !scene.id) fail(400);

    const [[room]] = await pool.execute<Rooms[]>('select user_id, id from rooms where uuid = ?', [scene.id]);  

    if (room && room.user_id !== Number(locals.user?.id)) {
        const [editors] = await pool.execute<Editors[]>('select * from editors where room_id = ? AND user_id = ?', [scene.id, locals.user?.id]);  
        if (editors.length === 0 || !editors.some((e) => e.user_id === locals.user?.id))
            fail(403);
    }

    let [query, params] = formatRow({...scene, room_id: room.id, id: null})

    await pool.execute(`insert into scenes ${query}`, params);

    await updateTags(room.id);

    return new Response(null, {status: 200});
};


export const DELETE: RequestHandler = async ({ request, locals }: RequestEvent) => {
    const data = await request.json();

    if (!locals.user?.id || !data.scene_id || !data.room_id || !hasPerms(data.room_id, locals.user?.id)) fail(403);

    const [[room]] = await pool.execute<Rooms[]>('select user_id, id from rooms where uuid = ?', [data.room_id]);  

    await pool.execute(`delete from scenes where id = ?`, [room.id]);

    await updateTags(room.id);

    return new Response(null, {status: 200});
};


const updateTags = async (room_id: number) => {
    const [scenes] = await pool.execute<Rooms[]>(`select * from scenes where room_id = ?`, [room_id]);

    const tags_set = new Set();
    console.log(scenes)
    scenes.forEach((s) => {
        for (const tag of s.tags.split(" "))
        tags_set.add(tag);
    });

    console.log(tags_set)

    const tags = Array.from(tags_set).join(" ");

    await pool.execute(`update rooms SET tags = ? where id = ?`, [tags, room_id]);
}
