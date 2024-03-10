import { f as formatRow, p as pool } from './db-aQqvt4qL.js';
import './index-RcZWwKaW.js';
import 'mysql2/promise';

const POST = async ({ request, locals }) => {
  const { user_id, room_id, username } = await request.json();
  if (!locals.user?.id || !user_id || !room_id || !locals.user?.id != user_id)
    ;
  const [query, params] = formatRow({ user_id, room_id, username });
  await pool.execute(`insert into editors ${query}`, [...params]);
  return new Response("success");
};

export { POST };
//# sourceMappingURL=_server.ts-5y1b47YW.js.map
