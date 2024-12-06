import { Octokit } from '@octokit/core';
import { unstable_cache as cache } from 'next/cache';

const octokit = new Octokit({
	auth: process.env.GITHUB_ACCESS_TOKEN,
});

export const getReleases = cache(
	async () => {
		const { data: releases } = await octokit.request(
			'GET /repos/{owner}/{repo}/releases',
			{
				owner: process.env.GITHUB_OWNER!,
				repo: process.env.GITHUB_REPOSITORY!,
			},
		);

		return releases;
	},
	[],
	{
		tags: ['releases'],
	},
);
