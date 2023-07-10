import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({ 
  email: {
    type: String,
    required: [true, "Please provide the post's content"],
  },
  password: {
    type: String,
    required: [true, "Please provide the author's name"],
    maxlength: [60, "Author's Name cannot be more than 60 characters"],
  },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)