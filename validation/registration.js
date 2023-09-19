import {body} from 'express-validator'

export const registrationValidation = [
    body('email', 'Не верный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5, max: 256 }),
    body('fullName', 'Укажите имя').isLength({ min: 2, max: 30}),
    body('avatarUrl', 'Не верная ссылка на аватарку').optional().isURL(),
]