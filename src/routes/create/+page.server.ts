import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";
import { client as db } from "$lib/server/db"
import { randomUUID } from "crypto";
import unzipper from "unzipper";
import { mkdir, writeFile, createReadStream, unlink, mkdirSync, writeFileSync, unlinkSync } from "fs";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "/login");
  return;
};
export const actions: Actions = {
    default: async(event: any) => {
      try {
        const formData = await event.request.formData();
        const label = formData.get("label");
        const desc = formData.get("desc");
        const img = formData.get("img");
        const fileField = formData.get("file");

        if (!fileField || !(fileField instanceof File)) {
          return { status: 400, body: "No file provided" };
        }

        const id = randomUUID();

        const uploadPath = `../../files/${id}`;

        mkdirSync(uploadPath, {recursive: true});
        
        const zipPath = `${uploadPath}/tempfile.zip`;

        const arrayBuffer = await fileField.arrayBuffer();

        const uint8Array = new Uint8Array(arrayBuffer);

        writeFileSync(zipPath, uint8Array);

        await createReadStream(zipPath)
            .pipe(unzipper.Extract({ path: uploadPath }))
            .promise();
      
        await unlinkSync(zipPath);

        await db.stanze.create({
          data: {
            id_stanza: id,
            nome: label,
            stato: "pubblica"
          }
        });

        redirect(302, `/rooms/${id}`);
      
      } catch (error) {
        console.error("Error handling file upload:", error);
        return { status: 500, body: "Internal Server Error" };
      }
    }
};
