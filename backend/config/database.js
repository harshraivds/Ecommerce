const mongoose = require("mongoose");
const userModel = require("../models/userModel");

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB connected with server: ${connection.connection.host}`);
        await init();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

async function init() {
    try {
        let user = await userModel.findOne({ role: "Admin" });

        if (user) {
            console.log("Admin is already present");
            return;
        }

        const newUser = await userModel.create({
            name: "Harsh",
            email: "harsh@gmail.com",
            password: "Welcome1",
            role: "Admin",
            avatar: {
                public_id: "this is sample id",
                url: "publicsample url",
            }
        });

        console.log("Admin created ", newUser);
    } catch (error) {
        console.error("Error while initializing admin:", error);
    }
}

module.exports = connectDatabase;
