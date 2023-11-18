import type { MetaFunction } from '@vercel/remix'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Jack Kinsey' },
		{
			name: 'description',
			content: 'The portfolio and resume website for Jack Kinsey',
		},
	]
}

export default function Index() {
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
			<h1>Hello, I'm Jack</h1>
			<h2>A Full Stack Developer</h2>

			<p>
				This is the future home of my portfolio website. Please check back soon!
			</p>
		</div>
	)
}
