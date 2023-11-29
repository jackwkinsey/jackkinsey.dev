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
    Hail5atan!
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
]

export default data
