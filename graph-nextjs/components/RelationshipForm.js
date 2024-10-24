import { useState } from 'react';
import { addRelationship } from '../utils/api';

const RelationshipForm = ({ nodes, onRelationshipAdded }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRelationship = { from, to, type };
    await addRelationship(newRelationship);
    onRelationshipAdded(); // Refresh the graph after relationship is added
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='text-3xl font-bold mb-6 text-black'>Add Relationship</h3>
      <div className="grid grid-cols-2 gap-4 mb-2">
      <select 
        value={from} 
        onChange={(e) => setFrom(e.target.value)} 
        required 
        className="w-full h-10 rounded-md border border-gray-300 bg-white pl-3 pr-10 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm"
        >
        <option value="">Select From Node</option>
        {nodes.map((node) => (
            <option key={node._id} value={node._id}>{node.name}</option>
        ))}
        </select>

        <select 
        value={to} 
        onChange={(e) => setTo(e.target.value)} 
        required 
        className="w-full h-10 rounded-md border border-gray-300 bg-white pl-3 pr-10 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm"
        >
        <option value="">Select To Node</option>
        {nodes.map((node) => (
            <option key={node._id} value={node._id}>{node.name}</option>
        ))}
        </select>

      </div>
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Relationship Type"
        required
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
      />
      <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">Add Relationship</button>
    </form>
  );
};

export default RelationshipForm;
