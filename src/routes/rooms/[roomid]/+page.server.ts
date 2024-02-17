import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";
import { client as db } from "$lib/server/db"

export const load: PageServerLoad = async (event) => {
	const id = event.params.roomid;

	const room = await db.stanze.findUnique({
    where: {
      id_stanza: id
    },
  });

	return {
    room,
    id
  };
};

export const actions: Actions = {
  
};
