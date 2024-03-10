import { p as pool, f as formatRow } from './db-aQqvt4qL.js';
import './index-RcZWwKaW.js';
import 'mysql2/promise';

const POST = async ({ request, locals }) => {
  const { room, id } = await request.json();
  if (!locals.user?.id)
    ;
  const [[{ user_id }]] = await pool.execute("select user_id from rooms where uuid = ?", [id]);
  if (user_id !== Number(locals.user?.id))
    ;
  let [query, params] = formatRow(room);
  await pool.execute(`update rooms ${query} where id = ?`, [...params, id]);
  return new Response(null, { status: 200 });
};

export { POST };
//# sourceMappingURL=_server.ts-BO9cKcCK.js.map
