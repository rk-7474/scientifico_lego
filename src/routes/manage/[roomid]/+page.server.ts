import { type Editors, type Rooms } from "$lib/types";
import type { PageServerLoad } from "./$types";
import { pool } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const load: PageServerLoad = async (event) => {
	const id = event.params.roomid;
	const user_data = event.locals.user

	if (!user_data) redirect(302, "/login");

  const [[room]] = await pool.execute<Rooms[]>('select * from rooms where uuid = ?', [id]);
  const [editors] = await pool.execute<Editors[]>('select * from editors where room_id = ?', [room.id]);
  

  if (room.user_id !== Number(user_data.id) ) redirect(302, "/profile");

  return {
    username: user_data.username,
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
  },

  search: async(event: any) => {
    const formData = await event.request.formData();
    const query = formData.get("q");

    console.log(query)

    if (!query) return {results: []}

    const [search] = await pool.execute("select id, username from users where username LIKE ?", [query + '%'])

    return {results: search};
  },
}


