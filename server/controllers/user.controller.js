const User = require("../models/user.model");

const secret_key = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken"); // for our web tokens
const bcrypt = require("bcryptjs"); // for logging in

const registerNewUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    //check email
    // if(newUser) {
    //   res.json({message:"email already in use"})
    // }

    const { _id, lastName, firstName, email, createdAt, updatedAt } = newUser;
    const resUser = { firstName, lastName, email, createdAt, updatedAt, _id };
    //     // create a token and save the user's id and sign iff with the secret key from our .env file
    const userToken = jwt.sign(
      {
        id: newUser._id,
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
      .json({ message: "success!", newUser: resUser });
  } catch (err) {
    res.status(400).json(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const possibleUser = await User.findOne({ email: req.body.email });
    if (!possibleUser) {
      // no user found - no need to check the password
      res.status(400).json({ message: "Invalid login credentials" });
    } else {
      const doPasswordsMatch = await bcrypt.compare(
        req.body.password,
        possibleUser.password
      );
      if (!doPasswordsMatch) {
        // password is incorrect
        res.status(400).json({ message: "Invalid login credentials" });
      } else {
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
  } catch (err) {
    res.status(400).json({ message: "a problem occur while login" });
  }
};

const logoutUser = (req, res) => {
  res
    .clearCookie("userToken")
    .status(200)
    .json({ message: "you have logged out successfully" });
};

const getAllUsers = (req, res) => {
  User.find()
  .then((allUsers) => {
      res.json(allUsers)
  })
  .catch((err) => {
      res.status(500).json(err)
  })
};

const getOneUser= (req, res) => {
  User.findOne({_id: req.params.id})
  .then((oneUser) => {
      res.json(oneUser)
  })
  .catch((err) => {
      res.status(500).json(err)
  })
};


const updateUser = (req, res) => {
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
  .then((updatedUser) => {
      res.json(updatedUser)
  })
  .catch((err) => {
      res.status(500).json(err)
  })
     
};
const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id }) //note: "id" here MUST match id in corresponding route
      .then(deleteConfirmation => response.json(deleteConfirmation))
      .catch(err => res.json(err))
}

module.exports = {
  registerNewUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getOneUser,updateUser,deleteUser
};
