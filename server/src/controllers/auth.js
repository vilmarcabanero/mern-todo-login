import User from '../models/User.js';

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
					error: `${userByEmail.email} is already registered.`,
				});
			}

			const { email, password } = req.body;
			const _user = new User({
				email,
				password,
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
