'use strict'

const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { ROLES } = require('../const');
const { BadRequestError } = require('../core/error.response');

class AccessService {
    static signUp = async ({ username, email, password }) => {
        // Step 1: check username
        const holderUserName = await userModel.findOne({ username }).lean();
        if (holderUserName) {
            throw new BadRequestError ('Username already Registered!');
            // return {
            //     code: 'xxxx',
            //     message: 'Username already Registered',
            // }
        }

        // Step 2: check email
        const holderUserEmail = await userModel.findOne({ email }).lean();
        if (holderUserEmail) {
            throw new BadRequestError ('Email already Registered!');
            // return {
            //     code: 'xxxx',
            //     message: 'Email already Registered',
            // }
        }

        // create new user
        const passwordHash = await bcrypt.hash(password, 10);
        console.log('passwordHash::', passwordHash);
        const newUser = await userModel.create({
            username,
            email,
            password: passwordHash,
            roles: [ROLES.CLIENT],
        });

        if (newUser) {
            //create private key, public key (private key used for syncing a token 
            //and public key used for validation that token)

            const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem'
                }
            });

            console.log({ privateKey, publicKey });

            //create public key for decoding token
            const publicKeyString = await KeyTokenService.createKeyToken({
                userId: newUser._id,
                publicKey: publicKey
            });

            if (!publicKeyString) {
                throw new BadRequestError ('Create Public Key Failed');

                // return {
                //     code: 'xxxx',
                //     message: 'Create Public Key Failed',
                // }
            }
            console.log(`publicKeyString:: ${publicKeyString}`);

            //convert public key string to object
            const publicKeyObject = crypto.createPublicKey(publicKeyString);
            console.log(`publicKeyObject:: ${publicKeyObject}`);


            // Create token pair
            const tokens = await createTokenPair({ userId: newUser._id, username, email }, publicKeyString, privateKey);
            console.log(`Create token successfully::`, tokens);

            return {
                code: '201',
                metadata: {
                    user: getInfoData({ fileds: ['_id', 'username', 'email', 'roles'], object: newUser }),
                    tokens
                }
            }
        }

        //error
        return {
            code: '200',
            metadata: null
        }
    }
}

module.exports = AccessService;