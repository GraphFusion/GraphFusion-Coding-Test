import mongoose, {Schema} from 'mongoose';

const RelationshipSchema = new Schema (
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: 'Node',
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'Node',
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Relationship = mongoose.model ('Relationship', RelationshipSchema);
export default Relationship;
