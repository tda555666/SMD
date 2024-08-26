
const User = require("../model/user");

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
        
            const user = new User({ username, email, password });
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

    getUser: async(req,res)=>{
        try{
            const activeuser = await User.findOne(req.body);
            console.log(activeuser);
            
            res.status(200).json(activeuser)
        }catch(error){
            console.error("There is an error:",error)
            res.status(500).json({error: "Internal error"})
        }
    }
}
module.exports = userController ; 