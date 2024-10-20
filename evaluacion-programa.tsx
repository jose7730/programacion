"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type AspectEvaluation = {
  name: string;
  score: number;
  notes: string;
}

export default function Component() {
  const [aspects, setAspects] = useState<AspectEvaluation[]>([
    { name: "Planificación", score: 5, notes: "" },
    { name: "Infraestructura", score: 5, notes: "" },
    { name: "Programas Culturales", score: 5, notes: "" },
    { name: "Actividades Recreativas", score: 5, notes: "" },
    { name: "Educación y Capacitación", score: 5, notes: "" },
    { name: "Participación Comunitaria", score: 5, notes: "" },
    { name: "Impacto General", score: 5, notes: "" },
  ])

  const handleScoreChange = (index: number, newScore: number) => {
    const newAspects = [...aspects]
    newAspects[index].score = newScore
    setAspects(newAspects)
  }

  const handleNotesChange = (index: number, newNotes: string) => {
    const newAspects = [...aspects]
    newAspects[index].notes = newNotes
    setAspects(newAspects)
  }

  const calculateOverallScore = () => {
    const totalScore = aspects.reduce((sum, aspect) => sum + aspect.score, 0)
    return (totalScore / (aspects.length * 10) * 100).toFixed(2)
  }

  const handleSave = () => {
    console.log("Evaluación guardada:", aspects)
    // Aquí puedes implementar la lógica para guardar la evaluación
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Evaluación del Programa de Cultura y Recreación</CardTitle>
        <CardDescription>Evalúa cada aspecto del programa y añade notas para la reflexión</CardDescription>
      </CardHeader>
      <CardContent>
        {aspects.map((aspect, index) => (
          <div key={aspect.name} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{aspect.name}</h3>
            <div className="flex items-center mb-2">
              <Slider
                value={[aspect.score]}
                onValueChange={(value) => handleScoreChange(index, value[0])}
                max={10}
                step={1}
                className="flex-grow mr-4"
              />
              <span className="text-lg font-bold">{aspect.score}/10</span>
            </div>
            <Textarea
              placeholder={`Notas sobre ${aspect.name.toLowerCase()}...`}
              value={aspect.notes}
              onChange={(e) => handleNotesChange(index, e.target.value)}
              className="w-full"
            />
          </div>
        ))}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Puntuación General: {calculateOverallScore()}%</h3>
          <Button onClick={handleSave} className="w-full">Guardar Evaluación</Button>
        </div>
      </CardContent>
    </Card>
  )
}