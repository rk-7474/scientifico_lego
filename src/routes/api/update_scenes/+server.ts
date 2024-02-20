import { pool, formatRow } from '$lib/server/db';
import { fail, type RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async (request: any) => {
    const scene = request.json();

    if (!scene.id) return new Response(new Blob(), {status: 400});
    
    let [query, params] = formatRow(scene)

    const search = await pool.execute(`insert into scenes ${query}`, params)

    return new Response(JSON.stringify(search));
};


export const DELETE: RequestHandler = async (request: any) => {
    const id = request.text();
    
    await pool.execute(`delete from scenes where id = ?`, [id])

    return new Response();
};