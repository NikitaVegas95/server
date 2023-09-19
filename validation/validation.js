import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'Не верный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5, max: 256 }),
]

export const registrationValidation = [
    body('email', 'Не верный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5, max: 256 }),
    body('fullName', 'Укажите имя').isLength({ min: 2, max: 30}),
    body('avatarUrl', 'Не верная ссылка на аватарку').optional().isURL(),
]

export const taskValidation = [
    body('title', 'Нет заголовка').isLength({ min: 3 }).isString(),
    body('text', 'Нет текста').isLength({ min: 3 }).isString(),
    body('tags', 'Нет тегов').optional().isString(),
]