import { c as create_ssr_component, a as subscribe, v as validate_component, e as each, f as add_attribute, d as escape } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
import { P as Pagination, M as Modal } from "../../../../chunks/pagination.js";
import { PostSubType, MediaType } from "@prisma/client";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let createUserModal;
  let { data } = $$props;
  let newMedia = {
    title: "",
    content: "",
    type: "MEDIA",
    subType: "",
    mediaType: "",
    mediaUrl: ""
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="flex flex-col"><div class="flex flex-row mb-4"><button class="btn btn-primary">Create </button></div>

	${validate_component(Pagination, "Pagination").$$render(
      $$result,
      {
        pagination: data.pagination,
        url: $page.url.href
      },
      {},
      {}
    )}

	<div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th></th>
					<th>Title</th>
					<th>Created @</th>
					<th>Updated @</th>
					<th>Active</th>
					<th>Actions</th></tr></thead>
			<tbody>${each(data.posts, (post, i) => {
      return `<tr><td>${escape(i)}</td>
						<td>${escape(post.title)}</td>
						<td>${escape(post.media?.url)}</td>
						<td>${escape(post.createdAt.toLocaleString())}</td>
						<td>${escape(post.updatedAt.toLocaleString())}</td>
						<td><input class="toggle" type="checkbox"${add_attribute("checked", post.isActive, 1)}></td>
						<td><button class="btn btn-sm btn-primary">Edit</button>
							<button class="btn btn-sm btn-error">Delete</button></td>
					</tr>`;
    })}</tbody></table></div></div>

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
          return `<div class="card-body w-96"><h1 class="text-2xl">New media</h1>
		<div class="form-control mt-6"><label class="label"><span class="label-text">Title</span></label>
			<input class="input input-bordered" type="text"${add_attribute("value", newMedia.title, 0)}></div>
		<div class="form-control mt-6"><label class="label"><span class="label-text">Content</span></label>
			<textarea class="textarea textarea-bordered">${""}</textarea></div>
		<div class="form-control mt-6"><label class="label"><span class="label-text">Sub type</span></label>
			<select class="select select-bordered">${each(Object.keys(PostSubType), (type) => {
            return `<option${add_attribute("value", type, 0)}>${escape(type)}</option>`;
          })}</select></div>
		<div class="form-control mt-6"><label class="label"><span class="label-text">Media type</span></label>
			<select class="select select-bordered">${each(Object.keys(MediaType), (type) => {
            return `<option${add_attribute("value", type, 0)}>${escape(type)}</option>`;
          })}</select></div>
		<div class="form-control mt-6"><label class="label"><span class="label-text">Media url</span></label>
			<input class="input input-bordered" type="text"${add_attribute("value", newMedia.mediaUrl, 0)}></div>
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
