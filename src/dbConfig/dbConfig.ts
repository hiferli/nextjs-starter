import mongoose from 'mongoose'

export async function connect () {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected' , () => {
            console.log(
                "MongoDB Connected Successfully"
            )
        })

        connection.on("error" , (error) => {
            console.log("DB Side error. Make sure the database is connected correctly");
            console.log(error);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
    }
}