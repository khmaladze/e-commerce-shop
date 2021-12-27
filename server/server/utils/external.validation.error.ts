import Joi from 'joi'

// eslint-disable-next-line import/prefer-default-export
export const joiValidationError = (
	message: string,
	type: string,
	path: Array<string>,
	value?: any,
) => {
	const label = path.join('.')
	const key = path[path.length - 1]
	return new Joi.ValidationError(
		'custom',
		[
			{
				message,
				path,
				type,
				context: {
					label,
					value,
					key,
				},
			},
		],
		value,
	)
}
