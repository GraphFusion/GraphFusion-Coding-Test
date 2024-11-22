import mongoose from "mongoose";
import Node from "../models/Nodes.js";

// Create Node
export const createNode = async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newNode = await Node.create({ name, type });
    newNode.save();

    return res
      .status(201)
      .json({ message: "Node created successfully", newNode });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Node by ID
export const getNodeById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Node ID" });
  }

  try {
    const node = await Node.findById(id);

    if (!node) {
      return res.status(404).json({ message: "Node not found" });
    }

    return res.status(200).json(node);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// View All Nodes
export const viewAllNodes = async (req, res) => {
  try {
    const nodes = await Node.find();

    return res.status(200).json(nodes);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
