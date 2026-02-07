import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

export interface IProject extends Document {
  title: string;
  description: string;
  dueDate: Date;
  createdBy: Types.ObjectId;
  status: "On Hold" | "Active" | "Completed";
  progress: number;
  team: Types.ObjectId[];
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Name must be unique"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value: any) {
          return value > Date.now();
        },
        message: "dueDate must be in the future",
      },
      required: [true, "dueDate is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, "Created by is required"],
      ref: "User",
    },
    status: {
      type: String,
      enum: ["On Hold", "Active", "Completed"],
      default: "Active",
    },
    progress: {
      type: Number,
      default: 0,
    },
    team: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

// export default mongoose.model("Project", projectSchema);
const projectModel = mongoose.model<IProject>("Project", projectSchema);
export default projectModel;
