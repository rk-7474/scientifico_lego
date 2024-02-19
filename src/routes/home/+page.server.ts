import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";
import { pool } from "$lib/server/db"
import { randomUUID } from "crypto";
import unzipper from "unzipper";
import { mkdir, writeFile, createReadStream, unlink, mkdirSync, writeFileSync, unlinkSync } from "fs";
import type { Rooms } from "$lib/types";

export const load: PageServerLoad = async (event) => {

  const [ feed ] = await pool.query<Rooms[]>("select * from rooms limit 10");
  
	return {
    feed
  };
};
export const actions: Actions = {
    default: async(event: any) => {
      
    }
};
