import mongoose from 'mongoose'

const UserDetails = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  status: { type: String, enum: ['active', 'inactive'], required: true }
});


export default mongoose.model("UD",UserDetails)
