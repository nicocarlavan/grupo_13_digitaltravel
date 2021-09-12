const fs = require('fs');
const path = require('path');

const User = {
    fileName: path.join(__dirname, '../data/users.json'),
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return (lastUser.id + 1);
        }
        return 1;

    },
    roleUser: function () {
        return 1;

    },
    roleAdmin: function () {
        return 9;

    },
    findAll: function () {
        return this.getData();
    },
    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },
    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },
    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            image: userData.image,
            role: this.roleUser()
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },
    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    },
    role: function (fields) {

        let allUsers = this.findAll();

        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].id == fields.userId) {
                allUsers[i].role = fields.role;
            }
        }
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return true;
    }

}

module.exports = User;