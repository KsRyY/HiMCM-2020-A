import fs from 'fs-extra'
import path from 'path'
import { generateData } from './data-model.js'
import { formatOutput } from './format.js'

export async function write(outdir, filename, ...args) {
	const generatedData = generateData(...args)
	const formattedData = formatOutput(generatedData)
	await fs.mkdirp(path.resolve(outdir))
	await fs.writeFile(path.resolve(outdir, `${filename}.txt`), formattedData)
	await fs.writeFile(
		path.resolve(outdir, `${filename}.json`),
		JSON.stringify(generatedData)
	)
}
