import { pool } from '$lib/server/db';

export const GET = async (request: any) => {
    const query = request.query.s;

    const search = await pool.execute("select * from rooms where name LIKE '%?%'", [query])

    return new Response(JSON.stringify(search));
};