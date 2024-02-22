import type { PageServerLoad, Actions } from "./$types";
import { pool } from "$lib/server/db"
import { type Rooms } from "$lib/types";

export const load: PageServerLoad = async (event) => {
	const id = event.params.roomid;

  const [result] = await pool.execute<Rooms[]>('select * from rooms where uuid = ?', [id]);

	return {
    room: result[0],
    id
  };
};

