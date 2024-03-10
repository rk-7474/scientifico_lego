import { p as pool } from './db-aQqvt4qL.js';

const hasPerms = async (room_id, user_id) => {
  const [[room]] = await pool.execute("select user_id, id from rooms where uuid = ?", [room_id]);
  if (room && room.user_id !== Number(user_id)) {
    const [editors] = await pool.execute("select * from editors where room_id = ? AND user_id = ?", [room_id, user_id]);
    if (editors.length === 0 || !editors.some((e) => e.user_id === user_id))
      return false;
  }
  return true;
};

export { hasPerms as h };
//# sourceMappingURL=perms-BYMvbViO.js.map
