import { c as create_ssr_component, a as subscribe, v as validate_component, e as each, d as escape, f as add_attribute } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
import { P as Pagination } from "../../../../chunks/pagination.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  return `<div class="flex flex-col"><div class="flex flex-row justify-between items-baseline">${validate_component(Pagination, "Pagination").$$render(
    $$result,
    {
      pagination: data.pagination,
      url: $page.url.href
    },
    {},
    {}
  )}

		<button class="btn btn-ghost"><i class="fa-solid fa-refresh"></i></button></div>

	<div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr><th></th>
					<th>Type</th>
					<th>Title</th>
					<th>Status</th>
					<th>Progress</th>
					<th>Created @</th>
					<th>Updated @</th>
					<th>Actions</th></tr></thead>
			<tbody>${each(data.jobs, (job, i) => {
    return `<tr><td>${escape(i + 1)}</td>
						<td>${escape(job.type)}</td>
						<td>${escape(job.media?.post?.title)}</td>
						<td>${job.status === "RUNNING" ? `${escape(Math.round((job.updatedAt.getTime() - job.createdAt.getTime()) / job.progress * (100 - job.progress) / 1e3 / 60))}m remaining` : `${escape(job.status)}`}</td>
						<td>${job.status === "FAILED" ? `<kbd class="text-error">${escape(job.error)}
								</kbd>` : `<progress class="${[
      "progress w-56",
      (job.progress < 100 ? "progress-primary" : "") + " " + (job.progress === 100 ? "progress-success" : "")
    ].join(" ").trim()}"${add_attribute("value", job.progress, 0)} max="100"></progress>`}</td>
						<td>${escape(job.createdAt.toLocaleString())}</td>
						<td>${escape(job.updatedAt.toLocaleString())}</td>
						<td><button class="btn btn-sm btn-error">Stop </button>
							${job.status === "FAILED" ? `<button class="btn btn-sm btn-primary">Retry </button>` : ``}</td>
					</tr>`;
  })}</tbody></table></div></div>`;
});
export {
  Page as default
};
