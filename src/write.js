import fs from 'fs-extra'
import { generateData } from './data-model.js'
import { formatOutput } from './format.js'

export async function write(number, ratio) {
	const generatedData = generateData(number, ratio)
	const formattedData = formatOutput(generatedData)
	await fs.writeFile('./output.txt', formattedData)
	await fs.writeFile('./output.json', JSON.stringify(generatedData))
}
