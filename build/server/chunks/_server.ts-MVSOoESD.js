import { p as pool, f as formatRow } from './db-aQqvt4qL.js';
import './index-RcZWwKaW.js';
import { h as hasPerms } from './perms-BYMvbViO.js';
import 'mysql2/promise';

const PUT = async ({ request, locals }) => {
  const scene = await request.json();
  if (!locals.user?.id || !scene.id)
    ;
  console.log(scene.id);
  const [[room]] = await pool.execute("select user_id, id from rooms where uuid = ?", [scene.id]);
  console.log(room.user_id, locals.user?.id);
  if (room && room.user_id !== Number(locals.user?.id)) {
    const [editors] = await pool.execute("select * from editors where room_id = ? AND user_id = ?", [scene.id, locals.user?.id]);
    if (editors.length === 0 || !editors.some((e) => e.user_id === locals.user?.id))
      ;
  }
  let [query, params] = formatRow({ ...scene, room_id: room.id, id: null });
  console.log(query, params);
  await pool.execute(`insert into scenes ${query}`, params);
  return new Response(null, { status: 200 });
};
const DELETE = async ({ request, locals }) => {
  const data = await request.json();
  console.log("data: ", data);
  if (!locals.user?.id || !data.scene_id || !data.room_id || !hasPerms(data.room_id, locals.user?.id))
    ;
  await pool.execute(`delete from scenes where id = ?`, [data.scene_id]);
  return new Response(null, { status: 200 });
};

export { DELETE, PUT };
//# sourceMappingURL=_server.ts-MVSOoESD.js.map
