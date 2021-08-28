import mongoose from 'mongoose'

const {MONGODB_URI, MONGODB_USER, MONGODB_PASSWD} = process.env

export default async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            auth: { authSource: "admin" },
            user: MONGODB_USER,
            pass: MONGODB_PASSWD,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('conectado a mongodb')
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}