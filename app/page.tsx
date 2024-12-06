import { Badge } from '~/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '~/components/ui/card';
import { getReleases } from '~/lib/github';

export const revalidate = 86400;

export default async function Home() {
	const releases = await getReleases();

	return (
		<div className='container mx-auto flex flex-wrap gap-4 py-4'>
			{releases.map(release => (
				<Card key={release.id}>
					<CardHeader>
						<CardTitle className='flex items-center gap-4'>
							<p>{release.name}</p>
							{release.prerelease && (
								<Badge className='rounded-full bg-blue-600 hover:bg-blue-700'>
									Pre-Release
								</Badge>
							)}
						</CardTitle>
						<CardDescription>
							<p>description: {release.body}</p>
							<p>
								published:{' '}
								{new Date(release.published_at!).toLocaleString('ja-JP')}
							</p>
						</CardDescription>
					</CardHeader>
					<CardContent>
						{release.assets.map(asset => (
							<a
								key={asset.id}
								href={asset.browser_download_url}
								className='text-blue-500'
							>
								{asset.name} (download count: {asset.download_count})
							</a>
						))}
					</CardContent>
				</Card>
			))}
		</div>
	);
}
