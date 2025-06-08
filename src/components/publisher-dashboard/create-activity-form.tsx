"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { X, Plus, Upload, User, Calendar, Clock, MapPin, Users, Star, Award, MessageSquare } from "lucide-react"
import PublisherDashboardAPI from "@/api/PublisherDashboardAPI"

interface ActivityFormProp{
  title: string,
  description: string,
  category: string,
  location: string,
  date: string,
  endDate: string,
  points: number,
  image: File | null,
  thumbnailIndex: number,

  // Badge creation fields
  badge_exist: boolean,
  badgeName: string,
  badgeDescription: string,
  badgeIcon: File|null,

  // popup for to notify user before approving
  popup_exist: boolean
  registerPopupTitle: string,
  registerPopupMessage: string,

}

const baseForm:ActivityFormProp = {
  title: "",
  description: "",
  category: "",
  location: "",
  date: "",
  endDate: "",
  points: 0,
  image: null,
  thumbnailIndex: 0,
  // Badge creation fields
  badgeName: "",
  badgeDescription: "",
  badgeIcon: null as File | null,
  // Simplified join popup fields
  registerPopupTitle: "",
  registerPopupMessage: "",
  badge_exist: false,
  popup_exist:false,
}

export function CreateActivityForm() {
  const [formData, setFormData] = useState<ActivityFormProp>(baseForm)

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(false);

    console.log({
      title: formData.title,
      image: formData.image,
      activity_description : formData.description,
      category :formData.category,
      start_date : formData.date,
      end_date: formData.endDate,
      location : formData.location,
      point_reward : formData.points,
      popup_title: formData.title,
      popup_description: formData.registerPopupMessage,
      name: formData.badgeName,
      icon: formData.badgeIcon,
      badge_description: formData.badgeDescription,
      badge_exist: formData.badge_exist,
      popup_exist: formData.popup_exist,
    });

    console.log(await PublisherDashboardAPI.createActivityFull({
      title: formData.title,
      image: formData.image,
      activity_description : formData.description,
      category :formData.category,
      start_date : formData.date,
      end_date: formData.endDate,
      location : formData.location,
      point_reward : formData.points,
      popup_title: formData.title,
      popup_description: formData.registerPopupMessage,
      name: formData.badgeName,
      icon: formData.badgeIcon,
      badge_description: formData.badgeDescription,
      badge_exist: formData.badge_exist,
      popup_exist: formData.popup_exist,
    }));

    console.log("Creating activity:", formData)
    alert("Activity created successfully!")

    // Reset form
    setFormData(baseForm)

    setIsSubmitting(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData({ ...formData, image: file })
  }

  const handleBadgeIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData({ ...formData, badgeIcon: file })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Title Section */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Title</h2>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter event's title"
              className="text-base sm:text-lg border-gray-200 focus:border-sky-500 focus:ring-sky-500"
              required
            />
          </div>

          {/* Upload Photos Section */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Upload Photo of the event</h2>

            {/* File Preview */}
            <div className="space-y-2">
              {formData.image ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 bg-sky-100 rounded flex items-center justify-center flex-shrink-0">
                  <Upload className="h-4 w-4 text-sky-600" />
                </div>
                <span className="text-sm text-gray-700 truncate">{formData.image.name}</span>
                <Badge className="bg-green-100 text-green-800 text-xs cursor-default">Thumbnail</Badge>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({ ...formData, image: null })}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
                </div>
              </div>
              ) : null}
            </div>

            {/* Upload Button */}
            <div>
              <Input
                id="image"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image")?.click()}
                className="w-full border-dashed border-2 border-gray-300 hover:border-sky-500 h-12"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Image
              </Button>
            </div>
          </div>

          {/* About This Event */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">About This Event</h2>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Write your event description here"
              rows={6}
              className="border-gray-200 focus:border-sky-500 focus:ring-sky-500 bg-sky-50"
              required
            />
          </div>

          {/* Simplified Join Popup Configuration */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Join Event Message</h2>
              <div className="flex items-center space-x-2">
                <Switch
                  id="enable-join-popup"
                  checked={formData.popup_exist}
                  onCheckedChange={(checked) => setFormData({ ...formData, popup_exist: checked })}
                />
                <Label htmlFor="enable-join-popup" className="text-sm font-medium">
                  Show message when users join
                </Label>
              </div>
            </div>

            {formData.popup_exist && (
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-900 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Join Event Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Message Title</Label>
                    <Input
                      value={formData.registerPopupTitle}
                      onChange={(e) => setFormData({ ...formData, registerPopupTitle: e.target.value })}
                      placeholder="e.g., Welcome to our event!"
                      className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Message Description</Label>
                    <Textarea
                      value={formData.registerPopupMessage}
                      onChange={(e) => setFormData({ ...formData, registerPopupMessage: e.target.value })}
                      placeholder="Thank you for joining! Please fill out our form at https://forms.google.com/... for additional details."
                      rows={4}
                      className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                    <p className="text-xs text-gray-600">
                      Tip: Include any links (like Google Forms) in your message - they will be clickable for users.
                    </p>
                  </div>

                  {/* Preview */}
                  {(formData.registerPopupTitle || formData.registerPopupMessage) && (
                    <div className="pt-4 border-t border-orange-200">
                      <Label className="text-sm font-medium mb-2 block">Preview</Label>
                      <div className="p-4 bg-white rounded-lg border border-orange-200">
                        <h3 className="font-semibold text-gray-900 mb-2">{formData.registerPopupTitle || "Join Event"}</h3>
                        <p className="text-sm text-gray-600">
                          {formData.registerPopupMessage || "Thank you for your interest in joining this event!"}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Badge Creation Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create Event Badge</h2>
              <div className="flex items-center space-x-2">
                <Switch
                  id="create-badge"
                  checked={formData.badge_exist}
                  onCheckedChange={(checked) => setFormData({ ...formData, badge_exist: checked })}
                />
                <Label htmlFor="create-badge" className="text-sm font-medium">
                  Create custom badge
                </Label>
              </div>
            </div>

            {formData.badge_exist && (
              <Card className="border-sky-200 bg-sky-50">
                <CardHeader>
                  <CardTitle className="text-lg text-sky-900 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Badge Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Badge Name</Label>
                      <Input
                        value={formData.badgeName}
                        onChange={(e) => setFormData({ ...formData, badgeName: e.target.value })}
                        placeholder="e.g., Green Warrior"
                        className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>

                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Badge Description</Label>
                    <Textarea
                      value={formData.badgeDescription}
                      onChange={(e) => setFormData({ ...formData, badgeDescription: e.target.value })}
                      placeholder="Describe what this badge represents"
                      rows={2}
                      className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Badge Icon</Label>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <Input
                        id="badge-icon"
                        type="file"
                        accept="image/*"
                        onChange={handleBadgeIconUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("badge-icon")?.click()}
                        className="border-dashed border-2 border-gray-300 hover:border-sky-500"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Icon
                      </Button>
                      {formData.badgeIcon && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{formData.badgeIcon.name}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setFormData({ ...formData, badgeIcon: null })}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Badge Preview */}
                  {formData.badgeName && (
                    <div className="pt-4 border-t border-sky-200">
                      <Label className="text-sm font-medium mb-2 block">Preview</Label>
                      <div className="inline-flex items-center gap-2 p-3 bg-white rounded-lg border border-sky-200">
                        <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                          {formData.badgeIcon ? (
                            <img
                              src={URL.createObjectURL(formData.badgeIcon) || "/placeholder.svg"}
                              alt="Badge icon"
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          ) : (
                            <Award className="h-4 w-4 text-sky-600" />
                          )}
                        </div>

                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Thumbnail Preview */}
          <Card className="border-gray-200">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thumbnail</h3>
              <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image) || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Plus className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Upload an image to see thumbnail</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card className="border-gray-200">
            <CardContent className="p-4 sm:p-6 space-y-4">
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
                  <SelectTrigger className="border-gray-200 focus:border-sky-500 focus:ring-sky-500">
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
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <Label className="text-sm font-medium">Start Date & Time</Label>
                  </div>
                  <Input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value, // store as ISO string
                      })
                    }
                    className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                    required
                  />
                </div>

                {/* End Date & Time (Required, Non-toggleable) */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <Label className="text-sm font-medium">End Date & Time</Label>
                  </div>
                  <Input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({
                    ...formData,
                    endDate: e.target.value,
                    })
                  }
                  className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                  min={formData.date}
                  required
                  />
                  <p className="text-xs text-gray-500">End date must be after the start date</p>
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
                  className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                  required
                />
              </div>

              {/* Points */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Label className="text-sm font-medium">Points Reward</Label>
                </div>
                <Input
                  type="number"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
                  placeholder="Points participants will earn"
                  min="0"
                  className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                  required
                />
                <p className="text-xs text-gray-500">Points participants will earn for attending this event</p>
              </div>
            </CardContent>
          </Card>

          {/* Organizer Info */}
          <Card className="border-gray-200">
            <CardContent className="p-4 sm:p-6">
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
                <Badge className="bg-red-100 text-red-800 cursor-default">Add Category</Badge>
                <Badge className="bg-green-100 text-green-800 cursor-default">Approved ✓</Badge>
                <Badge className="bg-yellow-100 text-yellow-800 cursor-default">Technology ⚡</Badge>
                <Badge className="bg-purple-100 text-purple-800 cursor-default">Education 📚</Badge>
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
