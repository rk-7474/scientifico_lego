import { p as pool } from './db-aQqvt4qL.js';
import 'mysql2/promise';

const load = async (event) => {
  const [feed] = await pool.query("select image, id, name, description, uuid from rooms limit 9");
  return {
    feed
  };
};
const actions = {
  search: async (event) => {
    const data = await event.request.formData();
    const search = data.get("q");
    const [feed] = await pool.query("select image, id, name, description, uuid from rooms where name like ?", [search + "%"]);
    return { feed };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-WVSiUDWM.js')).default;
const server_id = "src/routes/home/+page.server.ts";
const imports = ["_app/immutable/nodes/4.Rjb3Blje.js","_app/immutable/chunks/2.0OfY4fVd.js","_app/immutable/chunks/index.rEPfTm2O.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/sfondo.Be_BQm21.js","_app/immutable/chunks/entry.HojOTUtx.js","_app/immutable/chunks/forms._kcyD7rx.js"];
const stylesheets = ["_app/immutable/assets/4.N0cPHGTF.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-oSJfMTce.js.map
