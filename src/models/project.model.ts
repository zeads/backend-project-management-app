import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

export interface IProject extends Document {
  name: string;
  description: string;
  deadline: Date;
  createdBy: Types.ObjectId;
  status: "pending" | "in progress" | "completed";
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Name must be unique"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    deadline: {
      type: Date,
      validate: {
        validator: function (value: any) {
          return value > Date.now();
        },
        message: "Deadline must be in the future",
      },
      required: [true, "Deadline is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, "Created by is required"],
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// export default mongoose.model("Project", projectSchema);
const projectModel = mongoose.model<IProject>("Project", projectSchema);
export default projectModel;
