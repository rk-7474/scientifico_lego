import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";
import { pool, formatRow } from "$lib/server/db"
import { randomUUID } from "crypto";
import unzipper from "unzipper";
import { createReadStream, mkdirSync, writeFileSync, unlinkSync } from "fs";
import path from "path";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "/login?v=create");
  return;
};

export const actions: Actions = {
    default: async(event: any) => {
      const formData = await event.request.formData();
      const label = formData.get("label");
      const description = formData.get("desc");
      const image = formData.get("img");
      const fileField = formData.get("file");

      if (!fileField || !(fileField instanceof File)) {
        return { status: 400, body: "No file provided" };
      }

      const id = randomUUID();

      console.log(id);

      const uploadPath = path.join(path.resolve(), `/static/routes/files/${id}`);

      mkdirSync(uploadPath, {recursive: true});
      
      const zipPath = `${uploadPath}/tempfile.zip`;

      const arrayBuffer = await fileField.arrayBuffer();

      console.log(fileField, arrayBuffer);

      const uint8Array = new Uint8Array(arrayBuffer);

      writeFileSync(zipPath, uint8Array);

      await createReadStream(zipPath)
          .pipe(unzipper.Extract({ path: uploadPath }))
          .promise();
    
      unlinkSync(zipPath);

      let [query, params] = formatRow({
        name: label,
        state: "public",
        image,
        description,
        user_id: event.locals.user.id,
        uuid: id
      })

      await pool.execute(`insert into rooms ${query}`, params);

      console.log("created room", zipPath);

      redirect(302, `/rooms/${id}`);
    }
};
