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

export const actions: Actions = {
  url: async(event: any) => {
    const formData = await event.request.formData();
    const url = formData.get("url");
    const title = formData.get("title");
    const desc = formData.get("desc");
    const tags = formData.get("tags");

    return {done: "info", info:
      {
        url,
        title,
        desc,
        tags
      } 
    };
  }
    // const url = "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
}


