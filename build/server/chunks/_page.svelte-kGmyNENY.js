import { c as create_ssr_component, d as each, b as add_attribute, e as escape } from './ssr-oU8yitx9.js';
import './client-_MkdHwD5.js';
import './exports-mq_1S73-.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  let editors_list = data?.editors || [];
  let search_results = [];
  const room_id = data.room.id;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  {
    {
      search_results = form?.results.filter((elem) => !(elem.username === data.username || editors_list.some((editor) => editor.username === elem.username))) || [];
    }
  }
  return `${$$result.head += `<!-- HEAD_svelte-1t2a41c_START -->${$$result.title = `<title>Space 4 Art - Room</title>`, ""}<!-- HEAD_svelte-1t2a41c_END -->`, ""} <h3 data-svelte-h="svelte-11vfj18">Editors</h3> ${each(editors_list, ({ username, user_id }) => {
    return `<button>${escape(username)}</button><br>`;
  })} <hr> <form action="?/search" method="post" data-svelte-h="svelte-jgoezf"><input type="text" name="q" class="border-gray-500 border"> <button>Search</button></form> ${each(search_results, ({ username, id }) => {
    return `<button>${escape(username)}</button><br>`;
  })} <hr> <h3 data-svelte-h="svelte-1qq2p5h">Settings</h3> <h2 data-svelte-h="svelte-1y2gvx5">Room visibility</h2> <form action="?/save" method="post"><input type="hidden" name="room_id"${add_attribute("value", room_id, 0)} class="hidden"> <input type="radio" name="visibility" id="public" value="public" ${data?.room?.state == "public" ? "checked" : ""} required> <label for="public" data-svelte-h="svelte-c0zete">Public</label><br> <input type="radio" name="visibility" id="private" value="private" ${data?.room?.state == "private" ? "checked" : ""} required> <label for="private" data-svelte-h="svelte-tqk540">Private</label><br> <input type="radio" name="visibility" id="reserved" value="reserved" ${data?.room?.state == "reserved" ? "checked" : ""} required> <label for="reserved" data-svelte-h="svelte-xzgui">Reserved</label><br> <button type="submit" data-svelte-h="svelte-1f2bxem">Save</button></form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-kGmyNENY.js.map
