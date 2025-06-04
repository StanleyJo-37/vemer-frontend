"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload, User, Calendar, Clock, MapPin, Users } from "lucide-react"

export function CreateActivityForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    benefits: "",
    category: "",
    location: "",
    date: "",
    time: "",
    price: "",
    isFree: true,
    maxParticipants: "",
    images: [] as File[],
    thumbnailIndex: 0,
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
      benefits: "",
      category: "",
      location: "",
      date: "",
      time: "",
      price: "",
      isFree: true,
      maxParticipants: "",
      images: [],
      thumbnailIndex: 0,
    })

    setIsSubmitting(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData({ ...formData, images: [...formData.images, ...files] })
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      images: newImages,
      thumbnailIndex: formData.thumbnailIndex >= newImages.length ? 0 : formData.thumbnailIndex,
    })
  }

  const setThumbnail = (index: number) => {
    setFormData({ ...formData, thumbnailIndex: index })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title Section */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">Title</h2>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter event's title"
              className="text-lg border-gray-200 focus:border-sky-400 focus:ring-sky-400"
              required
            />
          </div>

          {/* Upload Photos Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Upload Photos of the event</h2>

            {/* File List */}
            <div className="space-y-2">
              {formData.images.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sky-100 rounded flex items-center justify-center">
                      <Upload className="h-4 w-4 text-sky-600" />
                    </div>
                    <span className="text-sm text-gray-700 truncate max-w-md">{file.name}</span>
                    {index === formData.thumbnailIndex && (
                      <Badge className="bg-green-100 text-green-800 text-xs cursor-default">Thumbnail</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {index !== formData.thumbnailIndex && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setThumbnail(index)}
                        className="text-xs"
                      >
                        Set as thumbnail
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Button */}
            <div>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("images")?.click()}
                className="w-full border-dashed border-2 border-gray-300 hover:border-sky-400 h-12"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Images
              </Button>
            </div>
          </div>

          {/* About This Event */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">About This Event</h2>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Write your event description here"
              rows={6}
              className="border-gray-200 focus:border-sky-400 focus:ring-sky-400 bg-sky-50"
              required
            />
          </div>

          {/* What Will You Get */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900">What Will You Get?</h2>
            <Textarea
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              placeholder="Write your event's benefit"
              rows={4}
              className="border-gray-200 focus:border-sky-400 focus:ring-sky-400 bg-sky-50"
            />
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Thumbnail Preview */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thumbnail</h3>
              <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                {formData.images.length > 0 ? (
                  <img
                    src={URL.createObjectURL(formData.images[formData.thumbnailIndex]) || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Plus className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Upload images to see thumbnail</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card className="border-gray-200">
            <CardContent className="p-6 space-y-4">
              {/* Category */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <Label className="text-sm font-medium">Category</Label>
                </div>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="border-gray-200">
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

              {/* Date */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <Label className="text-sm font-medium">Date</Label>
                </div>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="border-gray-200"
                  required
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <Label className="text-sm font-medium">Time</Label>
                </div>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="border-gray-200"
                  required
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <Label className="text-sm font-medium">Location</Label>
                </div>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                  className="border-gray-200"
                  required
                />
              </div>

              {/* Max Participants */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <Label className="text-sm font-medium">Max Participants</Label>
                </div>
                <Input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                  placeholder="Enter max participants"
                  min="1"
                  className="border-gray-200"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💰</span>
                  <Label className="text-sm font-medium">Price</Label>
                </div>
                <Input
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
                  placeholder="0.00 (Free)"
                  min="0"
                  step="0.01"
                  className="border-gray-200"
                />
                <p className="text-xs text-gray-500">
                  {formData.isFree ? "This event is free" : `This event costs $${formData.price}`}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Organizer Info */}
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">John Publisher</p>
                  <p className="text-sm text-gray-600">Event Organizer</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-red-100 text-red-800 cursor-default pointer-events-none transition-none hover:animate-none">Add Category</Badge>
                <Badge className="bg-green-100 text-green-800 cursor-default pointer-events-none transition-none hover:animate-none">Approved ✓</Badge>
                <Badge className="bg-yellow-100 text-yellow-800 cursor-default pointer-events-none transition-none hover:animate-none">Technology ⚡</Badge>
                <Badge className="bg-purple-100 text-purple-800 cursor-default pointer-events-none transition-none hover:animate-none">Education 📚</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Create Button */}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  )
}
