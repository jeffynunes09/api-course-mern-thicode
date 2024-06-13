import Usuario from '../models/UserModel.js';
import { createService, findAllService, findByIdService, updateUserService, deleteService } from '../services/user.service.js';
import mongoose from 'mongoose';

const create = async (req, res) => {
    const { name, userName, email, password, avatar, background } = req.body;

    try {
        // Verificação de campos obrigatórios
        if (!name || !userName || !email || !password || !avatar || !background) {
            return res.status(400).json({ message: 'Submit all fields for registration!' });
        }
        // Criação do usuário
        const user = await createService(req.body);
        if (!user) {
            return res.status(400).json({ message: 'Error creating User' });
        }

        // Resposta de sucesso
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name,
                userName,
                email,
                avatar,
                background
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const findAll = async (req, res) => {
    try {
        const users = await findAllService();

        if (users.length === 0) {
            return res.status(400).send({
                message: 'There are no registered users'
            });
        }

        res.status(200).send({
            users
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const findById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await findByIdService(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, userName, email, password, avatar, background } = req.body;

    if (!name && !userName && !email && !password && !avatar && !background) {
        return res.status(400).json({
            message: 'Submit at least one field for update!'
        });
    }

    try {
        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (userName) updatedFields.userName = userName;
        if (email) updatedFields.email = email;
        if (password) updatedFields.password = password;
        if (avatar) updatedFields.avatar = avatar;
        if (background) updatedFields.background = background;

        const user = await updateUserService(id, updatedFields);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json({
            message: 'User updated successfully!',
            user: {
                id: user._id,
                name: user.name,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
                background: user.background
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await deleteService(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json({
            message: 'User deleted successfully!',
            user
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export {
    create,
    findAll,
    findById,
    updateUser,
    deleteUser
};
