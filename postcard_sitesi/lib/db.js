import mongoose from "mongoose";

const connectDb = async () => {
	if (mongoose.connections[0].readyState) {
		console.log("MongoDB bağlantısı zaten mevcut.");
		return true;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("MongoDB bağlantısı kuruldu.");
		return true;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export default connectDb;
