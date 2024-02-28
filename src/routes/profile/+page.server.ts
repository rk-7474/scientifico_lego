import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";
import { pool } from "$lib/server/db"
import type { Rooms } from "$lib/types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "/login?v=profile");

	const user_data = event.locals.user

	const [ rooms ] = await pool.query<Rooms[]>("select * from rooms where user_id = ?", [user_data.id]);
  
	return {
		rooms
	};
};

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, "/login");
	}
};