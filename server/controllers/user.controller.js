const user = require("../models/user.model");

const secret_key = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken"); // for our web tokens
const bcrypt = require("bcryptjs"); // for logging in

const registerNewUser = async (req, res) => {
  try {
    // console.log(secret_key);
    const newUser = await user.create(req.body);
    //     // create a token and save the user's id and sign iff with the secret key from our .env file
    const userToken = jwt.sign(
        {
          id: user._id,
        },
        secret_key,
        { expiresIn: "2h" }
      );
      res
        .cookie("userToken", userToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 2,
        })
        .status(201)
        .json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};



const loginUser = async (req, res) => {
    try {
        const possibleUser = await user.findOne({email: req.body.email});
        if (!possibleUser) { // no user found - no need to check the password
            res.status(400).json({message: "Invalid login credentials"});
        }else {
            const doPasswordsMatch = await bcrypt.compare(req.body.password, possibleUser.password)
            if (!doPasswordsMatch) { // password is incorrect
                res.status(400).json({message: "Invalid login credentials"});
            }else{
                const userToken = jwt.sign(
                    {
                      id: possibleUser._id,
                    },
                    secret_key,
                    { expiresIn: "2h" }
                  );
                  res
                    .cookie("userToken", userToken, {
                      httpOnly: true,
                      maxAge: 1000 * 60 * 60 * 2,
                    })
                    .status(201)
                    .json(possibleUser);
            }
        }
    }catch (err) {
        res.status(400).json({message: "a problem occur while login"})
    }
}
 


const logoutUser = (req, res) => {
  res
    .status(200)
    .clearCookie("userToken")
    .json({ message: "you have logged out successfully" });
};

module.exports = {
  registerNewUser,
  loginUser,
  logoutUser,
};
