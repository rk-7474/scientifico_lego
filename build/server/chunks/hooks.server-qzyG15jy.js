import { l as lucia } from './auth-qbz8NCiP.js';
import 'lucia';
import './prod-ssr-neY5j8Pr.js';
import '@lucia-auth/adapter-mysql';
import './db-aQqvt4qL.js';
import 'mysql2/promise';

const handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }
  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
  }
  event.locals.user = user;
  event.locals.session = session;
  return resolve(event);
};

export { handle };
//# sourceMappingURL=hooks.server-qzyG15jy.js.map
