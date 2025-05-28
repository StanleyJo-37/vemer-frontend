"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function CreateActivityForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: undefined as Date | undefined,
    time: "",
    price: "",
    isFree: true,
    maxParticipants: "",
    image: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Creating activity:", formData)
    alert("Activity created successfully!")

    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      date: undefined,
      time: "",
      price: "",
      isFree: true,
      maxParticipants: "",
      image: null,
    })

    setIsSubmitting(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

  return (
    <Card className="max-w-2xl mx-auto border-sky-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-100">
        <CardTitle className="text-sky-900">Create New Activity</CardTitle>
        <CardDescription>Fill in the details below to create a new community activity</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700 font-medium">
              Activity Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter activity title"
              className="border-gray-200 focus:border-sky-400 focus:ring-sky-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700 font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your activity..."
              rows={4}
              className="border-gray-200 focus:border-sky-400 focus:ring-sky-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-700 font-medium">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="border-gray-200 focus:border-sky-400 focus:ring-sky-400">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="community">Community Service</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="health">Health & Wellness</SelectItem>
                  <SelectItem value="arts">Arts & Culture</SelectItem>
                  <SelectItem value="sports">Sports & Recreation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700 font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter location"
                className="border-gray-200 focus:border-sky-400 focus:ring-sky-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-200 hover:border-sky-400",
                      !formData.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => setFormData({ ...formData, date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-gray-700 font-medium">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="border-gray-200 focus:border-sky-400 focus:ring-sky-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-gray-700 font-medium">
                Price (leave empty if free)
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => {
                  const value = e.target.value
                  setFormData({
                    ...formData,
                    price: value,
                    isFree: value === "" || value === "0",
                  })
                }}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="border-gray-200 focus:border-sky-400 focus:ring-sky-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants" className="text-gray-700 font-medium">
                Max Participants
              </Label>
              <Input
                id="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                placeholder="Enter max participants"
                min="1"
                className="border-gray-200 focus:border-sky-400 focus:ring-sky-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-700 font-medium">
              Activity Image
            </Label>
            <div className="flex items-center gap-4">
              <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image")?.click()}
                className="flex items-center gap-2 border-sky-200 text-sky-700 hover:bg-sky-50"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
              {formData.image && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>{formData.image.name}</span>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Creating Activity..." : "Create Activity"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
