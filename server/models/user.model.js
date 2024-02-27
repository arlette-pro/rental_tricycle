const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be 2 or more characters"]
    },
    lastName:{
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last name must be 2 or more characters"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        validate: [
            {
            validator: function (val) {
                //return wether the value(email) is in  the proper format or not
                return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val);
            },
            message:"Please enter a value email"
            },
            {
                validator: async  function (val) {
                    const foundUser = await mongoose.models.User.findOne({email: val})
                    return !foundUser; // if we find someone with that email, the validation should fail
                },
                message: "Someone already registered with this email"
            }

        ]
    },
    password:{ 
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Password must be 8 or more characters"]
    },
 
}, {timestamps: true});

// we will not save the confirm password in the database
UserSchema.virtual("confirmedPassword")
    .get( () => this.confirmedPassword)
    .set( value => this.confirmedPassword = value)


//validation for password matching
UserSchema.pre("validate", function(next){
    if (this.confirmedPassword !== this.password){
        this.invalidate("confirmedPassword", "The password and confirmed password must match!")
    }
    next(); // continue validating and running like normal
})    

//  hash the password before we save
UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
})

module.exports = model("User" , UserSchema);