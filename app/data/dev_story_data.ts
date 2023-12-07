type Link = {
	url: string
	text?: string
}
type Image = {
	src: string
	altText: string
}

type StoryCardData = {
	type: 'app' | 'certification' | 'education' | 'game' | 'position'
	start: Date
	end?: Date | 'current'
	headerImage?: Image
	headerTitle: string
	headerSubtitle?: string
	headerTags?: Array<string>
	bodyMarkdown?: string
	links?: Array<Link>
}

const data: Array<StoryCardData> = [
	{
		type: 'position',
		start: new Date('September 1, 2022'),
		end: 'current',
		headerImage: {
			src: '/images/oaaf-logo.png',
			altText: 'Of Ash and Fire logo',
		},
		headerTitle: 'Senior Software Engineer',
		headerSubtitle: 'Of Ash and Fire',
		headerTags: [
			'React',
			'React Native',
			'TypeScript',
			'JavaScript',
			'Postgres',
			'Next.js',
			'Prisma',
			'Node',
			'GraphQL',
			'Apollo',
			'SQLite',
		],
		bodyMarkdown: `
- Help with client engagements, focusing on resolving legacy bugs and implementing requested features for web and mobile applications.
- Specialize in frontend development using React for web applications and React Native for mobile applications.
- Manage backend systems by implementing new API endpoints and creating queries to retrieve data required by frontend components.
- Mentor and coach junior developers via one-on-ones and code reviews.
  `,
	},
	{
		type: 'app',
		start: new Date('October, 1, 2023'),
		headerTitle: 'Remix Expenses',
		headerSubtitle: 'A small app to help track expenses',
		headerTags: ['React', 'Remix', 'TypeScript', 'Prisma', 'MongoDB'],
		bodyMarkdown: `
This is a small app I created as an exercise to learn about some of the latest features of Remix. It is a simple app that allows users to login and track expenses.
\n
Users can then view their expenses in a list or view some simple analytics about them.
\n
Feel free to create a user to give it a whirl, or you can login as a test user.
\n
Credentials for test user:
\n  
    test@example.com
    Test1234!
    `,
		links: [
			{ url: 'https://remix-expenses-tawny.vercel.app', text: 'try it out' },
			{
				url: 'https://github.com/jackwkinsey/remix-expenses',
				text: 'view the code',
			},
		],
	},
	{
		type: 'position',
		start: new Date('January 1, 2021'),
		end: new Date('September 1, 2022'),
		headerImage: {
			src: '/images/apple-logo.png',
			altText: 'Apple logo',
		},
		headerTitle: 'Software Engineer',
		headerSubtitle: 'Apple',
		headerTags: [
			'Vue',
			'JavaScript',
			'MongoDB',
			'Node',
			'Splunk',
			'AWS',
			'Kubernetes',
			'Docker',
		],
		bodyMarkdown: `
- Worked on the ConversationKit team to improve developer experience and automate deployments.
- Completed feature work for the main ConversationKit application by implementing designs on the frontend using Vue.js.
- Completed feature work for the backend to extend the application's API.
    `,
	},
	{
		type: 'position',
		start: new Date('September 1, 2020'),
		end: new Date('January, 1, 2021'),
		headerImage: {
			src: '/images/legalshield-logo.png',
			altText: 'LegalShield logo',
		},
		headerTitle: 'Software Engineer',
		headerSubtitle: 'LegalShield',
		headerTags: ['React', 'JavaScript', 'Node', 'Express', '.NET Core', 'C#'],
		bodyMarkdown: `
- Worked on internal company web applications.
- Created Node services which talked to a .NET Core backend.
- Created microsites using React that consumed Node and .NET microservices.
    `,
	},
	// 	{
	// 		type: 'app',
	// 		start: new Date('August 1, 2020'),
	// 		headerTitle: 'Roll Init',
	// 		headerSubtitle: 'Track your D&D encounters',
	// 		headerTags: ['React', 'Next.js', 'TypeScript', 'Prisma', 'MongoDB'],
	// 		bodyMarkdown: `
	// This web app allows users to sign in and manage encounters for the popular table top role playing game, Dungeons & Dragons, specifically for the 5th edition of this game.
	// \n
	// Game Managers can create and save their players' characters to use in encounters. By adding their chosen players and any monster that is found in the free and open D&D 5th edition SRD API to an encounter, Game Managers can track and run their encounters easily.
	//     `,
	// 		links: [{ url: 'https://www.rollinit.xyz', text: 'try it out' }],
	// 	},
	{
		type: 'position',
		start: new Date('August 1, 2019'),
		end: new Date('September 1, 2020'),
		headerImage: {
			src: '/images/sweetwater-sound-logo.png',
			altText: 'Sweetwater Sound logo',
		},
		headerTitle: 'Software Engineer',
		headerSubtitle: 'Sweetwater Sound',
		headerTags: [
			'Vue',
			'TypeScript',
			'MySQL',
			'Node',
			'Koa',
			'GraphQL',
			'Apollo',
			'Algolia',
			'Google Cloud Platform',
			'GitLab',
		],
		bodyMarkdown: `
- Migrated parts of legacy e-commerce site to modern SPA architecture using Vue.js.
- Used GraphQL to communicate with GCP-hosted microservices.
- Created internal Vue component library which had an emphasis on accessibility.
    `,
	},
	{
		type: 'position',
		start: new Date('January 1, 2019'),
		end: new Date('September 1, 2019'),
		headerImage: {
			src: '/images/chivvy-logo.png',
			altText: 'Chivvy logo',
		},
		headerTitle: 'Web Developer Consultant',
		headerSubtitle: 'Chivvy',
		headerTags: [
			'React',
			'JavaScript',
			'MySQL',
			'Node',
			'Express',
			'AWS',
			'BitBucket',
		],
		bodyMarkdown: `
- Helped implement core systems for local event management startup.
- Created backend REST API using Node and Express for web app to consume.
- Created frontend using custom React components.
    `,
	},
		{
		type: 'game',
		start: new Date('December, 3, 2018'),
		headerTitle: 'Diminution',
		headerSubtitle: 'A game made in 48 hours for Ludum Dare #43',
		headerTags: ['Unity', 'Game Jam'],
		bodyMarkdown: `
This is a small prototype done over Ludum Dare 43 weekend.
\n
You are trying to get data through a computer. You must conserve your resources while you try to get to the portal on each level. Try to get as much data through as possible.
\n
Passing over a colored tile will deplete that corresponding resource. If you pass over a purple tile, both resources will be depleted. Data is consumed with each movement as well.
\n
The game ends when you lose all of one resource (blue and red bars), or all of your data (green bar), or reach the final data portal.
\n
Careful though, the board updates with each move! The logic for the board updates follows Conway’s Game of Life. You can interact with the Game of Life simulation by either left or right clicking to place a blue or red tile on the board respectively. One tile placement can have a huge impact on the board.
    `,
		links: [
			{ url: 'https://ldjam.com/events/ludum-dare/43/diminution', text: 'game jam site' },
		],
	},
	{
		type: 'position',
		start: new Date('November 1, 2018'),
		end: new Date('July 1, 2019'),
		headerImage: {
			src: '/images/technivation-logo.png',
			altText: 'Technivation logo',
		},
		headerTitle: 'Full Stack Developer',
		headerSubtitle: 'Technivation',
		headerTags: [
			'React',
			'React Native',
			'.NET Core',
			'C#',
			'MSSQL Server',
			'Azure',
		],
		bodyMarkdown: `
- Worked on consulting projects for various financial institutions.
- Created prototype banking mobile app using React Native library.
- Used .NET Core to create backend API to be used by React-based frontend.
    `,
	},
	{
		type: 'position',
		start: new Date('January 1, 2016'),
		end: new Date('October 1, 2018'),
		headerImage: {
			src: '/images/exaptive-logo.png',
			altText: 'Exaptive logo',
		},
		headerTitle: 'Full Stack Developer',
		headerSubtitle: 'Exaptive',
		headerTags: ['React', 'D3', 'Node', 'JavaScript', 'MySQL', 'AWS', 'Python'],
		bodyMarkdown: `
- Created data dashboards and other applications to help clients visualize data.
- Worked mostly on frontend components, but also helped create services and managed databases for these projects.
- Used React to create reusable components powered by D3 for data visualization.
- Greatly improved performance of data visualization animations for larger datasets.
    `,
	},
	{
		type: 'position',
		start: new Date('November 1, 2014'),
		end: new Date('January 1, 2016'),
		headerImage: {
			src: '/images/bmsi-logo.png',
			altText: 'Bogardus Medical Systems logo',
		},
		headerTitle: 'Jr. Developer',
		headerSubtitle: 'Bogardus Medical Systems',
		headerTags: ['VB.NET', 'ASP.NET', 'C#', 'React', 'MSSQL Server', 'SVN'],
		bodyMarkdown: `
- Helped fix bugs that were found by QA team in flagship software, Oncochart.
- Implemented small, new features requested by users and management team.
- Worked on web app to enhance the experience of seminar attendees.
    `,
	},
	{
		type: 'education',
		start: new Date('September 1, 2007'),
		end: new Date('December 1, 2011'),
		headerImage: {
			src: '/images/snu-logo.png',
			altText: 'Southern Nazarene University logo',
		},
		headerTitle: 'Southern Nazarene University',
		headerSubtitle: 'B.S. Computer Science',
		bodyMarkdown: `
- Participated in multiple volunteer internships as a lab and programming assistant for my professor, Dr. Brent Eskridge.
- Completed coursework which primarily used Java, but also gained experience working with relational databases, Python, C/C++, and basic networking.
- Topics covered: computer programming, object-oriented programming, version control, data structures, design patterns, algorithms, basic artificial intelligence.
    `,
	},
]

export default data
