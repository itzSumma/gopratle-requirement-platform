import { Request, Response } from 'express';
import { Requirement } from './requirement.model.js';
// Create Requirement
export const createRequirement = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await Requirement.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Requirement created successfully',
      data: result,
    });
  } catch (error) {
    console.error('Create requirement error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create requirement',
    });
  }
};
// Get All Requirements
export const getAllRequirements = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await Requirement.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Requirements retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.error('Get requirements error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve requirements',
    });
  }
};

export const getRequirementById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await Requirement.findById(id);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Requirement not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Requirement retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.error('Get requirement error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve requirement',
    });
  }
};