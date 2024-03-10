import { p as pool } from './db-aQqvt4qL.js';
import { r as redirect } from './index-RcZWwKaW.js';
import 'mysql2/promise';

const load = async (event) => {
  const id = event.params.roomid;
  const user_data = event.locals.user;
  if (!user_data)
    redirect(302, "/login");
  const [[room]] = await pool.execute("select * from rooms where uuid = ?", [id]);
  const [editors] = await pool.execute("select * from editors where room_id = ?", [room.id]);
  if (room.user_id !== Number(user_data.id))
    redirect(302, "/profile");
  return {
    username: user_data.username,
    room,
    id,
    editors
  };
};
const actions = {
  save: async (event) => {
    const formData = await event.request.formData();
    const state = formData.get("visibility");
    const id = formData.get("room_id");
    pool.execute("update rooms set state = ? where id = ?", [state, id]);
  },
  search: async (event) => {
    const formData = await event.request.formData();
    const query = formData.get("q");
    console.log(query);
    if (!query)
      return { results: [] };
    const [search] = await pool.execute("select id, username from users where username LIKE ?", [query + "%"]);
    return { results: search };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-kGmyNENY.js')).default;
const server_id = "src/routes/manage/[roomid]/+page.server.ts";
const imports = ["_app/immutable/nodes/6._Nod23_v.js","_app/immutable/chunks/2.0OfY4fVd.js","_app/immutable/chunks/index.rEPfTm2O.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/forms._kcyD7rx.js","_app/immutable/chunks/entry.HojOTUtx.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-n0w5dwHU.js.map
