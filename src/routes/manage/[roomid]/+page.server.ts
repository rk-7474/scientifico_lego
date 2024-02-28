import type { PageServerLoad, Actions } from "./$types";
import { pool } from "$lib/server/db"
import { type Editors, type Rooms } from "$lib/types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	const id = event.params.roomid;
	const user_data = event.locals.user

	if (!user_data) redirect(302, "/login");

  const [[room]] = await pool.execute<Rooms[]>('select * from rooms where uuid = ?', [id]);
  const [editors] = await pool.execute<Editors[]>('select * from editors where room_id = ?', [id]);

  if (room.user_id == Number(user_data.id) ) return;

	return {
    room,
    id,
    editors
  };
};

export const actions: Actions = {
  save: async(event: any) => {
    const formData = await event.request.formData();
    const state = formData.get("visibility");
    const id = formData.get("room_id");

    pool.execute("update rooms set state = ? where id = ?", [state, id])
  }
}


