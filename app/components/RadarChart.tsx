import type { ChartData, ChartOptions } from 'chart.js'
import { Radar } from 'react-chartjs-2'

type RadarChartProps = {
	chartData: ChartData<'radar'>
	options: ChartOptions<'radar'>
	title: string
}

export default function RadarChart({
	chartData,
	options,
	title,
}: RadarChartProps) {
	return (
		<div>
			<h3 className="font-serif text-xl text-center text-zinc-900">{title}</h3>
			<Radar data={chartData} options={options} />
		</div>
	)
}
