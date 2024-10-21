import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js';



export const register = async(req,res) =>{
    try{
        const {username,password} = req.body;
        
        const salt = await bcrypt.genSalt();
        const Hash = await bcrypt.hash(password,salt)
        const newUser = new User({
            username,
            password : Hash,
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    }
    catch(err){
        res.status(500).json(err);
    }
}



export const login = async (req, res) => {
    console.log(req.body); // To debug request body

    try {
        const { username, password } = req.body;

        // Validate request body
        if (!username || !password) {
            return res.status(400).json({ msg: "Username and password are required" });
        }

        // Find user in database
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, userDoc.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password" });
        }

        // Generate token
        jwt.sign({ username, id: userDoc._id }, process.env.SECRET, {}, (err, token) => {
            if (err) {
                throw err;
            }

            // Send response without exposing the password
            const { _id, username } = userDoc;  // Destructure needed fields
            res.json({
                id: _id,
                username,
                token
            });
        });

    } catch (err) {
        console.log('nikhil');
        
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export const check = async(req,res)=>{
    const header = req.headers;
    const token = header?.authorization.split(' ')[1];
    if(!token) return res.json('')
    try{
        jwt.verify(token,process.env.SECRET,{},(err,info)=>{
            if(err) throw err;
            res.json(info);
        })
    }
    catch(err){
        console.log(err)
    }
}

