import type { PageServerLoad, Actions } from "./$types";
import { pool } from "$lib/server/db"
import type { Rooms } from "$lib/types";

export const load: PageServerLoad = async (event) => {

  const [ feed ] = await pool.query<Rooms[]>("select image, id, name, description, uuid from rooms limit 10");
  
	return {
    feed
  };
};
export const actions: Actions = {
    default: async(event: any) => {
      
    }
};
