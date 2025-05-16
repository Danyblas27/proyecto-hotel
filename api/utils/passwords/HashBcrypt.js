import bcrypt from 'bcrypt';

const HashBcrypt = {

    saltRounds: 10,
    hashPassword: async (password) => {
        const hashedPassword = await bcrypt.hash(password, HashBcrypt.saltRounds);
        return hashedPassword;
    },
    comparePassword: async (password, hashedPassword) => {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }
}

export default HashBcrypt;