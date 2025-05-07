import bcrypt from 'bcrypt';

const saltRounds = 50;

export const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(data.password, 50);

    return hashedPassword;
}

export const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}
