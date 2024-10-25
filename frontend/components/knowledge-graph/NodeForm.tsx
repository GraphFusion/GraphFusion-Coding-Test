 "use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useGraphStore } from '@/lib/store/graph'

export function NodeForm() {
  const [error, setError] = useState('')
  const [newNode, setNewNode] = useState({ name: '', type: '' })
  const [isFormValid, setIsFormValid] = useState(false)
  const addNode = useGraphStore(state => state.addNode)

  useEffect(() => {
    setIsFormValid(newNode.name.trim() !== '' && newNode.type !== '')
  }, [newNode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) {
      setError('Please fill in both name and type fields')
      return
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nodes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNode)
      })
      const data = await response.json()
      addNode(data)
      setNewNode({ name: '', type: '' })
      setError('')
    } catch (err) {
      setError('Failed to add node')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Node</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Node Name</Label>
            <Input
              id="name"
              placeholder="Enter node name"
              value={newNode.name}
              onChange={e => setNewNode({...newNode, name: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Node Type</Label>
            <Select
              value={newNode.type}
              onValueChange={value => setNewNode({...newNode, type: value})}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select node type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="person">Person</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">Add Node</Button>
        </form>
      </CardContent>
    </Card>
  )
}