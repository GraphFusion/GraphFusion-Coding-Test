"use client"

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useGraphStore } from '@/lib/store/graph'

interface Node {
  id: string;
  name: string;
}

export function RelationshipForm() {
  const [error, setError] = useState('')
  const [nodes, setNodes] = useState<Node[]>([])
  const [newRelationship, setNewRelationship] = useState({
    from_node: '',
    to_node: '',
    relationship: ''
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const addRelationship = useGraphStore(state => state.addRelationship)
  const nodeCount = useGraphStore(state => state.nodes.length)

  const fetchNodes = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch_nodes`);
      const data = await response.json();
      setNodes(data);
    } catch (err) {
      setError('Failed to fetch nodes');
    }
  }, []);

  useEffect(() => {
    fetchNodes();
  }, [fetchNodes, nodeCount]);

  useEffect(() => {
    setIsFormValid(
      newRelationship.from_node !== '' &&
      newRelationship.to_node !== '' &&
      newRelationship.relationship !== ''
    );
  }, [newRelationship]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) {
      setError('Please select both nodes and a relationship type');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/relationships`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRelationship)
      })
      const data = await response.json()
      addRelationship(data)
      setNewRelationship({ from_node: '', to_node: '', relationship: '' })
      setError('')
      fetchNodes();
    } catch (err) {
      setError('Failed to add relationship')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Relationship</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fromNode">From Node</Label>
            <Select
              value={newRelationship.from_node}
              onValueChange={(value: string) => setNewRelationship(prev => ({...prev, from_node: value}))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select source node" />
              </SelectTrigger>
              <SelectContent>
                {nodes.map((node) => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="toNode">To Node</Label>
            <Select
              value={newRelationship.to_node}
              onValueChange={(value: string) => setNewRelationship(prev => ({...prev, to_node: value}))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select target node" />
              </SelectTrigger>
              <SelectContent>
                {nodes.map((node) => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="relationshipType">Relationship Type</Label>
            <Select
              value={newRelationship.relationship}
              onValueChange={(value: string) => setNewRelationship(prev => ({...prev, relationship: value}))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="founder">Founder</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="manages">Manages</SelectItem>
                <SelectItem value="uses">Uses</SelectItem>
                <SelectItem value="created">Created</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" variant="secondary" className="w-full" disabled={!isFormValid}>
            Add Relationship
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
