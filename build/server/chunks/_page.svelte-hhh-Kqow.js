import { c as create_ssr_component, d as each, e as escape } from './ssr-oU8yitx9.js';
import './client-_MkdHwD5.js';
import './exports-mq_1S73-.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<form method="post"><button data-svelte-h="svelte-2si3cn">Sign out</button> ${each(data.rooms, (room) => {
    return `<div class="flex flex-row gap-4"><p>${escape(room.name)}</p> <p>${escape(room.state)}</p> <p>${escape(room.description)}</p> <a href="${"/manage/" + escape(room.uuid, true)}">manage</a> </div>`;
  })}</form>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-hhh-Kqow.js.map
