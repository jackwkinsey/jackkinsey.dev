import type { MetaFunction } from '@vercel/remix'
import {
	type ChartData,
	type ChartOptions,
	Chart,
	Filler,
	LineElement,
	PointElement,
	RadialLinearScale,
	Tooltip,
} from 'chart.js'
import RadarChart from '~/components/RadarChart'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Jack Kinsey' },
		{
			name: 'description',
			content: 'The portfolio and resume website for Jack Kinsey',
		},
	]
}

const proficiencies: { [index: string]: any } = {
	'Frontend Proficiencies': {
		JavaScript: 95,
		TypeScript: 80,
		React: 95,
		ReactNative: 70,
		Vue: 70,
		Tailwind: 75,
		Sass: 50,
		Accessibility: 45,
		Storybook: 50,
		TDD: 80,
		Electron: 55,
	},
	'Backend Proficiencies': {
		Node: 90,
		MySQL: 75,
		Postgres: 85,
		SQLite: 65,
		MongoDB: 80,
		'Next.js': 75,
		Remix: 80,
		Python: 50,
		GraphQL: 60,
		'.NET/C#': 40,
		TDD: 80,
	},
}

const proficiencyData = Object.keys(proficiencies).map(proficiencyGroup => {
	console.log(proficiencyGroup)
	return {
		labels: Object.keys(proficiencies[proficiencyGroup]),
		datasets: [
			{
				data: Object.values(proficiencies[proficiencyGroup]),
				fill: true,
				backgroundColor: 'rgba(76, 29, 149, 0.4)',
				borderColor: 'rgb(76, 29, 149)',
			},
		],
	} as ChartData<'radar'>
})

Chart.register(Filler, LineElement, PointElement, RadialLinearScale, Tooltip)

export default function Index() {
	const radarChartOptions: ChartOptions<'radar'> = {
		scales: {
			r: {
				min: 0,
				max: 100,
				ticks: {
					display: false,
					stepSize: 20,
				},
			},
		},
	}
	return (
		<main className="p-4 md:mx-auto md:my-8 md:px-8 md:max-w-4xl text-zinc-500">
			<section className="md:h-[500px]">
				<p className="font-mono text-xs mb-8 text-violet-900">Hi, my name is</p>
				<h1 className="font-serif text-4xl text-zinc-900">Jack Kinsey.</h1>
				<p className="font-serif text-2xl">I build web &amp; game apps.</p>
				<p className="mt-8 md:w-1/2 text-center md:text-left">
					I'm a full stack web and game developer focused on building
					exceptional, high-quality, and fun websites, games, and other
					applications.
				</p>
				<div className="text-violet-900 border-4 border-violet-900 p-4 rounded w-40 text-center mx-auto md:mx-0 mt-8 md:mt-36">
					<a href="mailto:jack.w.kinsey@gmail.com">Get In Touch</a>
				</div>
			</section>

			<section className="mt-20">
				<h2 className="font-serif border-l-[5px] border-b-[5px] border-violet-900 p-2 rounded-bl-lg text-2xl text-zinc-900 mb-10">
					About Me
				</h2>
				<div>
					<img
						src="images/jack.jpg"
						alt="Jack Kinsey"
						className="rounded-full w-52 md:w-80 m-auto mb-8"
					/>
				</div>
				<article>
					<p className="mb-4">
						Greetings! I'm Jack, a seasoned full-stack web developer with a rich
						history spanning over 9 years in the industry. As the proud founder
						of Hexbit Studios, a small independent game studio, I bring a unique
						blend of technical expertise and creative flair to my work.
					</p>
					<p className="mb-4">
						My journey in the realm of software development has been diverse,
						with a primary focus on web app projects. I've had the privilege of
						contributing to various teams and assuming different roles, allowing
						me to cultivate a holistic understanding of the development process.
						I'm not just passionate about crafting seamless user experiences and
						robust app backends; I thrive on sharing my knowledge and mentoring
						fellow teammates.
					</p>
					<p className="mb-4">
						In addition to my web development pursuits, I channel my creativity
						into the realm of game design. Whether it's devising captivating
						game worlds or implementing innovative mechanics, I find immense joy
						in the process. When I'm not immersed in the world of web
						development, you'll likely catch me engrossed in the creation of
						pixel art for exciting game projects or composing music with my
						trusty guitar and synthesizers.
					</p>
					<p>
						Join me on this journey of blending technology and creativity, where
						every line of code and pixel contributes to a bigger story.
					</p>
				</article>
			</section>

			<section className="mt-20">
				<h2 className="font-serif border-l-[5px] border-b-[5px] border-violet-900 p-2 rounded-bl-lg text-2xl text-zinc-900 mb-10">
					Skills
				</h2>
				<div className="hidden md:block">
					<p className="mb-8">
						I have had the privilege of working with a wide array of
						technologies over the course of my career.
					</p>
					<p className="mb-4">Some of my favorites are:</p>
					<div className="grid grid-cols-4 mb-8">
						<ul>
							<li>React</li>
							<li>JavaScript</li>
							<li>TypeScript</li>
							<li>Vue</li>
						</ul>
						<ul>
							<li>React Native</li>
							<li>Node</li>
							<li>Postgres</li>
							<li>MongoDB</li>
						</ul>
						<ul>
							<li>Tailwind CSS</li>
							<li>Prisma</li>
							<li>Next</li>
							<li>Remix</li>
						</ul>
						<ul>
							<li>GraphQL</li>
							<li>Apollo</li>
							<li>Vercel</li>
							<li>Godot Game Engine</li>
						</ul>
					</div>
				</div>
				<div>
					<RadarChart
						chartData={proficiencyData[0]}
						options={radarChartOptions}
						title="Frontend Proficiencies"
					/>
					<RadarChart
						chartData={proficiencyData[1]}
						options={radarChartOptions}
						title="Backend Proficiencies"
					/>
				</div>
			</section>

			<section className="mt-20">
				<h2 className="font-serif border-l-[5px] border-b-[5px] border-violet-900 p-2 rounded-bl-lg text-2xl text-zinc-900 mb-10">
					Dev Story
				</h2>
				<div>TODO: add developer story timeline</div>
			</section>

			<section className="mt-20 hidden md:block">
				<h2 className="font-serif border-l-[5px] border-b-[5px] border-violet-900 p-2 rounded-bl-lg text-2xl text-zinc-900 mb-10">
					Featured Projects
				</h2>
				<div>TODO: add 3 featured projects</div>
			</section>
		</main>
	)
}
