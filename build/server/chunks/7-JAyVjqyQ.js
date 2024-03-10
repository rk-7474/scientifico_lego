import { r as redirect, f as fail } from './index-RcZWwKaW.js';
import { l as lucia } from './auth-qbz8NCiP.js';
import { p as pool } from './db-aQqvt4qL.js';
import 'lucia';
import './prod-ssr-neY5j8Pr.js';
import '@lucia-auth/adapter-mysql';
import 'mysql2/promise';

const load = async (event) => {
  if (!event.locals.user)
    redirect(302, "/login?v=profile");
  const user_data = event.locals.user;
  const [rooms] = await pool.query("select * from rooms where user_id = ?", [user_data.id]);
  return {
    rooms
  };
};
const actions = {
  default: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
    redirect(302, "/login");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-hhh-Kqow.js')).default;
const server_id = "src/routes/profile/+page.server.ts";
const imports = ["_app/immutable/nodes/7.TV3Y1GX-.js","_app/immutable/chunks/2.0OfY4fVd.js","_app/immutable/chunks/index.rEPfTm2O.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/forms._kcyD7rx.js","_app/immutable/chunks/entry.HojOTUtx.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-JAyVjqyQ.js.map
