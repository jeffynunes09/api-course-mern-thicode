import Usuario from '../models/UserModel.js';

const createService = async (body) => {
    try {
        const user = await Usuario.create(body);
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

const findAllService = async () => {
    try {
        const users = await Usuario.find();
        return users;
    } catch (error) {
        throw new Error('Error finding users: ' + error.message);
    }
};

const findByIdService = async (id) => {
    try {
        const user = await Usuario.findById(id);
        return user;
    } catch (error) {
        throw new Error('Error finding user by id: ' + error.message);
    }
};

const updateUserService = async (id, body) => {
    try {
        const user = await Usuario.findByIdAndUpdate(id, body, { new: true });
        return user;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const deleteService = async (id) => {
    try {
        const user = await Usuario.findByIdAndDelete(id);
        return user;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

export {
    createService,
    findAllService,
    findByIdService,
    updateUserService,
    deleteService
};
