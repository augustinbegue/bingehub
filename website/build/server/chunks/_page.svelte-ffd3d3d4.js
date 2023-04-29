import { c as create_ssr_component, a as subscribe, v as validate_component, e as each, f as add_attribute, d as escape } from './index3-84056cf6.js';
import { p as page } from './stores-d43666c0.js';
import { P as Pagination, M as Modal } from './pagination-dd9ef5f5.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let createUserModal;
  let editUserModal;
  let modalUser;
  let { data } = $$props;
  let newUser = {
    username: "",
    password: "",
    confirmPassword: ""
  };
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
				<th>Username</th>
				<th>Created @</th>
				<th>Updated @</th>
				<th>Active</th>
				<th>Actions</th></tr></thead>
		<tbody>${each(data.users, (user, i) => {
      return `<tr><td>${escape(i + 1)}</td>
					<td>${escape(user.username)}</td>
					<td>${escape(user.createdAt.toLocaleString())}</td>
					<td>${escape(user.updatedAt.toLocaleString())}</td>
					<td><input class="toggle" type="checkbox"${add_attribute("checked", user.isActive, 1)}></td>
					<td><button class="btn btn-sm btn-primary">Edit
						</button>
						<button class="btn btn-sm btn-error">Delete</button></td>
				</tr>`;
    })}</tbody></table></div>

${validate_component(Modal, "Modal").$$render(
      $$result,
      { this: createUserModal },
      {
        this: ($$value) => {
          createUserModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="card-body"><h1 class="text-2xl">New user</h1>
		<div class="form-control"><label class="label"><span class="label-text">username</span></label>
			<input type="text" placeholder="username" class="input input-bordered"${add_attribute("value", newUser.username, 0)}></div>
		<div class="form-control"><label class="label"><span class="label-text">password</span></label>
			<input type="password" placeholder="password" class="input input-bordered"${add_attribute("value", newUser.password, 0)}></div>
		<div class="form-control"><label class="label"><span class="label-text">confirm password</span></label>
			<input type="password" placeholder="confirm password" class="input input-bordered"${add_attribute("value", newUser.confirmPassword, 0)}></div>
		<div class="form-control mt-6"><button class="btn btn-primary">Create</button></div></div>`;
        }
      }
    )}

${validate_component(Modal, "Modal").$$render(
      $$result,
      { this: editUserModal },
      {
        this: ($$value) => {
          editUserModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="card-body"><h1 class="text-2xl">Edit User @${escape(modalUser.username)}</h1>
		<div class="form-control"><label class="label"><span class="label-text">username</span></label>
			<input type="text" placeholder="username" class="input input-bordered"${add_attribute("value", modalUser.username, 0)}></div>
		<div class="form-controls"><label class="label"><span class="label-text">Roles</span></label>
			<div class="flex flex-col flex-wrap">${each(data.roles, (role) => {
            return `<label class="label cursor-pointer"><span class="label-text">${escape(role.name)}</span>
						<input type="checkbox" class="checkbox" ${!!modalUser.roles.find((r) => r.uid === role.uid) ? "checked" : ""}>
					</label>`;
          })}</div>
			<div class="form-control mt-6"><button class="btn btn-primary">Save</button></div></div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-ffd3d3d4.js.map
