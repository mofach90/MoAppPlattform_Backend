import * as  bcrypt from "bcrypt"
import * as dotenv from "dotenv";

//this script generate your hashed passord , change yourPassword , run the script then store -
// the hashed value returned in the console in your .env file as PASSWORD
dotenv.config();
const yourPassword = "admin"
const hashPassword = async (yourPassword:string) => {
    try {
        const hash = await bcrypt.hash(yourPassword,10)
        if (hash){
            return hash
        }
    } catch (error) {
        console.log('Errror when hashing the password', error)
    }
}
const yourHashedPassword = await hashPassword(yourPassword)
console.log({yourHashedPassword})