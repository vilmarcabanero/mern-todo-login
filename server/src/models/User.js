import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please provide an email.'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password.'],
	},
});

export default mongoose.model('User', UserSchema);
