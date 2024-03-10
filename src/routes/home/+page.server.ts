import type { PageServerLoad, Actions } from "./$types";
import { pool } from "$lib/server/db"
import type { Rooms } from "$lib/types";

export const load: PageServerLoad = async (event) => {

  const [ feed ] = await pool.query<Rooms[]>("select image, id, name, description, uuid from rooms limit 9");
  
	return {
    feed
  };
};
export const actions: Actions = {
    search: async(event: any) => {
      const data = await event.request.formData();
      const search = data.get("q");

      const [ feed ] = await pool.query<Rooms[]>("select image, id, name, description, uuid from rooms where name like ?", [search + '%']);

      return {feed};
    }
};
