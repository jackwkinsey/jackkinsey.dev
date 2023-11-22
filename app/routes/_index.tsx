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
		<main>
			<section>
				<p className="code">Hi, my name is</p>
				<h1 className="title">Jack Kinsey.</h1>
				<p className="title">I build web and game apps.</p>
				<p>
					I'm a full stack web and game developer focused on building
					exceptional, high-quality, and fun websites, games, and other
					applications.
				</p>
			</section>

			<section>
				<h2 className="title">About Me</h2>
				<div>
					<img src="images/jack.jpg" alt="Jack Kinsey" />
				</div>
				<article>
					<p>
						Greetings! I'm Jack, a seasoned full-stack web developer with a rich
						history spanning over 9 years in the industry. As the proud founder
						of Hexbit Studios, a small independent game studio, I bring a unique
						blend of technical expertise and creative flair to my work.
					</p>
					<p>
						My journey in the realm of software development has been diverse,
						with a primary focus on web app projects. I've had the privilege of
						contributing to various teams and assuming different roles, allowing
						me to cultivate a holistic understanding of the development process.
						I'm not just passionate about crafting seamless user experiences and
						robust app backends; I thrive on sharing my knowledge and mentoring
						fellow teammates.
					</p>
					<p>
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

			<section>
				<h2 className="title">Skills</h2>
				<div>
					<p>TODO: add radar chart for frontend skills</p>
					<p>TODO: add radar chart for backend skills</p>
					<p>TODO: add radar chart for game dev skills</p>
				</div>
			</section>

			<section>
				<h2 className="title">My Developer Story</h2>
				<div>TODO: add developer story timeline</div>
			</section>

			<section>
				<h2 className="title">Featured Projects</h2>
				<div>TODO: add 3 featured projects</div>
			</section>

			<section>
				<h2 className="title">Featured Articles</h2>
				<div>TODO: add 3 featured articles from blog</div>
			</section>
		</main>
	)
}
