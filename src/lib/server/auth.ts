import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { Mysql2Adapter } from "@lucia-auth/adapter-mysql";
import { pool } from "$lib/server/db"

const adapter = new Mysql2Adapter(pool, {
	user: "utenti",
	session: "sessioni"
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}