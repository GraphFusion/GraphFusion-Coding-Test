import { GraphVisualization } from './GraphVisualization'
import { NodeForm } from './NodeForm'
import { RelationshipForm } from './RelationshipForm'

export default function KnowledgeGraph() {
  return (
    <div className="h-screen flex p-4 gap-6">
      <div className="w-1/3 flex flex-col gap-6 overflow-auto">
        <div className="flex-shrink-0">
          <NodeForm />
        </div>
        <div className="flex-shrink-0">
          <RelationshipForm />
        </div>
      </div>
      <div className="w-2/3">
        <GraphVisualization />
      </div>
    </div>
  );
}