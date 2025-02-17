import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const ProjectSchema = new mongoose.Schema(
	{
		name: {
			type: String
		},
		description: {
			type: String
		},
		author: {
			type: ObjectId,
			ref: 'User'
		},
		rootDirectory: {
			type: ObjectId,
			ref: 'File'
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Project', ProjectSchema);
