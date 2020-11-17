export const Time = (hour, minute) => ({
	hour,
	minute,
	toString: () => `${hour}:${minute}`,
	addBy(addedHour, addedMinute) {
		let calcHour = hour + addedHour
		let calcMinute = minute + addedMinute
		if (calcMinute > 59) {
			calcHour += 1
			calcMinute -= 60
		}

		return Time(calcHour, calcMinute)
	},
	subtractBy(addedHour, addedMinute) {
		let calcHour = hour - addedHour
		let calcMinute = minute - addedMinute
		if (calcMinute < 0) {
			calcHour -= 1
			calcMinute += 60
		}

		return Time(calcHour, calcMinute)
	},
	verifyHour: func => func(hour),
	verifyMinute: func => func(minute),
	wrap: () => [hour, minute],
})
