import type { PageServerLoad, Actions, RequestEvent } from "./$types";
import { pool } from "$lib/server/db"
import { type Rooms } from "$lib/types";
import { hasPerms } from "$lib/server/perms";

export const load: PageServerLoad = async ({ request, locals, params }: RequestEvent) => {
	const id = params.roomid;

  const [[room]] = await pool.execute<Rooms[]>('select * from rooms where uuid = ?', [id]);

  if (!room) return;

  const [frames] = await pool.execute<Rooms[]>('select * from scenes where room_id = ?', [room.id]);
  
  const perms = await hasPerms(room.id.toString(), locals.user?.id);

	return {
    room,
    frames,
    id,
    perms
  };  
};

export const actions: Actions = {
  info: async(event: any) => {
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


