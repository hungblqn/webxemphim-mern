import express from 'express';
import { Account } from '../models/accountModel.js';
import { Token } from '../models/tokenModel.js';
import jwt from 'jsonwebtoken';
import { FEAddress, jwtSecretKey } from '../config.js';
import bcrypt from 'bcrypt';
import { verifyEmail } from '../utils/sendEmail.js';
import { BEAddress } from '../config.js';

const router = express.Router();

//generate random string
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
}

//Lấy tất cả tài khoản
router.get('/', async (request, response) => {
    try {
        const accounts = await Account.find({});
        return response.status(200).send({ accounts });
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({ error });
    }
})
//Lấy tài khoản với id tài khoản
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const account = await Account.findById(id);
        if (account) return response.status(200).send({ message: "Account found", data: account });
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({ error });
    }
})

//Thêm tài khoản (Dưới dạng đăng ký)
router.post('/', async (request, response) => {
    try {
        if (!request.body.username || !request.body.email || !request.body.password || !request.body.gender) {
            return response.status(400).send({
                message: 'Send all required fields: username, email, password, gender'
            });
        }
        const email = request.body.email;
        const account = await Account.findOne({ email: email });
        if (account) {
            return response.status(234).send({
                message: 'email is already in use.'
            });
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const newAccount = {
            username: request.body.username,
            email: request.body.email,
            password: hashedPassword,
            gender: request.body.gender,
            verified: false
        }
        const createdAccount = await Account.create(newAccount);
        const code = generateRandomString(20);
        const token = {
            code: code,
            expired: false,
            account: createdAccount._id
        }
        Token.create(token);

        const link = `${BEAddress}/account/verify/${code}`;

        await verifyEmail(createdAccount.email, "Xác thực tài khoản của bạn", link);

        return response.status(200).send('account created successfully');
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({ error });
    }
})
//Thêm tài khoản (dành cho admin)
router.post('/admin/create', async (request, response) => {
    try {
        console.log(request.body);
        if (!request.body.username || !request.body.email || !request.body.password || !request.body.gender || !request.body.role || !request.body.verified) {
            return response.status(400).send({
                message: 'Send all required fields: username, email, password, role, verified'
            });
        }
        const password = await bcrypt.hash(request.body.password, 10)
        const newAccount = await Account.create({
            username: request.body.username,
            email: request.body.email,
            password: password,
            role: request.body.role,
            gender: request.body.gender,
            verified: request.body.verified
        })
        if (!newAccount) return response.status(500).send('error');
        return response.status(200).send('done');
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({ message: error });
    }
})

// Xác thực tài khoản
router.get('/verify/:code', async (request, response) => {
    try {
        const { code } = request.params;
        const token = await Token.findOne({ code: code });
        if (!token) {
            return response.status(400).send({
                message: 'Token doesnt exist'
            });
        }
        console.log(token.expired);
        const account = await Account.findById(token.account);
        if (token.expired === false) {
            account.verified = true;
            await account.save();
            token.expired = true;
            await token.save();
            response.redirect(`${FEAddress}/login`);

        }
        else return response.status(200).send('Token expired');
    }
    catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
})
//Đăng nhập
router.post('/login', async (request, response) => {
    try {
        if (!request.body.email || !request.body.password) {
            return response.status(400).send({
                message: 'Send all required fields: email, password'
            });
        }
        const { email, password } = request.body;
        const account = await Account.findOne({ email: email });
        if (!account) return response.status(234).json({ message: "Account not found" });

        const isPasswordValid = await bcrypt.compare(password, account.password);
        const verified = account.verified;
        if (verified === false) {
            return response.status(234).json({ message: "Account is not verified" });
        }
        if (isPasswordValid) {
            const token = jwt.sign({ id: account._id, email: account.email, role: account.role, verified: account.verified },
                jwtSecretKey, { expiresIn: '1d' });
            response.cookie('token', token);
            return response.json({ Status: "Success", role: account.role })
        }
        return response.json({message: 'login failed'})

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//get role with token signed with jwt
router.get('/authentication/get-account-data', async (request, response) => {
    const token = request.cookies.token;
    if (!token) return response.json("token is missing");
    await jwt.verify(token, jwtSecretKey, (error, decoded) => {
        if (error) return response.json("error with token");
        return response.status(200).json({ data: decoded });
    })
})

//logout
router.post('/logout', (request, response) => {
    response.clearCookie('token');
    response.json({ message: 'User logged out' });
})

//Xoá tài khoản với id tài khoản
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Account.findByIdAndDelete(id);

        if (!result) return response.status(404).json({ message: "Account not found" });
        return response.status(200).send({ message: "Account deleted successfully" });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Sửa tài khoản với id tài khoản (bình thường)
router.put('/normalEdit/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const data = request.body;
        const account = await Account.findOne({_id: id});
        account.username = data.username;
        account.email = data.email;
        account.password = await bcrypt.hash(data.password, 10);
        account.gender = data.gender;
        account.verified = data.verified;
        if(request.body.avatar){
            account.avatar = data.avatar;
        }
        const result = await account.save();
        if(result) return response.status(200).send({message:"Account updated successfully"});
        return response.status(404).send({message: "Update account failed"});
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Sửa tài khoản với id tài khoản (không đổi pass)
router.put('/keepPasswordEdit/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const data = request.body;
        const account = await Account.findOne({_id: id});
        account.username = data.username;
        account.email = data.email;
        account.password = data.password;
        account.gender = data.gender;
        account.verified = data.verified;
        if(request.body.avatar){
            account.avatar = data.avatar;
        }
        const result = await account.save();
        if(result) return response.status(200).send({message:"Account updated successfully"});
        return response.status(404).send({message: "Update account failed"});
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

export default router;
