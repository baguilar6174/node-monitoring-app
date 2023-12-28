import { type Model, Schema, model } from 'mongoose';

const schema = new Schema({
	level: {
		type: String,
		enum: ['low', 'medium', 'high'],
		default: 'low'
	},
	message: {
		type: String,
		required: true
	},
	origin: {
		type: String
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
});

export const LogModel: Model<Document> = model<Document>('Log', schema);
