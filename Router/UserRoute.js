const express = require('express');
const UserOp = require('../operation/UserOperation')


const UserRouter = express.Router();

UserRouter.route('/login')
.get(UserOp.login);

UserRouter.route('/postLogin').post(UserOp.postLogin);

UserRouter.route('/signin')
.get(UserOp.signin);

UserRouter.route('/postSignin')
.post(UserOp.postSignin);

UserRouter.route('/postError')
.post(UserOp.postError);


module.exports = UserRouter;

