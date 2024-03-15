import { pool, formatRow } from '$lib/server/db';
import type { Editors, Rooms } from '$lib/types';
import { fail, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import { hasPerms } from '$lib/server/perms';


export const GET = async (request: any) => {
    if (!request.locals.user?.id) fail(401);
    const uuid = request.url.searchParams.get("uuid");

    if (!uuid) new Response("[]");

    const [[room]] = await pool.execute<Rooms[]>('select * from rooms where uuid = ?', [uuid]);
    const [editors] = await pool.execute<Editors[]>('select * from editors where room_id = ?', [room.id]);

    return new Response(JSON.stringify(editors));
}