import { Lucia } from 'lucia';
import { D as DEV } from './prod-ssr-neY5j8Pr.js';
import { Mysql2Adapter } from '@lucia-auth/adapter-mysql';
import { p as pool } from './db-aQqvt4qL.js';

const dev = DEV;
const adapter = new Mysql2Adapter(pool, {
  user: "users",
  session: "sessions"
});
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username
    };
  }
});

export { lucia as l };
//# sourceMappingURL=auth-qbz8NCiP.js.map
