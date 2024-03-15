import type { PageServerLoad, Actions } from "./$types";
import { pool } from "$lib/server/db"
import type { Rooms } from "$lib/types";
import { formatSearch } from "$lib/server/db";

export const load: PageServerLoad = async (event) => {

  const [ feed ] = await pool.query<Rooms[]>("select image, id, name, description, uuid, tags, owner from rooms limit 9");
  
	return {
    feed
  };
};
export const actions: Actions = {
    search: async(event: any) => {
      const data = await event.request.formData();
      const search = data.get("q");

      if (!search) {
        const [ feed ] = await pool.query<Rooms[]>("select image, id, name, description, uuid, tags, owner from rooms limit 9");
        return {feed};
      }

      let [query, params] = formatSearch(search);

      const [ feed ] = await pool.query<Rooms[]>(`select image, id, name, description, uuid, tags from rooms where ${query}`, [params]);

      return {feed};
    }
};
