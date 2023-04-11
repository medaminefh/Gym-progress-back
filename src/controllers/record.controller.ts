import { Request, Response } from "express";
import recordModel from "../models/record.model";

export const createRecord = async (req: Request, res: Response) => {
  try {
    const { title, description, maxWeight, photos } = req.body;

    const newRecord = new recordModel({
      title,
      description,
      maxWeight,
      photos,
    });

    const savedRecord = await newRecord.save();

    return res.status(200).json(savedRecord);
  } catch (error) {
    console.log("Some error with creating a record!", error);
  }
};
