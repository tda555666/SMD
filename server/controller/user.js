
const User = require("../model/user");
const { hashP } = require("../services/encrypt")



const userController = {

    register : async function(req, res){
            try {
            const { username, email, password } = req.body;
        
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res
                .status(400)
                .json({ error: "Username or Email already exists" });
            }
            let passwdreg = await hashP(password);
        
            const user = new User({ username, email, password:passwdreg  });
            await user.save();
        
            res.status(201).json({ message: "User created successfully" });
            } catch (error) {
            res.status(500).json({ error: error.message });
            }
    },

    getUsers: async (req,res)=>{
        try{
            const user = await User.find()
            res.status(200).json(user)
        }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: "Internal error"})
        }
    },

    updatePassword: async(req,res)=>{
        try{

            let passwd = await hashP(req.body.password);

            const updatedUser = await User.findByIdAndUpdate(req.params.userId, 
                                                          {password: passwd},{
                new:true
            })
            res.status(200).json(updatedUser)
        }
        catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})
        }
    },
}
module.exports = userController ; 