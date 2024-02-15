import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";
import { client as db } from "$lib/server/db"

export const load: PageServerLoad = async (event) => {
	const id = event.params.roomid;

	const data = await db.stanze.findUnique({
    where: {
      id
    },
  });

	return {
    data,
    id
  }
};

export const actions: Actions = {
};