import { p as pool } from './db-aQqvt4qL.js';
import './index-RcZWwKaW.js';
import 'mysql2/promise';

const GET = async (request) => {
  if (!request.locals.user?.id)
    ;
  const query = request.url.searchParams.get("q");
  if (!query)
    return new Response(JSON.stringify([]));
  const [users] = await pool.execute("select id, username from users where username LIKE ?", [query + "%"]);
  console.log(users, query);
  return new Response(JSON.stringify(users));
};

export { GET };
//# sourceMappingURL=_server.ts-sBWcf1b6.js.map
