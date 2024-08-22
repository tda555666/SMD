
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
    }
}
module.exports = userController ; 