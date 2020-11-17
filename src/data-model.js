import faker from 'faker'
import { randomInt, randomIntFromZero } from './random.js'
import { Time } from './time.js'

function generateWorkingPeriod() {
	const start = Time(randomIntFromZero(23), randomIntFromZero(59))

	if (start.verifyHour(hour => hour < 7 || hour > 19)) {
		return generateWorkingPeriod()
	}

	const period = Time(randomIntFromZero(11), randomIntFromZero(59))
	const end = start.addBy(...period.wrap())

	if (end.verifyHour(hour => hour > 18)) {
		return generateWorkingPeriod()
	}

	return `${start} ${end}`
}

const GeneralModel = (
	name,
	salary,
	ability,
	interest,
	workingPeriod,
	restTime
) => ({
	name,
	salary,
	ability,
	interest,
	workingPeriod,
	restTime,
})

const MerchantModel = (
	name,
	jobs,
	salary,
	ability,
	interest,
	workingPeriod,
	restTime
) => ({
	...GeneralModel(name, salary, ability, interest, workingPeriod, restTime),
	jobs,
})

const generateTags = tagCount =>
	new Array(tagCount).fill(0).map(() => randomIntFromZero(100))

const generateMerchantData = (merchants, abilityTags, interestTags) =>
	new Array(merchants)
		.fill(0)
		.map(() =>
			MerchantModel(
				faker.random.uuid(),
				randomInt(1, 5),
				randomInt(17, 34),
				generateTags(abilityTags),
				generateTags(interestTags),
				generateWorkingPeriod(),
				randomIntFromZero(6)
			)
		)

const generateStudentData = (
	merchants,
	studentMerchantRatio,
	abilityTags,
	interestTags
) =>
	new Array(merchants * studentMerchantRatio)
		.fill(0)
		.map(() =>
			GeneralModel(
				faker.random.uuid(),
				randomInt(17, 34),
				generateTags(abilityTags),
				generateTags(interestTags),
				generateWorkingPeriod(),
				randomIntFromZero(6)
			)
		)

export const generateData = (
	merchants = 100,
	studentMerchantRatio = 3,
	abilityTags = 4,
	interestTags = 4
) => ({
	merchantData: generateMerchantData(merchants, abilityTags, interestTags),
	studentData: generateStudentData(
		merchants,
		studentMerchantRatio,
		abilityTags,
		interestTags
	),
	abilityTags,
	interestTags,
})
