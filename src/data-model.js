import faker from 'faker'

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

export function generateWorkingPeriod() {
	const startHour = faker.random.number(23)

	if (startHour < 7 || startHour > 19) {
		return generateWorkingPeriod()
	}

	let pass = true
	const startMinute = faker.random.number(59)
	const periodHour = faker.random.number(11)
	const periodMinute = faker.random.number(59)
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

const generateTags = tagCount =>
	new Array(tagCount).fill(0).map(() => faker.random.number(100))

export function generateData(
	merchants = 100,
	studentMerchantRatio = 10,
	abilityTags = 20,
	interestTags = 20
) {
	const studentData = new Array(merchants * studentMerchantRatio)
		.fill(0)
		.map(() =>
			GeneralModel(
				faker.random.uuid(),
				faker.random.number(17) + 17,
				generateTags(abilityTags),
				generateTags(interestTags),
				generateWorkingPeriod(),
				faker.random.number(6)
			)
		)
	const merchantData = new Array(merchants)
		.fill(0)
		.map(() =>
			GeneralModel(
				faker.random.uuid(),
				faker.random.number(17) + 17,
				generateTags(abilityTags),
				generateTags(interestTags),
				generateWorkingPeriod(),
				faker.random.number(6)
			)
		)

	return {
		merchantData,
		studentData,
		abilityTags,
		interestTags,
	}
}
