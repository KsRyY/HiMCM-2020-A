import faker from 'faker'

const randomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) + min)

const randomIntFromZero = max => randomInt(0, max)

function generateWorkingPeriod() {
	const startHour = randomIntFromZero(23)

	if (startHour < 7 || startHour > 19) {
		return generateWorkingPeriod()
	}

	let pass = true
	const startMinute = randomIntFromZero(59)
	const periodHour = randomIntFromZero(11)
	const periodMinute = randomIntFromZero(59)
	let endHour = startHour + periodHour
	const endMinute = (() => {
		const calcEndMinute = startMinute + periodMinute
		if (calcEndMinute > 60) {
			endHour += 1
			if (endHour >= 19) {
				pass = false
				return
			}

			return calcEndMinute - 60
		}

		return calcEndMinute
	})()

	if (endHour >= 19) {
		return generateWorkingPeriod()
	}

	if (!pass) {
		return generateWorkingPeriod()
	}

	return `${startHour}:${startMinute} ${endHour}:${endMinute}`
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
	abilityTags = 20,
	interestTags = 20
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
