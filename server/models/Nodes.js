import mongoose from 'mongoose';

const NodeSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    timestamps: true,
  }
);

const Node = mongoose.model ('Node', NodeSchema);
export default Node;
