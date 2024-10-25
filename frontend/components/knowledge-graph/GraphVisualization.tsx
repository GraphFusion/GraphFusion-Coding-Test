"use client"

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import * as d3 from 'd3'
import { useGraphStore } from '@/lib/store/graph'

export function GraphVisualization() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { nodes, relationships, fetchGraph } = useGraphStore()

  useEffect(() => {
    fetchGraph()
  }, [fetchGraph])

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return

    const width = 800
    const height = 600

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // Ensure source and target are never undefined
    const validRelationships = relationships
      .map(r => ({
        ...r,
        source: nodes.find(n => n.id === r.from_node) as d3.SimulationNodeDatum,
        target: nodes.find(n => n.id === r.to_node) as d3.SimulationNodeDatum
      }))
      .filter(r => r.source !== undefined && r.target !== undefined)

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(validRelationships)
        .id((d: any) => d.id)
        .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))

    // Draw relationships
    const links = svg.selectAll('.link')
      .data(validRelationships)
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', '#999')
      .style('stroke-width', 1)

    // Draw nodes
    const nodeGroups = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any
      )

    nodeGroups.append('circle')
      .attr('r', 20)
      .style('fill', d => (d as any).type === 'person' ? '#69b3a2' : '#404080')

    nodeGroups.append('text')
      .text(d => (d as any).name)
      .attr('text-anchor', 'middle')
      .attr('dy', 30)
      .style('fill', '#333')

    simulation.on('tick', () => {
      links
        .attr('x1', d => (d as any).source.x)
        .attr('y1', d => (d as any).source.y)
        .attr('x2', d => (d as any).target.x)
        .attr('y2', d => (d as any).target.y)

      nodeGroups
        .attr('transform', d => `translate(${(d as any).x},${(d as any).y})`)
    })

    function dragstarted(event: d3.D3DragEvent<any, any, any>) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event: d3.D3DragEvent<any, any, any>) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event: d3.D3DragEvent<any, any, any>) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }
  }, [nodes, relationships])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Graph Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg bg-background p-4">
          <svg ref={svgRef} className="w-full h-[600px]"></svg>
        </div>
      </CardContent>
    </Card>
  )
}
