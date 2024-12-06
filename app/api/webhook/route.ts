import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
	const eventName = req.headers.get('x-github-event');

	if (eventName === 'release') {
		revalidateTag('releases');
	}

	return new Response();
}
