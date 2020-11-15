import { write } from './write.js'
import cac from 'cac'

const cli = cac('himcm2020-a-datagen')

cli.option('-n, --name <name>', 'Output file name', {
	default: 'output',
})
	.option('-o, --output <directory>', 'Output directory', {
		default: './',
	})
	.option('-a, --abilityTags <num>', 'Number of abilities', {
		default: 20,
	})
	.option('-i, --interestTags <num>', 'Number of interests', {
		default: 20,
	})
	.option('-m, --merchants <num>', 'Number of merchants', {
		default: 100,
	})
	.option('-r, --ratio <ratio>', 'Ratio of merchants to students', {
		default: 3,
	})
	.help()
	.version('1.1.0')

const { options } = cli.parse()

if (!(options.help || options.version)) {
	write(
		options.output,
		options.name,
		options.merchants,
		options.ratio,
		options.abilityTags,
		options.interestTags
	)
}
