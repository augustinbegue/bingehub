import { c as create_ssr_component, a as subscribe, v as validate_component, e as each, f as add_attribute, d as escape } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { P as Pagination } from "../../../../chunks/pagination.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let createRoleModal;
  let { data } = $$props;
  let newRole = { name: "" };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="overflow-x-auto flex flex-col"><div class="flex flex-row mb-4"><button class="btn btn-primary">Create </button></div>

	${validate_component(Pagination, "Pagination").$$render(
      $$result,
      {
        pagination: data.pagination,
        url: $page.url.href
      },
      {},
      {}
    )}

	<table class="table table-zebra w-full"><thead><tr><th></th>
				<th>Name</th>
				<th>Users</th>
				<th>Created @</th>
				<th>Updated @</th>
				<th>Active</th>
				<th>Actions</th></tr></thead>
		<tbody>${each(data.roles, (role, i) => {
      return `<tr><td>${escape(i + 1)}</td>
					<td>${escape(role.name)}</td>
					<td>${escape(role._count.users)}</td>
					<td>${escape(role.createdAt.toLocaleString())}</td>
					<td>${escape(role.updatedAt.toLocaleString())}</td>
					<td><input class="toggle toggle-primary" type="checkbox"${add_attribute("checked", role.isActive, 1)}></td>
					<td><button class="btn btn-sm btn-primary">Edit</button>
						<button class="btn btn-sm btn-error">Delete</button></td>
				</tr>`;
    })}</tbody></table></div>

${validate_component(Modal, "Modal").$$render(
      $$result,
      { this: createRoleModal },
      {
        this: ($$value) => {
          createRoleModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="card-body"><h1 class="text-2xl">New role</h1>
		<div class="form-control"><label class="label"><span class="label-text">name</span></label>
			<input type="text" placeholder="name" class="input input-bordered"${add_attribute("value", newRole.name, 0)}></div>
		<div class="form-control mt-6"><button class="btn btn-primary">Create</button></div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};
