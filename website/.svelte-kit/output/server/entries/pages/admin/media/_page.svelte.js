import { c as create_ssr_component, a as subscribe, v as validate_component, d as escape, f as add_attribute, e as each } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { P as Pagination } from "../../../../chunks/pagination.js";
import { PostSubType, MediaType, JobType } from "@prisma/client";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let checkedData;
  let allChecked;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let createMediaModal;
  let newMedia = {
    title: "",
    content: "",
    type: "MEDIA",
    subType: "",
    mediaType: "",
    mediaUrl: ""
  };
  let editMediaModal;
  let editedMedia = {
    uid: "",
    title: "",
    content: "",
    type: "MEDIA",
    subType: "",
    mediaType: "",
    mediaUrl: "",
    isActive: true
  };
  let importFolderModal;
  let importFolderModalStepsContainer;
  let importFolderModalSectionsContainer;
  let importedFolder = { title: "", mediaType: "", paths: [] };
  let importedFolderFiles = [];
  let createJobModal;
  let newJob = { type: "", data: "{}", mediaUid: "" };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    checkedData = data.posts.filter((p) => p.checked);
    allChecked = checkedData.length === data.posts.length;
    $$rendered = `<div class="flex flex-col"><div class="flex flex-row justify-between items-baseline">${validate_component(Pagination, "Pagination").$$render(
      $$result,
      {
        pagination: data.pagination,
        url: $page.url.href
      },
      {},
      {}
    )}

		<p class="text-sm opacity-50 p-4">Selected: ${escape(checkedData.length)}</p>

		<div class="btn-group"><button class="btn btn-primary">Create </button>
			<button class="btn btn-primary">Import Folder </button>
			<button class="btn btn-secondary">Create Job </button>
			<button class="btn btn-error">Delete</button></div></div>

	<div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th><input class="checkbox checkbox-xs mt-2" type="checkbox"${add_attribute("checked", allChecked, 1)}></th>
					<th>Title</th>
					<th>Transcoded</th>
					<th>Thumbnail</th>
					<th>Created @</th>
					<th>Updated @</th>
					<th>Active</th>
					<th>Actions</th></tr></thead>
			<tbody>${each(data.posts, (post, i) => {
      return `<tr><td><input class="checkbox checkbox-xs mt-2" type="checkbox"${add_attribute("checked", post.checked, 1)}></td>
						<td>${escape(post.title)}</td>
						<td>${post.media?.url.endsWith(".mpd") ? `<span class="badge badge-success">Yes</span>` : `<span class="badge badge-error">No</span>`}</td>
						<td>${post.media?.thumbnailDataUrl?.length ? `<span class="badge badge-success">Yes</span>` : `<span class="badge badge-error">No</span>`}</td>
						<td>${escape(post.createdAt.toLocaleString())}</td>
						<td>${escape(post.updatedAt.toLocaleString())}</td>
						<td><input class="toggle mt-2" type="checkbox"${add_attribute("checked", post.isActive, 1)}></td>
						<td><div class="btn-group"><button class="btn btn-outline btn-sm btn-primary">Edit
								</button>
								<button class="btn btn-outline btn-sm btn-error">Delete
								</button>
							</div></td>
					</tr>`;
    })}</tbody></table></div></div>

${validate_component(Modal, "Modal").$$render(
      $$result,
      { this: createMediaModal },
      {
        this: ($$value) => {
          createMediaModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<h1 class="text-2xl">New media</h1>
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
	<div class="form-control mt-6"><button class="btn btn-primary">Create</button></div>`;
        }
      }
    )}

${validate_component(Modal, "Modal").$$render(
      $$result,
      { this: editMediaModal },
      {
        this: ($$value) => {
          editMediaModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<h1 class="text-2xl">Edit media</h1>
	<div class="form-control mt-6"><label class="label"><span class="label-text">Title</span></label>
		<input class="input input-bordered" type="text"${add_attribute("value", editedMedia.title, 0)}></div>
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
		<textarea class="textarea textarea-bordered">${""}</textarea></div>
	<div><label class="label"><span class="label-text">Active</span></label>
		<label class="cursor-pointer label"><input type="checkbox" class="checkbox"${add_attribute("checked", editedMedia.isActive, 1)}>
			<span class="label-text">Active</span></label></div>
	<div class="form-control mt-6"><button class="btn btn-primary">Edit</button></div>`;
        }
      }
    )}

${validate_component(Modal, "Modal").$$render(
      $$result,
      { this: importFolderModal },
      {
        this: ($$value) => {
          importFolderModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<h1 class="text-2xl">Import media folder</h1>
	<ul class="steps mt-4"${add_attribute("this", importFolderModalStepsContainer, 0)}><li class="step step-primary">Choose folder</li>
		<li class="step">Confirm files</li>
		<li class="step">Result</li></ul>
	<div${add_attribute("this", importFolderModalSectionsContainer, 0)}><section class="flex flex-col"><div class="form-control mt-6"><label class="label"><span class="label-text">Title</span></label>
				<input class="input input-bordered" type="text"${add_attribute("value", importedFolder.title, 0)}></div>
			<div class="form-control mt-6"><label class="label"><span class="label-text">Media Type</span></label>
				<select class="select select-bordered">${each(Object.keys(MediaType), (type) => {
            return `${type != "VIDEO_LINKED" ? `<option${add_attribute("value", type, 0)}>${escape(type)}</option>` : ``}`;
          })}</select>
				${``}</div>
			<div class="form-control mt-6"><button class="btn btn-primary">Import</button></div></section>
		<section class="flex flex-col"><div class="flex flex-col gap-4 overflow-x-auto max-h-full"><table class="table table-zebra w-full"><thead><tr><th>Generated Title</th>
							<th>File name</th>
							<th>Actions</th></tr></thead>
					<tbody>${each(importedFolderFiles, (file) => {
            return `<tr><td><input type="text" class="w-fit"${add_attribute("value", file.title, 0)}></td>
								<td><kbd>${escape(file.path)}</kbd></td>
								<td><button class="btn btn-sm btn-primary">Remove
									</button></td>
							</tr>`;
          })}</tbody></table>

				<div class="form-control mt-6"><button class="btn btn-primary">Import</button></div></div></section></div>`;
        }
      }
    )}

${validate_component(Modal, "Modal").$$render(
      $$result,
      { this: createJobModal },
      {
        this: ($$value) => {
          createJobModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<h1 class="text-2xl">Create new Job</h1>
	<div class="form-control mt-6"><label class="label" for="jobType"><span class="label-text">Job Type</span></label>
		<select name="jobType" class="select select-bordered">${each(Object.keys(JobType), (type) => {
            return `${type != "UPLOAD" ? `<option${add_attribute("value", type, 0)}>${escape(type)}</option>` : ``}`;
          })}</select></div>
	<div class="form-control mt-6"><label class="label" for="jobData"><span class="label-text">Job Data</span></label>
		<textarea name="jobData" class="textarea textarea-bordered" placeholder="JSON data">${newJob.data}</textarea></div>
	<div class="form-control mt-6"><button class="btn btn-secondary">Create</button></div>`;
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
