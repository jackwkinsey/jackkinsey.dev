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
import { useState } from 'react'
import RadarChart from '~/components/RadarChart'
import StoryCard from '~/components/StoryCard'
import storyData from '~/data/dev_story_data'

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
	const [over, setOver] = useState(false)
	const radarChartOptions: ChartOptions<'radar'> = {
		scales: {
			r: {
				angleLines: {
					color: '#a1a1aa',
				},
				min: 0,
				max: 100,
				ticks: {
					display: false,
					stepSize: 20,
				},
				grid: {
					circular: true,
					color: '#a1a1aa',
				},
				pointLabels: {
					font: {
						size: 14,
					},
				},
			},
		},
	}
	return (
		<>
			<header></header>
			<main className="p-4 md:mx-auto md:my-8 md:px-8 md:max-w-6xl text-zinc-500 dark:text-zinc-400">
				<section className="md:h-[500px]">
					<p className="font-mono text-xs mb-8 text-violet-900 dark:text-violet-500">
						Hi, my name is
					</p>
					<h1 className="font-serif text-4xl text-zinc-900 dark:text-zinc-100">
						Jack Kinsey.
					</h1>
					<p className="font-serif text-2xl md:text-4xl">
						I build web &amp; game apps.
					</p>
					<p className="mt-8 md:w-1/2 text-center md:text-left">
						I'm a full stack web and game developer focused on building
						exceptional, high-quality, and fun websites, games, and other
						applications.
					</p>
					<div className="text-violet-900 border-4 border-violet-900 p-4 rounded-[5px] w-40 text-center mx-auto md:mx-0 mt-8 md:mt-36 dark:text-violet-500 dark:border-violet-500">
						<a href="mailto:jack.w.kinsey@gmail.com">Get In Touch</a>
					</div>
				</section>

				<section className="mt-20">
					<h2 className="font-serif border-l-[5px] border-b-[5px] border-violet-900 p-2 rounded-bl-lg text-2xl text-zinc-900 mb-10 dark:text-zinc-100 dark:border-violet-500">
						About Me
					</h2>
					<div>
						<img
							onMouseOver={() => setOver(true)}
							onMouseOut={() => setOver(false)}
							src={over ? 'images/blue-steel.jpg' : 'images/jack.jpg'}
							alt="Jack Kinsey"
							className="rounded-full w-52 md:w-80 m-auto mb-4 shadow-[10px_8px_0px_rgba(76,29,149)] dark:shadow-[10px_8px_0px_rgba(139,92,246)]"
						/>
						<p
							className={over ? 'text-center visible' : 'text-center invisible'}
							aria-hidden
						>
							✨BLUE STEEL✨
						</p>
					</div>
					<article className="mt-8 md:max-w-2xl md:m-auto">
						<p className="mb-4">
							Greetings! I'm Jack, a seasoned full stack web developer with over
							9 years of industry experience. I am also the founder of Hexbit
							Studios, a small independent game studio. I aim to bring a unique
							blend of technical expertise, creative flair, and empathy to my
							work.
						</p>
						<p className="mb-4">
							My journey in the realm of software development has been diverse,
							primarily focusing on web application projects. I've had the
							privilege of contributing to various teams and assuming different
							roles, allowing me to cultivate a holistic understanding of the
							development process. I'm not just passionate about crafting
							seamless user experiences and robust backends; I thrive on sharing
							my knowledge and mentoring fellow teammates.
						</p>
						<p className="mb-4">
							In addition to web development, I also have a passion for game
							development. I find great joy in building game worlds with
							interesting mechanics and systems.
						</p>
						<p className="mb-8">
							When I'm not immersed in the world of web and game development,
							you'll likely catch me engrossed in the creation of pixel art for
							game projects or composing music with my guitar and synthesizers.
						</p>
						<hr className="border-zinc-800 mb-8" />
						<p className="text-center mb-4">
							Join me on this journey of blending technology and creativity,
							where every line of code and pixel contributes to a bigger story.
						</p>
					</article>
				</section>

				<section className="mt-20">
					<h2 className="font-serif border-l-[5px] border-b-[5px] border-violet-900 p-2 rounded-bl-lg text-2xl text-zinc-900 mb-10 dark:text-zinc-100 dark:border-violet-500">
						Skills
					</h2>
					<article className="md:max-w-2xl md:m-auto">
						<div className="hidden md:block">
							<p className="mb-8">
								I have had the privilege of working with a wide array of
								technologies over the course of my career.
							</p>
							<p className="mb-4 text-center">Some of my favorites are:</p>
							<div className="grid grid-cols-4 mb-8">
								<ul className="list-none">
									<li>React</li>
									<li>JavaScript</li>
									<li>TypeScript</li>
									<li>Vue</li>
								</ul>
								<ul className="list-none text-center">
									<li>React Native</li>
									<li>Node</li>
									<li>Postgres</li>
									<li>MongoDB</li>
								</ul>
								<ul className="list-none text-center">
									<li>Tailwind CSS</li>
									<li>Prisma</li>
									<li>Next</li>
									<li>Remix</li>
								</ul>
								<ul className="list-none text-right">
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
					</article>
				</section>

				<section className="mt-20">
					<h2 className="font-serif border-l-[5px] border-b-[5px] border-violet-900 p-2 rounded-bl-lg text-2xl text-zinc-900 mb-10 dark:text-zinc-100 dark:border-violet-500">
						Dev Story
					</h2>
					<div className="flex flex-col relative my-[40px] lg:after:bg-zinc-200 lg:after:content-[''] lg:after:absolute lg:after:left-[calc(50%-2px)] lg:after:w-1 lg:after:h-full dark:lg:after:bg-zinc-800">
						{storyData.map(data => {
							const {
								type,
								start,
								end,
								headerImage,
								headerTitle,
								headerSubtitle,
								headerTags,
								bodyMarkdown,
								links,
							} = data
							return (
								<StoryCard
									type={type}
									start={start}
									end={end}
									headerImage={headerImage}
									headerTitle={headerTitle}
									headerSubtitle={headerSubtitle}
									headerTags={headerTags}
									bodyMarkdown={bodyMarkdown}
									links={links}
									key={start.getTime()}
								/>
							)
						})}
					</div>
				</section>

				<section className="mt-20 hidden">
					<h2 className="font-serif border-l-[5px] border-b-[5px] border-violet-900 p-2 rounded-bl-lg text-2xl text-zinc-900 mb-10 dark:text-zinc-100 dark:border-violet-500">
						Featured Projects
					</h2>
					<div>TODO: add 3 featured projects</div>
				</section>
			</main>
			<footer className="h-20 bg-violet-900 text-violet-300 text-sm font-mono flex flex-col justify-center items-center">
				<p>Designed & built by Jack Kinsey</p>
				<p>
					<a
						href="https://github.com/jackwkinsey/jackkinsey.dev/fork"
						target="blank"
						className="underline underline-offset-4"
					>
						Fork this on GitHub
					</a>
				</p>
			</footer>
		</>
	)
}
