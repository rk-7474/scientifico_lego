import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { client as db } from "$lib/server/db"
import { Argon2id } from "oslo/password";

import type { Actions } from "./$types";

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");
		const confirm_password = formData.get("confirm_password");
		if ( confirm_password !== password )
			return fail(400, {
				message: "Password don't match"
			});

		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		)
			return fail(400, {
				message: "Invalid username"
			});		

		if (typeof password !== "string" || password.length < 6 || password.length > 255)
			return fail(400, {
				message: "Invalid password"
			});

		const existingUser = await db.utenti.findUnique({
			where: {
				username
			}
		})

		if (existingUser) 
			return fail(400, {
				message: "Username already in use"
			});	
		

		const hashedPassword = await new Argon2id().hash(password);

		await db.utenti.create({
			data: {
                username,
                password: hashedPassword
            }
		});

		const session = await lucia.createSession(username, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		console.log("created account", username, password)

		redirect(302, "/");
	}
};