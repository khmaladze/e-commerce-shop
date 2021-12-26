import express from 'express'
import passport from 'passport'
import { permissionMiddleware } from '../middlewares/permissions'
import validationMiddleware from '../middlewares/validationMiddleware'
import * as users from './users/get.user'
import * as calculator from './post.calculator'
import animalsRouter from './animals/index'

const router = express.Router()
router.get(
	'/users/:userID',
	// passport.authenticate("local"),
	// permissionMiddleware(["SUPERADMIN", "TEST"]),
	validationMiddleware(users.requestSchema),
	users.businessLogic,
)
router.post(
	'/calculator',
	validationMiddleware(calculator.requestSchema),
	calculator.businessLogic,
)
router.use('/animals', animalsRouter)
export default router
