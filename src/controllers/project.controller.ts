import { Request, Response } from "express";
import Project from "../models/project.model";

export const store = async (req: Request, res: Response) => {
  try {
    // const data = await Project.create({ ...req.body });
    const userId = (req as any).user.id;

    const { title, description, dueDate, team } = req.body;
    const data = await Project.create({
      title,
      description,
      dueDate,
      createdBy: userId,
      team,
    });
    res.status(201).json({ message: "Project created successfully", data });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const data = await Project.find()
      .populate("createdBy", "-password")
      .populate("team", "-password");
    res.status(200).json({ message: "Get projects successfully", data });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const data = await Project.findById(req.params.id).populate(
      "createdBy",
      "-password",
    );
    res.status(200).json({ message: "Get project successfully", data });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Update project successfully", data });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const data = await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Delete project successfully", data });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
