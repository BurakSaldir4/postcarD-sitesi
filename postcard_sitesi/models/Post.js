import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
	{
		baslik: {
			type: String,
			required: true,
		},
		metin: {
			type: String,
			required: true,
		},
		resim: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Post = models.Post || model("Post", postSchema);

export default Post;
