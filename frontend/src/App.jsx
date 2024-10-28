import { useState, useEffect } from "react";
import Select from "react-select";

import toast, { Toaster } from "react-hot-toast";
import { PiGraphDuotone } from "react-icons/pi";
import { AiOutlineSisternode } from "react-icons/ai";
import { TbRelationOneToMany } from "react-icons/tb";
import { TbCirclesRelation } from "react-icons/tb";
import { AiOutlineNodeExpand } from "react-icons/ai";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import GraphComponent from "./components/GraphComponent";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  LineElement,
  PointElement
);

const App = () => {
  const [relationshipForm, setRelationshipForm] = useState(false);
  const [nodeForm, setNodeForm] = useState(false);

  const [viewRelations, setViewRelations] = useState(false);
  const [viewNodes, setViewNodes] = useState(false);

  const [relations, setRelations] = useState([]);
  const [nodes, setNodes] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [options, setOptions] = useState([]);

  const [fromNode, setFromNode] = useState("");
  const [toNode, setToNode] = useState("");
  const [relation, setRelation] = useState("");

  const localUrl = import.meta.env.VITE_LOCAL_URL;
  const apiURL = import.meta.env.VITE_API_URL;
  const baseUrl = localUrl || apiURL;


  const submitData = async (e) => {
    e.preventDefault();

    if (!name || !type) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/nodes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, type }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message | "Failed to create node");
        return;
      } else {
        toast.success("Node created successfully");
        return;
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to create node");
      return;
    }
  };

  const submitRelationship = async (e) => {
    e.preventDefault();

    if (!toNode || !fromNode || !relation) {
      toast.error("All fields must be provided");
      return;
    }
    if (fromNode === toNode) {
      toast.error(
        "Relationships cannot occur in the same node. Please select a different node."
      );
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/relationship`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: toNode,
          from: fromNode,
          relationship: relation,
        }),
      });
      if (!response.ok) {
        toast.error("Error creating relation");
      } else {
        toast.success("Relation created successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to create relation. PLease try again");
    }
  };

  useEffect(() => {
    const fetchNodes = async () => {
      const response = await fetch(`${baseUrl}/nodes`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        toast.error(data.message | "Error fetching nodes");
        return;
      }

      setNodes(data);
      const nodeOptions = data.map((eachData) => ({
        value: eachData._id,
        label: eachData.name,
      }));
      setOptions(nodeOptions);
    };

    const fetchRelations = async () => {
      const response = await fetch(`${baseUrl}/relationship`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        toast.error(data.message | "Error fetching nodes");
        return;
      }

      setRelations(data);
    };

    fetchRelations();
    fetchNodes();
  }, [baseUrl]);

  return (
    <div className="bg-slate-200 h-screen flex flex-col relative">
      <Toaster position="top-left" toastOptions={{ duration: 5000 }}></Toaster>
      <h1 className="text-blue-500 text-center text-xl mx-auto my-5">
        Welcome to GraphFusion
      </h1>
      <div className="grid grid-cols-6 max-sm:flex max-sm:flex-col">
        <div className="sidebar col-span-1 bg-slate-700 h-[calc(100vh-70px)] px-3 text-lg gap-y-20 text-white max-sm:h-fit">
          <div className="flex cursor-pointer gap-x-3 items-center justify-start my-6">
            <PiGraphDuotone></PiGraphDuotone>
            <p>Home</p>
          </div>
          <div
            onClick={() => setNodeForm((prev) => !prev)}
            className="flex cursor-pointer gap-x-3 items-center justify-start my-6"
          >
            <AiOutlineSisternode></AiOutlineSisternode>
            <p>Create node</p>
          </div>
          <div
            onClick={() => setRelationshipForm((prev) => !prev)}
            className="flex cursor-pointer gap-x-3 items-center justify-start my-6"
          >
            <AiOutlineNodeExpand></AiOutlineNodeExpand>
            <p>Create Relations</p>
          </div>
          <div
            onClick={() => setViewRelations((prev) => !prev)}
            className="flex cursor-pointer gap-x-3 items-center justify-start my-6"
          >
            <TbRelationOneToMany></TbRelationOneToMany>
            <p>View Relationships</p>
          </div>
          <div
            onClick={() => setViewNodes((prev) => !prev)}
            className="flex cursor-pointer gap-x-3 items-center justify-start my-6"
          >
            <TbCirclesRelation></TbCirclesRelation>
            <p>View Nodes</p>
          </div>
        </div>
        <div className="graphs col-span-5 p-20 flex flex-col justify-center align-items h-[calc(100vh-70px)] max-sm:h-fit">
          <GraphComponent></GraphComponent>
        </div>
      </div>

      {nodeForm && (
        <form
          onSubmit={submitData}
          className="absolute bg-card w-72 p-4 flex flex-col gap-y-5 shadow-md z-50 P-4 left-48 top-12 rounded-md max-sm:left-36 max-sm:top-32 max-sm:scale-75"
        >
          <h1 className="text-center text-lg font-medium">Create Node</h1>
          <div>
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name=""
              id=""
              className="p-2 px-3 w-full"
              placeholder="Input a username"
            />
          </div>
          <div>
            <label htmlFor="name">Type</label>
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              type="text"
              name=""
              id=""
              className="p-2 px-3 w-full"
              placeholder="Input a type"
            />
          </div>

          <button
            type="submit"
            className="bg-slate-700 p-2 px-6 text-white rounded-full hover:shadow-2xl mx-auto my-10"
          >
            Create Node
          </button>
        </form>
      )}

      {relationshipForm && (
        <form
          onSubmit={submitRelationship}
          className="absolute bg-card w-72 p-4 flex flex-col gap-y-5 shadow-md z-50 P-4 left-48 max-sm:left-36 max-sm:top-32 max-sm:scale-75 top-12 rounded-md"
        >
          <h1 className="text-center text-lg font-medium">Create Relationships</h1>
          <div>
            <label htmlFor="name">
              From Node <span className="font-thin">(Node A)</span>
            </label>
            <Select
              options={options}
              onChange={(selectedOption) => setFromNode(selectedOption.value)}
            ></Select>
          </div>
          <div>
            <label htmlFor="name">
              To Node <span className="font-thin">(Node B)</span>
            </label>
            <Select
              onChange={(selectedOption) => setToNode(selectedOption.value)}
              options={options}
            ></Select>
          </div>
          <div>
            <label htmlFor="relationship">Relationship</label>
            <input
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              type="text"
              name=""
              id=""
              className="p-2 px-3 w-full"
              placeholder="Input a type"
            />
          </div>

          <div>{`NodeA is a ${relation} of NodeB`}</div>

          <button
            type="submit"
            className="bg-slate-700 p-2 px-6 text-white rounded-full hover:shadow-2xl mx-auto my-5"
          >
            Create Relationship
          </button>
        </form>
      )}

      {viewNodes && (
        <div className="bg-card absolute left-56 top-20 p-3 w-72 h-96 overflow-scroll overflow-x-clip flex flex-col text-black rounded-md shadow-md justify-start items-start max-sm:left-36 max-sm:top-32 max-sm:scale-75">
          {nodes.map((eachNode) => (
            <div className="my-2" key={eachNode._id}>
              <div className="text-lg font-semibold max-sm:text-sm">{eachNode.name}</div>
              <div className="text-slate-700 text-base font-light max-sm:text-sm">
                {eachNode.type}
              </div>
            </div>
          ))}
        </div>
      )}

      {viewRelations && (
        <div className="bg-card absolute left-56 top-20 p-3 w-[500px] max-sm:left-20 max-sm:top-32 max-sm:scale-75 h-96 overflow-scroll overflow-x-clip flex flex-col text-black rounded-md shadow-md justify-start items-start">
          <div className="flex items-center justify-evenly border-b pb-1 w-full max-sm:text-sm">
            <div>From</div>
            <div>Relationship</div>
            <div>To</div>
          </div>
          {relations.map((eachRelation) => (
            <div
              className="my-2 flex justify-between w-full items-center"
              key={eachRelation._id}
            >
              <div className="text-lg font-semibold max-sm:text-sm">
                {eachRelation.from.name}({eachRelation.from.type})
              </div>
              <div className="text-lg font-semibold max-sm:text-sm">
                {eachRelation.relationship}
              </div>
              <div className="text-lg font-semibold max-sm:text-sm">
                {eachRelation.to.name}({eachRelation.to.type})
              </div>
            </div>
          ))}
        </div>
      )}

      {}
    </div>
  );
};

export default App;
