import { l as lucia } from './auth-qbz8NCiP.js';
import { r as redirect, f as fail } from './index-RcZWwKaW.js';
import { p as pool } from './db-aQqvt4qL.js';
import { Argon2id } from 'oslo/password';
import 'lucia';
import './prod-ssr-neY5j8Pr.js';
import '@lucia-auth/adapter-mysql';
import 'mysql2/promise';

const load = async (event) => {
  if (event.locals.user)
    redirect(302, "/profile");
  return {};
};
const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    const page_redirect = formData.get("visit");
    console.log(page_redirect);
    if (typeof username !== "string" || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
      return fail(400, {
        message: "Invalid username"
      });
    }
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
      return fail(400, {
        message: "Invalid password"
      });
    }
    const [rows] = await pool.execute("select * from users where username = ?", [username]);
    const existingUser = rows[0];
    if (!existingUser) {
      return fail(400, {
        message: "Incorrect username or password"
      });
    }
    const validPassword = await new Argon2id().verify(existingUser.password, password);
    if (!validPassword) {
      return fail(400, {
        message: "Incorrect username or password"
      });
    }
    const session = await lucia.createSession(`${existingUser.id}`, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
    redirect(302, `/${page_redirect}`);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-4Jlu_glc.js')).default;
const server_id = "src/routes/login/+page.server.ts";
const imports = ["_app/immutable/nodes/5.zaPaOWIq.js","_app/immutable/chunks/2.0OfY4fVd.js","_app/immutable/chunks/index.rEPfTm2O.js","_app/immutable/chunks/entry.HojOTUtx.js","_app/immutable/chunks/FormInput.-MPHLFNq.js","_app/immutable/chunks/stores.9fYVw_8d.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-e94oMFvb.js.map
