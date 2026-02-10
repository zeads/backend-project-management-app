import { Request, Response } from "express";
import Task from "../models/task.model";

export const store = async (req: Request, res: Response) => {
  try {
    const { title, description, project, assignedTo, deadline, createdBy } =
      req.body;
    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      deadline,
      createdBy,
    });
    res.status(201).json({ message: "Task created successfully", data: task });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find()
      .populate("createdBy", "-password")
      .populate("assignedTo", "-password");
    res.status(200).json({ message: "Get tasks successfully", data: tasks });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("createdBy", "-password")
      .populate("assignedTo", "-password");
    res.status(200).json({ message: "Get task successfully", data: task });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// ------------------
export const showByProject = async (req: Request, res: Response) => {
  try {
    const task = await Task.find({ project: req.params.id })
      .populate("createdBy", "-password")
      .populate("assignedTo", "-password");
    res.status(200).json({ message: "Get task successfully", data: task });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
// ------------------

export const update = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Update task successfully", data: task });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Delete task successfully", data: task });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
