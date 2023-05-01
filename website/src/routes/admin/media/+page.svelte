<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Modal from '$lib/components/modals/Modal.svelte';
	import Pagination from '$lib/components/pagination/pagination.svelte';
	import { alerts } from '$lib/modules/interaction/alerter';
	import { Steps } from '$lib/modules/interaction/steps';
	import type { PageData } from './$types';
	import type { Post } from '@prisma/client';

	const MediaType = {
		VIDEO_UPLOADED: 'VIDEO_UPLOADED',
		VIDEO_LINKED: 'VIDEO_LINKED',
		VIDEO_HARDLINKED: 'VIDEO_HARDLINKED'
	};
	const PostSubType = {
		MOVIE: 'MOVIE',
		SERIES: 'SERIES',
		LIVE: 'LIVE'
	};
	const JobType = {
		TRANSCODE: 'TRANSCODE',
		THUMBNAIL: 'THUMBNAIL',
		UPLOAD: 'UPLOAD'
	};

	export let data: PageData;

	$: checkedData = data.posts.filter((p) => p.checked);
	$: allChecked = checkedData.length === data.posts.length;

	async function deleteCheckedData() {
		let promises = checkedData.map((p) => fetch(`/api/medias/${p.uid}/delete`, { method: 'POST' }));

		let res = await Promise.all(promises);

		if (res.every((r) => r.ok)) {
			alerts.update((alerts) => [
				...alerts,
				{ type: 'success', message: `${promises.length} media deleted` }
			]);
			invalidateAll();
		} else {
			alerts.update((alerts) => [...alerts, { type: 'error', message: 'Failed to delete media' }]);
		}
	}

	let createMediaModal: Modal;
	let newMedia = {
		title: '',
		content: '',
		type: 'MEDIA',
		subType: '',
		mediaType: '',
		mediaUrl: ''
	};
	async function createMedia() {
		let res = await fetch('/api/medias/create', {
			method: 'POST',
			body: JSON.stringify(newMedia)
		});

		if (res.ok) {
			alerts.update((alerts) => [...alerts, { type: 'success', message: 'Media created' }]);
			createMediaModal.close();
			invalidateAll();
		} else {
			alerts.update((alerts) => [...alerts, { type: 'error', message: 'Failed to create media' }]);
		}
	}

	async function deleteMedia(media: Post) {
		let res = await fetch(`/api/medias/${media.uid}/delete`, {
			method: 'POST'
		});

		if (res.ok) {
			alerts.update((alerts) => [
				...alerts,
				{ type: 'success', message: `Media ${media.title} deleted` }
			]);
			invalidateAll();
		} else {
			alerts.update((alerts) => [...alerts, { type: 'error', message: 'Failed to delete media' }]);
		}
	}

	let editMediaModal: Modal;
	let editedMedia = {
		uid: '',
		title: '',
		content: '',
		type: 'MEDIA',
		subType: '',
		mediaType: '',
		mediaUrl: '',
		isActive: true
	};
	async function editMedia() {
		let res = await fetch(`/api/medias/${editedMedia.uid}/edit`, {
			method: 'POST',
			body: JSON.stringify(editedMedia)
		});

		if (res.ok) {
			alerts.update((alerts) => [...alerts, { type: 'success', message: 'Media edited' }]);
			editMediaModal.close();
			invalidateAll();
		} else {
			alerts.update((alerts) => [...alerts, { type: 'error', message: 'Failed to edit media' }]);
		}
	}

	let importFolderModal: Modal;
	let importFolderModalStepsContainer: HTMLUListElement;
	let importFolderModalSectionsContainer: HTMLDivElement;
	let importFolderModalSteps: Steps;
	let importedFolder = {
		title: '',
		mediaType: '',
		paths: []
	};
	let importedFolderFiles: {
		basePath: string;
		path: string;
		title: string;
	}[] = [];
	$: {
		if (importFolderModalStepsContainer && importFolderModalSectionsContainer) {
			importFolderModalSteps = new Steps(
				importFolderModalStepsContainer,
				importFolderModalSectionsContainer
			);
		}
	}
	async function importFolder() {
		let res = await fetch('/api/medias/import', {
			method: 'POST',
			body: JSON.stringify(importedFolder)
		});

		if (res.ok) {
			importedFolderFiles = (await res.json()).medias;
			importFolderModalSteps.nextStep();
		} else {
			alerts.update((alerts) => [...alerts, { type: 'error', message: 'Failed to import folder' }]);
		}
	}
	async function importFolderFiles() {
		const promises: Promise<Response>[] = [];

		for (let i = 0; i < importedFolderFiles.length; i++) {
			const file = importedFolderFiles[i];

			promises.push(
				fetch('/api/medias/create', {
					method: 'POST',
					body: JSON.stringify({
						title: file.title,
						mediaType: importedFolder.mediaType,
						mediaUrl: file.basePath + '/' + file.path,
						content: file.title,
						type: 'MEDIA',
						subType: 'SERIES'
					})
				})
			);
		}

		const res = await Promise.all(promises);

		if (res.every((r) => r.ok)) {
			alerts.update((alerts) => [...alerts, { type: 'success', message: 'Folder imported' }]);
			importFolderModal.close();
			invalidateAll();
		} else {
			alerts.update((alerts) => [
				...alerts,
				{ type: 'error', message: `Failed to import some files.` }
			]);
		}
	}

	let createJobModal: Modal;
	let newJob = {
		type: '',
		data: '{}',
		mediaUid: ''
	};
	async function createJobs() {
		let promises: Promise<Response>[] = [];

		for (let i = 0; i < checkedData.length; i++) {
			const entry = checkedData[i];

			if (entry.media) {
				promises.push(
					fetch('/api/jobs/create', {
						method: 'POST',
						body: JSON.stringify({
							type: newJob.type,
							data: newJob.data,
							mediaUid: entry.media?.uid
						})
					})
				);
			}
		}

		let res = await Promise.all(promises);

		if (res.every((r) => r.ok)) {
			alerts.update((alerts) => [...alerts, { type: 'success', message: 'Jobs created' }]);
			createJobModal.close();
			invalidateAll();
		} else {
			alerts.update((alerts) => [...alerts, { type: 'error', message: 'Failed to create jobs' }]);
		}
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-row justify-between items-baseline">
		<Pagination pagination={data.pagination} url={$page.url.href} />

		<p class="text-sm opacity-50 p-4">Selected: {checkedData.length}</p>

		<div class="btn-group">
			<button class="btn btn-primary" on:click={createMediaModal.open}> Create </button>
			<button class="btn btn-primary" on:click={importFolderModal.open}> Import Folder </button>
			<button class="btn btn-secondary" on:click={createJobModal.open}> Create Job </button>
			<button class="btn btn-error" on:click={deleteCheckedData}>Delete</button>
		</div>
	</div>

	<div class="overflow-x-auto">
		<table class="table table-zebra w-full">
			<thead>
				<tr>
					<th>
						<input
							class="checkbox checkbox-xs mt-2"
							type="checkbox"
							on:click={() => {
								data.posts = data.posts.map((post) => {
									post.checked = !allChecked;
									return post;
								});
							}}
							bind:checked={allChecked}
						/>
					</th>
					<th>Title</th>
					<th>Transcoded</th>
					<th>Thumbnail</th>
					<th>Created @</th>
					<th>Updated @</th>
					<th>Active</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.posts as post, i}
					<tr>
						<td>
							<input
								class="checkbox checkbox-xs mt-2"
								type="checkbox"
								bind:checked={post.checked}
							/>
						</td>
						<td>{post.title}</td>
						<td>
							{#if post.media?.url.endsWith('.mpd')}
								<span class="badge badge-success">Yes</span>
							{:else}
								<span class="badge badge-error">No</span>
							{/if}
						</td>
						<td>
							{#if post.media?.thumbnailDataUrl?.length}
								<span class="badge badge-success">Yes</span>
							{:else}
								<span class="badge badge-error">No</span>
							{/if}
						</td>
						<td>{post.createdAt.toLocaleString()}</td>
						<td>{post.updatedAt.toLocaleString()}</td>
						<td>
							<input class="toggle mt-2" type="checkbox" bind:checked={post.isActive} />
						</td>
						<td>
							<div class="btn-group">
								<button
									class="btn btn-outline btn-sm btn-primary"
									on:click={() => {
										editedMedia = {
											uid: post.uid,
											title: post.title,
											content: post.content,
											type: post.type,
											subType: post.subType,
											mediaType: post.media?.type ?? '',
											mediaUrl: post.media?.url ?? '',
											isActive: post.isActive
										};

										editMediaModal.open();
									}}
								>
									Edit
								</button>
								<button
									class="btn btn-outline btn-sm btn-error"
									on:click={() => {
										deleteMedia(post);
									}}
								>
									Delete
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<Modal bind:this={createMediaModal}>
	<h1 class="text-2xl">New media</h1>
	<div class="form-control mt-6">
		<label for="title" class="label">
			<span class="label-text">Title</span>
		</label>
		<input name="title" class="input input-bordered" type="text" bind:value={newMedia.title} />
	</div>
	<div class="form-control mt-6">
		<label for="content" class="label">
			<span class="label-text">Content</span>
		</label>
		<textarea name="content" class="textarea textarea-bordered" bind:value={newMedia.content} />
	</div>
	<div class="form-control mt-6">
		<label for="subtype" class="label">
			<span class="label-text">Sub type</span>
		</label>
		<select name="subtype" class="select select-bordered" bind:value={newMedia.subType}>
			{#each Object.keys(PostSubType) as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
	</div>
	<div class="form-control mt-6">
		<label for="mType" class="label">
			<span class="label-text">Media type</span>
		</label>
		<select name="mType" class="select select-bordered" bind:value={newMedia.mediaType}>
			{#each Object.keys(MediaType) as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
	</div>
	<div class="form-control mt-6">
		<label for="mUrl" class="label">
			<span class="label-text">Media url</span>
		</label>
		<input name="mUrl" class="input input-bordered" type="text" bind:value={newMedia.mediaUrl} />
	</div>
	<div class="form-control mt-6">
		<button class="btn btn-primary" on:click={createMedia}>Create</button>
	</div>
</Modal>

<Modal bind:this={editMediaModal}>
	<h1 class="text-2xl">Edit media</h1>
	<div class="form-control mt-6">
		<label for="title" class="label">
			<span class="label-text">Title</span>
		</label>
		<input name="title" class="input input-bordered" type="text" bind:value={editedMedia.title} />
	</div>
	<div class="form-control mt-6">
		<label for="content" class="label">
			<span class="label-text">Content</span>
		</label>
		<textarea name="content" class="textarea textarea-bordered" bind:value={editedMedia.content} />
	</div>
	<div class="form-control mt-6">
		<label for="sType" class="label">
			<span class="label-text">Sub type</span>
		</label>
		<select name="sType" class="select select-bordered" bind:value={editedMedia.subType}>
			{#each Object.keys(PostSubType) as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
	</div>
	<div class="form-control mt-6">
		<label for="mType" class="label">
			<span class="label-text">Media type</span>
		</label>
		<select name="mType" class="select select-bordered" bind:value={editedMedia.mediaType}>
			{#each Object.keys(MediaType) as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
	</div>
	<div class="form-control mt-6">
		<label for="mUrl" class="label">
			<span class="label-text">Media url</span>
		</label>
		<textarea name="mUrl" class="textarea textarea-bordered" bind:value={editedMedia.mediaUrl} />
	</div>
	<div>
		<label class="cursor-pointer label">
			<span class="label-text">Active</span>
			<input name="Active" type="checkbox" class="checkbox" bind:checked={editedMedia.isActive} />
		</label>
	</div>
	<div class="form-control mt-6">
		<button class="btn btn-primary" on:click={editMedia}>Edit</button>
	</div>
</Modal>

<Modal bind:this={importFolderModal}>
	<h1 class="text-2xl">Import media folder</h1>
	<ul class="steps mt-4" bind:this={importFolderModalStepsContainer}>
		<li class="step step-primary">Choose folder</li>
		<li class="step">Confirm files</li>
		<li class="step">Result</li>
	</ul>
	<div bind:this={importFolderModalSectionsContainer}>
		<section class="flex flex-col">
			<div class="form-control mt-6">
				<label for="title" class="label">
					<span class="label-text">Title</span>
				</label>
				<input
					name="title"
					class="input input-bordered"
					type="text"
					bind:value={importedFolder.title}
				/>
			</div>
			<div class="form-control mt-6">
				<label for="mType" class="label">
					<span class="label-text">Media Type</span>
				</label>
				<select name="mType" class="select select-bordered" bind:value={importedFolder.mediaType}>
					{#each Object.keys(MediaType) as type}
						{#if type != 'VIDEO_LINKED'}
							<option value={type}>{type}</option>
						{/if}
					{/each}
				</select>
				{#if importedFolder.mediaType === 'VIDEO_HARDLINKED'}
					<div class="form-control mt-6">
						<label for="bFolder" class="label">
							<span class="label-text">Base Folder Url</span>
						</label>
						<textarea
							name="bFolder"
							class="textarea textarea-bordered"
							bind:value={importedFolder.paths[0]}
						/>
					</div>
				{/if}
			</div>
			<div class="form-control mt-6">
				<button class="btn btn-primary" on:click={importFolder}>Import</button>
			</div>
		</section>
		<section class="flex flex-col">
			<div class="flex flex-col gap-4 overflow-x-auto max-h-full">
				<table class="table table-zebra w-full">
					<thead>
						<tr>
							<th>Generated Title</th>
							<th>File name</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each importedFolderFiles as file}
							<tr>
								<td>
									<input type="text" bind:value={file.title} class="w-fit" />
								</td>
								<td><kbd>{file.path}</kbd></td>
								<td>
									<button
										class="btn btn-sm btn-primary"
										on:click={() => {
											importedFolderFiles = importedFolderFiles.filter((f) => f.path !== file.path);
										}}
									>
										Remove
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<div class="form-control mt-6">
					<button class="btn btn-primary" on:click={importFolderFiles}>Import</button>
				</div>
			</div>
		</section>
	</div>
</Modal>

<Modal bind:this={createJobModal}>
	<h1 class="text-2xl">Create new Job</h1>
	<div class="form-control mt-6">
		<label class="label" for="jobType">
			<span class="label-text">Job Type</span>
		</label>
		<select name="jobType" class="select select-bordered" bind:value={newJob.type}>
			{#each Object.keys(JobType) as type}
				{#if type != 'UPLOAD'}
					<option value={type}>{type}</option>
				{/if}
			{/each}
		</select>
	</div>
	<div class="form-control mt-6">
		<label class="label" for="jobData">
			<span class="label-text">Job Data</span>
		</label>
		<textarea
			name="jobData"
			class="textarea textarea-bordered"
			bind:value={newJob.data}
			placeholder="JSON data"
		/>
	</div>
	<div class="form-control mt-6">
		<button class="btn btn-secondary" on:click={createJobs}>Create</button>
	</div>
</Modal>
