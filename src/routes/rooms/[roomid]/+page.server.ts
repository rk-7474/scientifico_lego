import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";
import { pool } from "$lib/server/db"

export const load: PageServerLoad = async (event) => {
	const id = event.params.roomid;

  const room = await pool.execute('select * from stanze where id = ?', [id]);

	return {
    room,
    id
  };
};

export const actions: Actions = {
  update: async(event) => {
    const room = event.body;

    const existingUser = await pool.execute('update stanze set ', [username]);
  }
};
