import KnowledgeGraph from '@/components/knowledge-graph/KnowledgeGraph'

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Knowledge Graph Visualizer</h1>
      <KnowledgeGraph />
    </main>
  )
}