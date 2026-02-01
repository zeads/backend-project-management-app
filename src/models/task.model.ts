import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

export interface ITask extends Document {
  title: string;
  description: string;
  project: Types.ObjectId;
  assignedTo: Types.ObjectId;
  deadline: Date;
  status: "todo" | "in progress" | "done";
  createdBy: Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    project: {
      type: Schema.Types.ObjectId,
      required: [true, "Project is required"],
      ref: "Project",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      required: [true, "Assigned to is required"],
      ref: "User",
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
    status: {
      type: String,
      enum: ["todo", "in progress", "done"],
      default: "todo",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, "Created by is required"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// export default mongoose.model("Task", taskSchema);
const taskModel = mongoose.model<ITask>("Task", taskSchema);
export default taskModel;
