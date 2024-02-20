import type { PageServerLoad, Actions } from "./$types";
import { pool } from "$lib/server/db"

export const load: PageServerLoad = async (event) => {
	const id = event.params.roomid;

  const room = await pool.execute('select * from rooms where id = ?', [id]);

	return {
    room,
    id
  };
};

