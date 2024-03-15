import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";
import { pool } from "$lib/server/db"
import type { Rooms, Editors } from "$lib/types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "/login?v=profile");

	const user_data = event.locals.user

	const [ rooms ] = await pool.query<Rooms[]>("select * from rooms where user_id = ?", [user_data.id]);

    return {
        username: user_data.username,
		rooms
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
};  