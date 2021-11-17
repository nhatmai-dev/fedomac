import mongoose from 'mongoose'

export default {
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  // createdBy: {
  //   type: String,
  //   validate: {
  //     validator: (value) =>
  //       /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/.test(
  //         value
  //       ),
  //     message: (props) => `${props.value} is not a valid phone number!`,
  //   },
  //   required: true,
  // },
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: () => false,
  },
}
