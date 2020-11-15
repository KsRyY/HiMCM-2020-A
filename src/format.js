// formatStudentInfo :: [object] -> [string]
const formatStudentInfo = studentData =>
	studentData.map(
		student =>
			`${student.name} ${student.salary} ${student.ability.join(
				' '
			)} ${student.interest.join(' ')} ${student.workingPeriod} ${
				student.restTime
			}`
	)

// formatMerchantInfo :: [object] -> [string]
const formatMerchantInfo = merchantData =>
	merchantData.map(
		merchant =>
			`${merchant.name} ${merchant.salary} ${merchant.ability.join(
				' '
			)} ${merchant.interest.join(' ')} ${merchant.workingPeriod} ${
				merchant.restTime
			}`
	)

// formatOutput :: object -> string
export function formatOutput({
	studentData,
	merchantData,
	abilityTags,
	interestTags,
}) {
	const studentInfo = formatStudentInfo(studentData)
	const merchantInfo = formatMerchantInfo(merchantData)

	return `${abilityTags} ${interestTags} ${merchantInfo.length} ${
		studentInfo.length
	} ${studentInfo.join(' ')} ${merchantInfo.join(' ')}`
}
