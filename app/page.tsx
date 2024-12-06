import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '~/components/ui/card';
import { getReleases } from '~/lib/github';

export default async function Home() {
	const releases = await getReleases();

	return (
		<div className='container mx-auto flex flex-wrap gap-4 py-4'>
			{releases.map(release => (
				<Card key={release.id}>
					<CardHeader>
						<CardTitle>{release.name}</CardTitle>
						<CardDescription>{release.body}</CardDescription>
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
