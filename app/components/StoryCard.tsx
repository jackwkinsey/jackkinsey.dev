import {
	BadgeCheck,
	Briefcase,
	Code2,
	GraduationCap,
	Gamepad,
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import style from '~/styles/story-card.module.css'

type Link = {
	url: string
	text?: string
}
type Image = {
	src: string
	altText: string
}

function Tag({ text }: { text: string }) {
	return (
		<div className="font-mono text-xs text-zinc-50 bg-violet-900 rounded p-[5px] mr-1 mb-2">
			{text}
		</div>
	)
}

type StoryCardProps = {
	type: 'position' | 'app' | 'game' | 'certification' | 'education'
	start: Date
	end?: Date | 'current'
	headerImage?: Image
	headerTitle: string
	headerSubtitle?: string
	headerTags?: Array<string>
	bodyMarkdown?: string
	links?: Array<Link>
}
export default function StoryCard({
	type,
	start,
	end,
	headerImage,
	headerTitle,
	headerSubtitle,
	headerTags,
	bodyMarkdown,
	links,
}: StoryCardProps) {
	console.log('links:', links, headerTitle)
	const tags = headerTags?.map(tag => {
		return <Tag key={tag} text={tag} />
	})
	const linkElements = links?.map((link, index) => {
		return (
			<a
				key={link.url}
				href={link.url}
				className={`underline text-violet-900 ${index > 0 ? 'ml-4' : ''}`}
				target="blank"
			>
				{link.text || link.url}
			</a>
		)
	})

	let typeIcon
	const iconSize = 20
	const iconStrokeWidth = 2
	const iconColor = '#18181b'
	const iconClass = 'inline mr-1 lg:my-[2px] lg:mx-auto lg:block'
	if (type === 'app') {
		typeIcon = (
			<Code2
				size={iconSize}
				strokeWidth={iconStrokeWidth}
				color={iconColor}
				className={iconClass}
			/>
		)
	} else if (type === 'certification') {
		typeIcon = (
			<BadgeCheck
				size={iconSize}
				strokeWidth={iconStrokeWidth}
				color={iconColor}
				className={iconClass}
			/>
		)
	} else if (type === 'education') {
		typeIcon = (
			<GraduationCap
				size={iconSize}
				strokeWidth={iconStrokeWidth}
				color={iconColor}
				className={iconClass}
			/>
		)
	} else if (type === 'game') {
		typeIcon = (
			<Gamepad
				size={iconSize}
				strokeWidth={iconStrokeWidth}
				color={iconColor}
				className={iconClass}
			/>
		)
	} else if (type === 'position') {
		typeIcon = (
			<Briefcase
				size={iconSize}
				strokeWidth={iconStrokeWidth}
				color={iconColor}
				className={iconClass}
			/>
		)
	}

	return (
		<div className="lg:[&>div>div.circle]:even:right-auto lg:[&>div>div.circle]:even:left-[-50px] mb-8 lg:mb-0 lg:odd:pr-8 lg:even:pl-8 lg:w-1/2 lg:even:self-end lg:[&>div]:after:content-[' '] lg:[&>div]:after:bg-zinc-100 lg:[&>div]:after:absolute lg:[&>div]:after:right-[-7.5px] lg:[&>div]:after:top-1 lg:[&>div]:after:rotate-45 lg:[&>div]:after:w-[15px] lg:[&>div]:after:h-[15px] lg:[&>div]:after:shadow-[2px_-2px_4px_rgba(0,0,0,0.2)] lg:[&>div]:even:after:right-auto lg:[&>div]:even:after:left-[-7.5px] lg:[&>div]:even:after:shadow-[-2px_2px_4px_rgba(0,0,0,0.2)]">
			<div className="border rounded border-zinc-300 p-2 relative shadow-[0px_0px_5px_rgba(0,0,0,0.3)]">
				{/* type */}
				<div className="font-mono text-sm flex justify-between border-b-2 mb-2">
					<span className="flex items-center">
						<span className="lg:hidden">{typeIcon}</span>
						{type.toLocaleUpperCase()}
					</span>
					<span>
						{start.toLocaleString('default', { month: 'long' })}{' '}
						{start.getFullYear()}
						{end && ' - '}
						{end &&
							(end === 'current'
								? 'CURRENT'
								: `${end.toLocaleString('default', {
										month: 'long',
								  })} ${end.getFullYear()}`)}
					</span>
				</div>

				{/* header */}
				<div className="flex items-center mb-4">
					{headerImage && (
						<img
							src={headerImage?.src}
							alt={headerImage?.altText}
							className="w-12 p-1 border border-zinc-300"
						/>
					)}
					<div>
						<p className="ml-4 lg:text-lg">{headerTitle}</p>
						<p className="ml-4 text-sm lg:text-base">{headerSubtitle}</p>
					</div>
				</div>
				<div className="flex mt-4 flex-wrap justify-center">{tags}</div>

				{/* body */}
				<div className="px-8">
					<ReactMarkdown className={style['react-markdown']}>
						{bodyMarkdown}
					</ReactMarkdown>
				</div>

				{/* links */}
				<div className="flex justify-center">{linkElements}</div>

				{/* timeline node */}
				<div className="circle hidden lg:inline bg-zinc-100 border-[3px] border-violet-900 rounded-full absolute top-0 right-[-50px] w-8 h-8 z-50">
					{typeIcon}
				</div>
			</div>
		</div>
	)
}