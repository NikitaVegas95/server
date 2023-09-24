import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password.trim()
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email.toLowerCase(),
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })

        const user = await doc.save()

        const token = jwt.sign(
            {
                _id: user._id,
            },
            '7412',
            {
                expiresIn: '2d',
            },
        )

        res.json({
            ...user,
            token,
        })
    } catch (err) {
        res.status(500).json(
            {
                message: 'Не удалось зарегистрироваться',
            }
        )
    }
}
export const login = async (req, res) =>{
    try {
        const user = await UserModel.findOne({ email: req.body.email.toLowerCase().trim() })

        if (!user) {
            return res.status(404).json({
                message: 'Не удалось войти',
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password.trim(), user._doc.passwordHash)

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Не верный логин или пароль',
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            '7412',
            {
                expiresIn: '2d',
            },
        )

        res.json({
            ...user,
            token,
        })

    } catch (err) {
        res.status(500).json(
            {
                message: 'Не удалось авторизоваться',
            }
        )
    }

}
export const getMe = async (req, res) => {

    try {

        const user = await UserModel.findById(req.userId)

        if (!user) {
            return res.status(404).json({
                message: 'Что-то не так',
            })
        }

        res.json({...user})
    } catch (err) {
        res.status(500).json(
            {
                message: 'Нет доступа',
            }
        )
    }
}