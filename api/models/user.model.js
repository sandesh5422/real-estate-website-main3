import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
    type : String,
    required : true,
    unique : true,
},
    email: {
    type: String,
    required: true,
    unique: true,
  },
    password:{
    type : String,
    required : true,
},
    avtar:{
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRBu9nYd722gKRVUMrE8FHpc6eALfJNEP9cna7_4XCyg&s"
    },

},
{timestamps:true}
);

const User = mongoose.model('User', userSchema);
export default User;