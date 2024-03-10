import { r as redirect } from './index-RcZWwKaW.js';
import './auth-qbz8NCiP.js';
import { f as formatRow, p as pool } from './db-aQqvt4qL.js';
import { randomUUID } from 'crypto';
import unzipper from 'unzipper';
import { mkdirSync, writeFileSync, createReadStream, unlinkSync, cpSync } from 'fs';
import path from 'path';
import 'lucia';
import './prod-ssr-neY5j8Pr.js';
import '@lucia-auth/adapter-mysql';
import 'mysql2/promise';

const load = async (event) => {
  if (!event.locals.user)
    redirect(302, "/login?v=create");
  return;
};
const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const label = formData.get("label");
    const description = formData.get("desc");
    const image = formData.get("img");
    const isTemplate = formData.get("using_template");
    const id = randomUUID();
    const uploadPath = path.join(path.resolve(), `/static/files/${id}`);
    if (!isTemplate) {
      const fileField = formData.get("file");
      if (!fileField || !(fileField instanceof File)) {
        return { status: 400, body: "No file provided" };
      }
      mkdirSync(uploadPath, { recursive: true });
      const zipPath = `${uploadPath}/tempfile.zip`;
      const arrayBuffer = await fileField.arrayBuffer();
      console.log(fileField, arrayBuffer);
      const uint8Array = new Uint8Array(arrayBuffer);
      writeFileSync(zipPath, uint8Array);
      await createReadStream(zipPath).pipe(unzipper.Extract({ path: uploadPath })).promise();
      unlinkSync(zipPath);
    } else {
      const templateName = formData.get("template");
      const templatePath = path.join(path.resolve(), `/static/templates/${templateName}`);
      cpSync(templatePath, uploadPath, { recursive: true });
    }
    let [query, params] = formatRow({
      name: label,
      state: "public",
      image,
      description,
      user_id: event.locals.user.id,
      uuid: id
    });
    await pool.execute(`insert into rooms ${query}`, params);
    redirect(302, `/rooms/${id}`);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-YzojxxMa.js')).default;
const server_id = "src/routes/create/+page.server.ts";
const imports = ["_app/immutable/nodes/3.rOcVd_X1.js","_app/immutable/chunks/2.0OfY4fVd.js","_app/immutable/chunks/index.rEPfTm2O.js","_app/immutable/chunks/sfondo.Be_BQm21.js"];
const stylesheets = ["_app/immutable/assets/3.a2aKwU4n.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-ax5lIzoW.js.map
