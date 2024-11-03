import mongoose from 'mongoose';
import Relationship from '../models/Relationship.js';
import Node from '../models/Nodes.js';

// Get Relationship by ID
export const getRelationshipById = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid (id)) {
    return res.status (400).json ({message: 'Invalid Relationship ID'});
  }

  try {
    const relationship = await Relationship.findById (id)
      .populate ('from')
      .populate ('to');

    if (!relationship) {
      return res.status (404).json ({message: 'Relationship not found'});
    }

    return res.status (200).json (relationship);
  } catch (error) {
    return res.status (500).json ({message: 'Internal server error'});
  }
};

// View All Relationships
export const viewAllRelationships = async (req, res) => {
  try {
    const relationships = await Relationship.find ()
      .populate ('from')
      .populate ('to');

    return res.status (200).json (relationships);
  } catch (error) {
    return res.status (500).json ({message: 'Internal server error'});
  }
};

// Create Relationship
export const createRelationship = async (req, res) => {
  const {from, to, relationship} = req.body;

  // Validate the request body
  if (!from || !to || !relationship) {
    return res
      .status (400)
      .json ({message: 'All fields (from, to, relationship) are required'});
  }

  try {
    // Check if both 'from' and 'to' nodes exist
    const fromNode = await Node.findById (from);
    const toNode = await Node.findById (to);

    if (!fromNode || !toNode) {
      return res
        .status (404)
        .json ({message: 'Either from or to node not found'});
    }

    // Create a new relationship
    const newRelationship = new Relationship ({
      from,
      to,
      relationship,
    });

    // Save the relationship to the database
    const savedRelationship = await newRelationship.save ();

    // Respond with the created relationship
    return res.status (201).json (savedRelationship);
  } catch (error) {
    // Handle errors
    console.log (error.message);
    return res.status (500).json ({message: 'Internal server error', error});
  }
};
