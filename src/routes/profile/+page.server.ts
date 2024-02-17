import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";
import { client as db } from "$lib/server/db"

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "/login");

	const username = event.locals.user.username

	const user_data = await db.utenti.findUnique({
		where: {
			username
		},
		select: {
			
		}
	})

	return {
		user_data
	};
};

export const actions: Actions = {
	logout: async (event) => {
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