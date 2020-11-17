export const randomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) + min)

export const randomIntFromZero = max => randomInt(0, max)
