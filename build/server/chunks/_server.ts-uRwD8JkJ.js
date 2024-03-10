import { p as pool } from './db-aQqvt4qL.js';
import './index-RcZWwKaW.js';
import 'mysql2/promise';

const POST = async ({ request, locals }) => {
  const { user_id, room_id } = await request.json();
  if (!locals.user?.id || !user_id || !room_id || !locals.user?.id != user_id)
    ;
  await pool.execute(`delete from editors where user_id = ? AND room_id = ?`, [user_id, room_id]);
  return new Response("success");
};

export { POST };
//# sourceMappingURL=_server.ts-uRwD8JkJ.js.map
