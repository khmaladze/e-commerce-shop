import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
// import { joiValidationError } from '../utils/external.validation.error'

const userEndpointDesc =
	'This is how to add swagger description for this endpoint'
export const TAGS = ['calculator']
export const requestSchema = Joi.object({
	params: Joi.object(),
	query: Joi.object(),
	body: Joi.object({
		a: Joi.number().required(),
		b: Joi.number().required(),
		operation: Joi.string().valid('+', '-', '/', '*').required(),
		// eslint-disable-next-line @typescript-eslint/require-await
	}).custom((value, helpers) => {
		if (value.b === 0 && value.operation === '/') {
			return helpers.message({
				custom: "if 'operation' equal '/' 'b' cant equal 0",
			})
		}
		return value
	}),
	// .external(async (value) => {
	// 	if (value.b === 0 && value.operation === '/') {
	// 		throw joiValidationError(
	// 			"if 'operation' equal '/' 'b' cant equal 0",
	// 			'division_on_zero',
	// 			['body'],
	// 			value
	// 		)
	// 	}
	// 	return value
	// })
	// 	.external(async (value) => {
	// 		if (value.b === 0 && value.operation === '/') {
	// 			throw new Error("if 'operation' equal '/' 'b' cant equal 0")
	// 		}
	// 		return value
	// 	})
}).description(userEndpointDesc)

export const responseSchema = Joi.object({
	result: Joi.number(),
})

export const businessLogic = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { a, b, operation } = req.body
	let result = 0
	if (operation === '+') {
		result = a + b
	}
	if (operation === '-') {
		result = a - b
	}
	if (operation === '/') {
		result = a / b
	}
	if (operation === '*') {
		result = a * b
	}
	try {
		return res.json({
			result,
		})
	} catch (e) {
		return next(e)
	}
}
