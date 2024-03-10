import { c as create_ssr_component, b as add_attribute, e as escape, v as validate_component, d as each } from './ssr-oU8yitx9.js';
import { _ as ___ASSET___0 } from './sfondo-6PjDhdCX.js';
import './client-_MkdHwD5.js';
import './exports-mq_1S73-.js';

const ___ASSET___1 = "/_app/immutable/assets/astronauta.0KiiCaQc.png";
const ___ASSET___2 = "/_app/immutable/assets/pianeta1.ZI8xcVIO.png";
const ___ASSET___3 = "/_app/immutable/assets/pianeta2.4dvtlcQE.png";
const ___ASSET___4 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24'%20viewBox='0%20-960%20960%20960'%20width='24'%3e%3cpath%20d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/%3e%3c/svg%3e";
const FilterBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { categories } = $$props;
  let { selected } = $$props;
  if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0)
    $$bindings.categories(categories);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  return `<div class="bg-slate-600 p-2 rounded-lg text-xl font-bold m-10 w-full flex justify-center">${each(categories || [], (name) => {
    return `<button class="${escape(selected == name ? "opacity-100" : "opacity-35", true) + " cursor-pointer mx-5 hover:opacity-80 transition"}">${escape(name)}</button>`;
  })}</div>`;
});
const Filters = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selected_categories } = $$props;
  let { categories_data } = $$props;
  let categories = [[], [], []];
  if ($$props.selected_categories === void 0 && $$bindings.selected_categories && selected_categories !== void 0)
    $$bindings.selected_categories(selected_categories);
  if ($$props.categories_data === void 0 && $$bindings.categories_data && categories_data !== void 0)
    $$bindings.categories_data(categories_data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        categories = [[], [], []];
        for (const [cat, _] of Object.entries(categories_data[0])) {
          categories[0].push(cat);
        }
        if (selected_categories[0])
          for (const cat of categories_data[0][selected_categories[0]]) {
            categories[1].push(cat);
          }
        if (selected_categories[1])
          for (const cat of categories_data[1][selected_categories[1]] || []) {
            categories[2].push(cat);
          }
      }
    }
    $$rendered = `<div class="w-full">${validate_component(FilterBar, "FilterBar").$$render(
      $$result,
      {
        categories: categories[0],
        selected: selected_categories[0]
      },
      {
        selected: ($$value) => {
          selected_categories[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${selected_categories[0] && categories[1].length > 0 ? `${validate_component(FilterBar, "FilterBar").$$render(
      $$result,
      {
        categories: categories[1],
        selected: selected_categories[1]
      },
      {
        selected: ($$value) => {
          selected_categories[1] = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``} ${selected_categories[1] && categories[2].length > 0 ? `${validate_component(FilterBar, "FilterBar").$$render(
      $$result,
      {
        categories: categories[2],
        selected: selected_categories[2]
      },
      {
        selected: ($$value) => {
          selected_categories[2] = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const css = {
  code: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');.svelte-1y59la7{color:white}.sfondo.svelte-1y59la7{background-color:rgb(23, 10, 49);height:100vh;width:100vw;position:fixed;transform:scale(1.2);margin:0}.page.svelte-1y59la7{position:fixed;pointer-events:none}.search.svelte-1y59la7,.page.svelte-1y59la7{width:100%;height:100vh}.search.svelte-1y59la7{padding-top:100%}.container.svelte-1y59la7{display:flex;margin:5%;justify-content:space-evenly;align-items:center;background-color:rgba(47, 79, 79, 0.5);max-width:90%;padding-bottom:20%;margin-top:0;flex-wrap:wrap}.astronauta.svelte-1y59la7{position:fixed;width:27%;height:auto;top:23.5%;left:7.25%;filter:drop-shadow(0 0 0.75rem rgba(255, 255, 255, 0.7))}.pianeta1.svelte-1y59la7{position:fixed;width:10%;height:auto;top:10%;left:35%;filter:drop-shadow(0 0 0.75rem rgba(107, 107, 179, 0.7))}.pianeta2.svelte-1y59la7{position:fixed;width:15%;height:auto;top:70%;right:15%;filter:drop-shadow(0 0 0.75rem rgba(105, 143, 171, 0.7))}h1.svelte-1y59la7{font-family:"Inter", sans-serif;font-weight:300;font-size:100px;letter-spacing:5px;word-spacing:10px;color:white;position:absolute;top:35%;left:45%;z-index:2;filter:drop-shadow(1rem 0 0.75rem rgb(23, 10, 49));animation:svelte-1y59la7-fade-in 3s}@keyframes svelte-1y59la7-fade-in{0%{opacity:0}100%{opacity:1}}.material-symbols-outlined.svelte-1y59la7{color:white;position:fixed;transform:scale(2);bottom:3%;left:50%}.search-container.svelte-1y59la7{position:relative;display:flex;justify-content:center;align-items:center;padding-top:25%;z-index:1}#search-icon.svelte-1y59la7{position:static;color:black;font-size:16px}input[type=text].svelte-1y59la7{border-radius:25px;color:white;width:30%;height:25px;outline:none;border:none;box-shadow:0 0 5px rgba(0, 0, 0, 0.3);background-color:rgb(55, 54, 54)}button[type=submit].svelte-1y59la7{border-radius:25px;width:38px;height:38px;display:flex;justify-content:center;align-items:center;padding:5px;margin-top:0;margin-left:-35px;border:none;background-color:#D67BFF;color:white;cursor:pointer;box-shadow:0 0 5px rgba(0, 0, 0, 0.3);transition:.15s ease}.svelte-1y59la7::-webkit-scrollbar{width:10px}.svelte-1y59la7::-webkit-scrollbar-track{background:#303030}.svelte-1y59la7::-webkit-scrollbar-thumb{background:#888;border-radius:10px}.svelte-1y59la7::-webkit-scrollbar-thumb:hover{background:#555}button[type=submit].svelte-1y59la7:hover{background-color:#a25ad0}.add_button.svelte-1y59la7{display:flex;justify-content:center;align-items:center;border:none;width:50px;height:50px;border-radius:60%;background-color:#D67BFF;color:white;padding:0.5%;text-decoration:none;margin-left:3%;transition:.15s ease}.add_button.svelte-1y59la7:hover{background-color:#a25ad0}.add.svelte-1y59la7{width:40px;height:auto}button.svelte-1y59la7{font-size:1.2em;transition:.3s ease;outline:none;cursor:pointer;display:block;justify-content:center;align-items:center;margin-top:20px;padding:15px;caret-color:transparent;text-align:center;color:white;border:2px solid white;border-radius:15px;background:transparent;width:12em}#filter.svelte-1y59la7{position:relative;display:grid;grid-template-columns:auto auto auto auto;justify-content:center;align-items:top;z-index:2}.title.svelte-1y59la7{text-align:center;padding:5px}button.svelte-1y59la7:not(.disabled):hover{color:black;background-color:white;filter:drop-shadow(0 0 0.75rem rgba(255, 255, 255, 0.7))}`,
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categories_data = [
    {
      "Art": ["1800", "Renaissance", "Painting"],
      "Biography": ["1900", "Biography"],
      "Sciences": ["2000", "Sciences"],
      "Science Fiction": ["2100", "Science Fiction"],
      "Geography": ["2200", "Geography"],
      "History": ["2300", "History"]
    },
    {
      "1800": ["1800", "Renaissance", "Painting"],
      "1900": ["1900", "Biography"]
    },
    {
      "2000": ["2000", "Sciences"],
      "2100": ["2100", "Science Fiction"]
    }
  ];
  let selected_categories = [];
  let { data } = $$props;
  let { form } = $$props;
  let y;
  let blurstring;
  let astronauta, pianeta1, pianeta2, sfondo;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        blurstring = `blur(${y / 150}px)`;
      }
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1j0wg18_START -->${$$result.title = `<title>Space 4 Art - Home</title>`, ""}<!-- HEAD_svelte-1j0wg18_END -->`, ""} <img class="sfondo svelte-1y59la7" alt="sfondo"${add_attribute("src", ___ASSET___0, 0)}${add_attribute("this", sfondo, 0)}> <div class="page svelte-1y59la7" style="${"-webkit-filter: " + escape(blurstring, true)}"><img${add_attribute("src", ___ASSET___1, 0)} alt="astronauta" class="astronauta svelte-1y59la7"${add_attribute("this", astronauta, 0)}> <img${add_attribute("src", ___ASSET___2, 0)} alt="pianeta1" class="pianeta1 svelte-1y59la7"${add_attribute("this", pianeta1, 0)}> <img${add_attribute("src", ___ASSET___3, 0)} alt="pianeta2" class="pianeta2 svelte-1y59la7"${add_attribute("this", pianeta2, 0)}> <h1 class="title svelte-1y59la7" data-svelte-h="svelte-1mfrti">SPACE 4 ART</h1> </div> <div class="search svelte-1y59la7"><form method="POST" action="?/search" class="svelte-1y59la7" data-svelte-h="svelte-xswzwh"><div class="search-container svelte-1y59la7"><input autocomplete="off" name="q" class="p-5 svelte-1y59la7" type="text" placeholder="Search for rooms or #tags" spellcheck="false"> <button type="submit" class="svelte-1y59la7"><span id="search-icon" class="material-symbols-outlined svelte-1y59la7">search</span></button> <a class="add_button svelte-1y59la7" href="/create/"><img${add_attribute("src", ___ASSET___4, 0)} alt="svg" class="add svelte-1y59la7"></a></div></form> <div id="filter" class="w-full svelte-1y59la7">${validate_component(Filters, "Filters").$$render(
      $$result,
      { categories_data, selected_categories },
      {
        selected_categories: ($$value) => {
          selected_categories = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="container svelte-1y59la7" id="rooms">${each(form?.feed || data?.feed || [], (room) => {
      return `<div class="card w-96 h-48 bg-base-100 my-10 shadow-xl hover:scale-105 transition cursor-pointer svelte-1y59la7"><img${add_attribute("src", room.image, 0)} alt="${"room_" + escape(room.id, true)}" class="rounded-2xl w-full h-full svelte-1y59la7"> <div class="w-full h-full card-body absolute bg-opacity-50 rounded-2xl bg-black svelte-1y59la7"><h2 class="text-center font-bold text-xl mb-2 svelte-1y59la7">${escape(room.name)}</h2> <p class="svelte-1y59la7">${escape(room.description)}</p></div> </div>`;
    })}</div></div> `;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-WVSiUDWM.js.map
