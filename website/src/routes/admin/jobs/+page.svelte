<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Pagination from '$lib/components/pagination/pagination.svelte';
	import { addAlert } from '$lib/modules/interaction/alerter';
	import type { Job } from '@prisma/client';
	import type { PageData } from './$types';

	export let data: PageData;

	async function retryJob(jobId: string) {
		const res = await fetch(`/api/jobs/${jobId}/retry`, { method: 'POST' });

		if (res.ok) {
			const job: Job = await res.json();

			data.jobs = data.jobs.map((j) => {
				console.log(j.uid, job.uid);

				if (j.uid === job.uid) {
					j.status = job.status;
				}

				return j;
			});
		} else {
			addAlert({
				type: 'error',
				message: 'Failed to retry job'
			});
		}
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-row justify-between items-baseline">
		<Pagination pagination={data.pagination} url={$page.url.href} />

		<button
			class="btn btn-ghost"
			on:click={() => {
				invalidateAll();
			}}
		>
			<i class="fa-solid fa-refresh" />
		</button>
	</div>

	<div class="overflow-x-auto">
		<table class="table table-zebra w-full">
			<thead>
				<tr>
					<th />
					<th>Type</th>
					<th>Title</th>
					<th>Status</th>
					<th>Progress</th>
					<th>Created @</th>
					<th>Updated @</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.jobs as job, i}
					<tr>
						<td>{i + 1}</td>
						<td>{job.type}</td>
						<td>{job.media?.post?.title}</td>
						<td>
							{#if job.status === 'RUNNING'}
								{Math.round(
									(((job.updatedAt.getTime() - job.createdAt.getTime()) / job.progress) *
										(100 - job.progress)) /
										1000 /
										60
								)}m remaining
							{:else}
								{job.status}
							{/if}
						</td>
						<td>
							{#if job.status === 'FAILED'}
								<kbd class="text-error">
									{job.error?.slice(0, 50)}
								</kbd>
							{:else if job.status !== 'QUEUED'}
								<progress
									class="progress w-56 mr-2"
									class:progress-primary={job.progress < 100}
									class:progress-success={job.progress === 100}
									value={job.progress}
									max="100"
								/>

								({job.progress}%)
							{/if}
						</td>
						<td>{job.createdAt.toLocaleString()}</td>
						<td>{job.updatedAt.toLocaleString()}</td>
						<td>
							<button class="btn btn-sm btn-error"> Stop </button>
							{#if job.status === 'FAILED'}
								<button
									class="btn btn-sm btn-primary"
									on:click={() => {
										retryJob(job.uid);
									}}
								>
									Retry
								</button>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
