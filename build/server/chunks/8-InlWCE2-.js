import { p as pool } from './db-aQqvt4qL.js';
import { h as hasPerms } from './perms-BYMvbViO.js';
import 'mysql2/promise';

const load = async ({ request, locals, params }) => {
  const id = params.roomid;
  const [[room]] = await pool.execute("select * from rooms where uuid = ?", [id]);
  if (!room)
    return;
  const [frames] = await pool.execute("select * from scenes where room_id = ?", [room.id]);
  const perms = await hasPerms(room.id.toString(), locals.user?.id);
  return {
    room,
    frames,
    id,
    perms
  };
};
const actions = {
  info: async (event) => {
    const formData = await event.request.formData();
    const url = formData.get("url");
    const title = formData.get("title");
    const desc = formData.get("desc");
    const tags = formData.get("tags");
    return {
      done: "info",
      info: {
        url,
        title,
        desc,
        tags
      }
    };
  }
  // const url = "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-p2mgWhuT.js')).default;
const server_id = "src/routes/rooms/[roomid]/+page.server.ts";
const imports = ["_app/immutable/nodes/8.X6Sl4EJk.js","_app/immutable/chunks/2.0OfY4fVd.js","_app/immutable/chunks/index.rEPfTm2O.js","_app/immutable/chunks/entry.HojOTUtx.js","_app/immutable/chunks/forms._kcyD7rx.js"];
const stylesheets = ["_app/immutable/assets/8.k_o4nb2C.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-InlWCE2-.js.map
