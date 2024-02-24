import type { PageServerLoad, Actions } from "./$types";
import { pool } from "$lib/server/db"
import { type Rooms } from "$lib/types";

export const load: PageServerLoad = async (event) => {
	const id = event.params.roomid;

  const [[room]] = await pool.execute<Rooms[]>('select * from rooms where uuid = ?', [id]);
  const [frames] = await pool.execute<Rooms[]>('select * from scenes where room_id = ?', [room.id]);

	return {
    room,
    frames,
    id
  };
};

