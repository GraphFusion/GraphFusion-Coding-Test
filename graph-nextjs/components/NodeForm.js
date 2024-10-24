import { useState } from 'react';
import { addNode } from '../utils/api';

const NodeForm = ({ onNodeAdded }) => {
  const [name, setName] = useState('');
  const [properties, setProperties] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNode = { name, properties };
    await addNode(newNode);
    onNodeAdded(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='text-3xl font-bold mb-6 text-black'>Add Node</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Node Name"
        required
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-2" type="submit">Add Node</button>
    </form>
  );
};

export default NodeForm;
