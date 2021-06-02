import User from '../models/User.js';
import shortid from 'shortid';

// export const registerUser = async (req, res) => {
// 	const { username, password } = req.body;
// 	const _user = new User({ username, password });

// 	await _user
// 		.save()
// 		.then(user => {
// 			res.send(user);
// 		})
// 		.catch(err => {
// 			res.send(err.message);
// 		});
// };

export const registerUser = (req, res) => {
	let userByEmail = { email: req.body.email };

	User.findOne(userByEmail)
		.exec()
		.then(async user => {
			if (user) {
				return res.status(401).send({
					message: `${userByEmail.email} is already registered.`,
				});
			}

			const { email, password, username } = req.body;
			const _user = new User({
				email,
				password,
				username,
			});

			_user
				.save()
				.then(user => {
					return res.status(201).send(user);
				})
				.catch(err => {
					return res.status(401).send(err.message);
				});
		});
};

export const login = (req, res) => {
	let userByEmail = { email: req.body.email };

	User.findOne(userByEmail)
		.exec()
		.then(async user => {
			if (!user) {
				return res.status(401).send({
					message: `${userByEmail.email} is not yet registered.`,
				});
			}

			if (user.password !== req.body.password) {
				return res.status(401).send({
					message: `Passwords is incorrect.`,
				});
			}

			res.send({
				message: `${user.username} is logged in successfully.`,
				username: user.username,
			});
		})
		.catch(err => {
			res.send(err);
		});
};
