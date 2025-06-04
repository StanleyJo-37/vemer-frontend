"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, AlertTriangle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface EditActivityDialogProps {
  activity: any
  onClose: () => void
  onUpdate: (activity: any) => void
}

export function EditActivityDialog({ activity, onClose, onUpdate }: EditActivityDialogProps) {
  const [formData, setFormData] = useState({
    ...activity,
    date: new Date(activity.date),
    price: activity.price === "Free" ? "0" : activity.price,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [criticalChanges, setCriticalChanges] = useState<string[]>([])

  // Track critical changes (location and date)
  useEffect(() => {
    const changes: string[] = []

    if (formData.location !== activity.location) {
      changes.push("location")
    }

    if (formData.date.toDateString() !== new Date(activity.date).toDateString()) {
      changes.push("date")
    }

    if (formData.time !== activity.time) {
      changes.push("time")
    }

    setCriticalChanges(changes)
  }, [formData, activity])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // If there are critical changes, notify participants
    if (criticalChanges.length > 0) {
      const changeText = criticalChanges.join(", ")
      alert(`Activity updated! Participants will be notified about changes to: ${changeText}`)
    }

    // Determine if activity is free based on price
    const priceValue = Number.parseFloat(formData.price) || 0
    const isFree = priceValue === 0

    onUpdate({
      ...formData,
      date: formData.date.toISOString().split("T")[0],
      price: isFree ? "Free" : formData.price,
      isFree: isFree,
    })

    setIsSubmitting(false)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-sky-100">
        <DialogHeader className="border-b border-sky-100 pb-4">
          <DialogTitle className="text-sky-900">Edit Activity</DialogTitle>
          <DialogDescription>
            Update your activity details. Participants will be notified of critical changes.
          </DialogDescription>
        </DialogHeader>

        {criticalChanges.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Critical changes detected</p>
              <p className="text-sm text-yellow-700 mt-1">
                Changes to {criticalChanges.join(", ")} will automatically notify all participants.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-gray-700 font-medium">
              Activity Title
            </Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="border-gray-200 focus:border-sky-400 focus:ring-sky-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-gray-700 font-medium">
              Description
            </Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="border-gray-200 focus:border-sky-400 focus:ring-sky-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category" className="text-gray-700 font-medium">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="border-gray-200 focus:border-sky-400 focus:ring-sky-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Environmental">Environmental</SelectItem>
                  <SelectItem value="Community Service">Community Service</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                  <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                  <SelectItem value="Sports & Recreation">Sports & Recreation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-location" className="text-gray-700 font-medium">
                Location
              </Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                    onSelect={(date) => date && setFormData({ ...formData, date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-time" className="text-gray-700 font-medium">
                Time
              </Label>
              <Input
                id="edit-time"
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
              <Label htmlFor="edit-price" className="text-gray-700 font-medium">
                Price (enter 0 for free)
              </Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.price === "Free" ? "0" : formData.price}
                onChange={(e) => {
                  const value = e.target.value
                  const numValue = Number.parseFloat(value) || 0
                  setFormData({
                    ...formData,
                    price: value,
                    isFree: numValue === 0,
                  })
                }}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="border-gray-200 focus:border-sky-400 focus:ring-sky-400"
              />
              <p className="text-xs text-gray-500">
                {formData.isFree ? "This activity is free" : `This activity costs $${formData.price}`}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-maxParticipants" className="text-gray-700 font-medium">
                Max Participants
              </Label>
              <Input
                id="edit-maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: Number.parseInt(e.target.value) })}
                min="1"
                className="border-gray-200 focus:border-sky-400 focus:ring-sky-400"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-sky-100">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-300">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-sky-600 hover:bg-sky-700 text-white">
              {isSubmitting ? "Updating..." : "Update Activity"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
