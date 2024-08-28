const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtDecode} = require('jwt-decode');
const util = require('util');
const { getResetToken } = require('./encrypt');
const { getMailTemplateWithLink, mail } = require('./mail');
const { updateResetToken } = require('../controller/user');

module.exports = {

    generateAccessToken: function(user) {

        return jwt.sign({
            id : user._id ,
            role: user.role,
            email: user.email ,
            username: user.username ,

        }, process.env.JWT_SECRET,
        {
            expiresIn: '300s'
        }
        )
        
    },

    generateRefreshToken: function(user) {

        return jwt.sign({
            id : user._id ,
            role: user.role,
            email: user.email ,
            username: user.username ,
        }, process.env.JWT_REFRESH,{
            expiresIn: '1d'
        })

    },

    login: async (req,res) => {
        // AUTHENTICATION
        try {

            let email = req.body.email;
            let password = req.body.password;
            
            // populate the field "role" only with the field "userType" 
            //      from the appropriate "role" document
            let user = await User.findOne({email});
            
            if (!user) {
                return res.status(401).json({err: `Email ${email} not found`})
            }

            // let match = await bcrypt.compare(password, user.password);
            // if (!match)
            let match = await bcrypt.compare(password, user.password);

            if (!match)
                return res.status(401).json({err: `Invalid password ${password}`});


            let accessToken = module.exports.generateAccessToken(user);
            let refreshToken = module.exports.generateRefreshToken(user);
            

            // We don't keep accessToken at the backend,
            // But we keep refreshToken:

            const updatedUser = await User.findByIdAndUpdate(user.id, 
                {refreshToken},{ new:true })
                // new:true - return the user 

            // 900000 - 15min,9000000 - 2.5hours
            // res.cookie('olympics', refreshToken, { maxAge: 9000000})
            res.status(201).json({auth:true,accessToken,refreshToken,msg: 'Congratulations! You\'ve logged in!'});

        } catch(err) {

            console.log(`err: \n${err.message}`)
            res.status(500).json({err: err.message})

        }

    },

    // middleware - to ensure that the user is authorized
    // next() - is a function that passes req and res
    // to the next middleware or to the endpoint function

    // the token should be in the header
    verify: (req,res,next) => {

        console.log(`REQUEST HEADER:\n`,req.headers);

        let authPart = req.headers.authorization || req.headers.Authorization;

        console.log(authPart);
        

        if (!authPart || !authPart.startsWith('Bearer ')) 
            return res.status(401).json({auth:false,
             msg: `You're not authorized`})

        // In the header the token is sent in the form:
        // Bearer aA85938Bc................

        let token = authPart.split(' ')[1];

        // jwt.verify returns the decoded payload
        jwt.verify(token,process.env.JWT_SECRET,(err,user) => {

            if (err) 
                return res.status(403).json({auth:false,
                            msg: `The token has been expired`,
                        err:err.message});

            // for some useful case, let's add the decoded payload to the request
            // for the sake of the next function

            req.user = user;
            next();
        })
    },

    refresh: async function(req, res) {
        // take the refresh token from the user 
        //const cookies = req.cookies;
        const email = req.body.email;
        const refreshToken = req.body.refreshToken;

        // send err if there is no token or it is invalid
        if (!refreshToken) {
            console.log(`\n*** NO REFRESH TOKEN ***\n`)
            return res.status(401).json({auth: false, message: `You're not authenticated, no token`});
        } 
            
        console.log(`\n********\nemail: ${email} \nrefreshToken: ${refreshToken}`)
        
        const user = await User.findOne({ refreshToken , email }).populate('role','userType').exec();
        
        console.log(`user:\n`,user)

        if (!user) {
            
            console.log(`\n*** NO USER ***\n`)
            
            return res.status(401).json({auth: false, message: `Refresh token was not found`});    
            
        }
        
        try {

            const jwtVerify = util.promisify(jwt.verify);

            const decodedUser = await jwtVerify(refreshToken,process.env.JWT_REFRESH_SECRET);
        
        } catch (err) {

            console.log(err)
            console.log(err.message)
                
            console.log(`\n*** TOKEN NOT VERIFIED ***\n`)
            return res.status(403).json({auth: false, 
                                message: `Your session has been expired`});

        }

        let newAccessToken = module.exports.generateAccessToken(user);
        let newRefreshToken = module.exports.generateRefreshToken(user);
        console.log(`newAccessToken decoded: \n`,jwtDecode(newAccessToken))

        const updatedUser = await User.findByIdAndUpdate(user.id, 
            {refreshToken:newRefreshToken},{ new:true })   //tbd try-catch

        //res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.send({auth:true,accessToken:newAccessToken,refreshToken:newRefreshToken});
    
    },

    forgotPassword: async function(req,res) {
        // 1. get email - check that the user exists
        // 2. create resetToken and put it into DB
        // 3. create email with link and send
        let email = req.body.email;
        
        const user = await User.findOne({email});

        if (!user) {

            return res.status(400).json({message:`Email ${email} does not exist`})

        } 

        let resetToken = getResetToken();

        // tbd: we should store the resetToken in the DB 
        // -- or add it as a new field to the User schema
        // -- or create new model ResetToken

        let result = await updateResetToken(user.id, resetToken);

        if (!result.status) {

            return res.status(500).json({message:result.message});

        }

        let message = getMailTemplateWithLink('We have recieved your request to reset your password. Please reset your password using the link below',
        `${process.env.FRONTEND_URL}/auth/reset-password?id=${user.id}&token=${resetToken}`,
        'Reset Password');

        try {
            let result = mail(email, 'Reset Olympics Password Link',message);
            res.json({message: 'Reset password link email has been sent successfully'});
        } catch(err) {
            res.status(500).json({message:err.message});
        }

    },

    resetPassword: async function(req,res) {

        let newpassword = req.body.newpassword;
        let resetToken = req.body.resetToken;
        let userId = req.body.userId;

        if (!resetToken) {

            return res.status(400).json({message:'Something went wrong'})

        }

        let user = User.findOne({_id: userId});

        if (!user.resetToken || !user.resetTokenExpiresAt) {

            return res.status(500).json({message:'Something went wrong. Try later'})

        }

        const currDateTime = new Date();

        if (currDateTime > user.resetTokenExpiresAt) {

            return res.status(401).json({message: `The reset link has been expired`})

        }


        // tbd. resetToken === user.resetToken ?
        // tbd. replace the password in the db, and delete the token
        // optional tbd. send email about replacing the password

        res.json({message:'The password was changed successfully'})

    },

    logout: async function(req, res) {
 
        const refreshToken = req.body.token;

        if (!refreshToken) {
            
            res.json({auth: false, message: `LOGGED OUT`});
        
        } else {

            let tokenId = await tokens.getIdByToken(refreshToken);
            if (tokenId === 'ERR' || tokenId === 'NOT FOUND') {

                return res.json({auth: false, message: `LOGGED OUT`});    

            }

            tokens.deleteToken(tokenId);

            res.json({auth: false, message: `LOGGED OUT`});

        }

        // if everything is OK create access or refresh token and send it to user
    },

}