import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";
import { pool, formatRow } from "$lib/server/db"
import { randomUUID } from "crypto";
import unzipper from "unzipper";
import { createReadStream, mkdirSync, writeFileSync, unlinkSync, cpSync } from "fs";
import path from "path";
import type { User } from "lucia";
import type { Utenti } from "$lib/types";
import paths from '$lib/assets/paths.json';

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
      const isTemplate = formData.get("using_template");
      const id = randomUUID();

      const uploadPath = `${paths.files}/${id}`;

      if (!isTemplate) {
        const fileField = formData.get("file");

        if (!fileField || !(fileField instanceof File)) {
          return { status: 400, body: "No file provided" };
        }

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

      } else {
        const templateName = formData.get("template");
        const templatePath = `${paths.templates}/${templateName}.glb`
        cpSync(templatePath, `${uploadPath}/scene.glb`, {recursive: true});
      }

      const user_id = event.locals.user.id;

      const [[owner]] = await pool.execute<Utenti[]>('select username from users where id = ?', [user_id]);  

      console.log(owner)

      let [query, params] = formatRow({
        name: label,
        state: "public",
        image,
        description,
        user_id,
        owner: owner.username,
        uuid: id
      })

      await pool.execute(`insert into rooms ${query}`, params);

      redirect(302, `/rooms/${id}`);
    }
};
