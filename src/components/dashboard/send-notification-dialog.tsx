"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Send, Users } from "lucide-react"

interface SendNotificationDialogProps {
  activity: any
  onClose: () => void
}

export function SendNotificationDialog({ activity, onClose }: SendNotificationDialogProps) {
  const [notificationData, setNotificationData] = useState({
    subject: "",
    message: "",
    type: "general" as "general" | "reminder" | "update" | "urgent",
  })
  const [isSending, setIsSending] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const messageTemplates = {
    general: `Hello participants of "${activity.title}",

[Your message here]

Event Details:
📅 Date: ${new Date(activity.date).toLocaleDateString()} at ${activity.time}
📍 Location: ${activity.location}

Thank you for your participation!

Best regards,
The Event Team`,

    reminder: `Hi there! 👋

Just a friendly reminder about "${activity.title}" happening on ${new Date(activity.date).toLocaleDateString()} at ${activity.time}.

Location: ${activity.location}

We're excited to see you there! If you have any questions, feel free to reach out.

Best regards,
The Event Team`,

    update: `Hello! 📢

We have an important update regarding "${activity.title}":

[Please add your update details here]

Event Details:
📅 Date: ${new Date(activity.date).toLocaleDateString()} at ${activity.time}
📍 Location: ${activity.location}

Thank you for your understanding!

Best regards,
The Event Team`,

    urgent: `🚨 URGENT UPDATE - ${activity.title}

[Please add urgent information here]

If you have any immediate questions or concerns, please contact us right away.

Event Details:
📅 Date: ${new Date(activity.date).toLocaleDateString()} at ${activity.time}
📍 Location: ${activity.location}

Thank you,
The Event Team`,
  }

  const handleTemplateSelect = (type: string) => {
    if (type in messageTemplates) {
      setSelectedTemplate(type)
      setNotificationData({
        ...notificationData,
        type: type as any,
        subject: `${type.charAt(0).toUpperCase() + type.slice(1)}: ${activity.title}`,
        message: messageTemplates[type as keyof typeof messageTemplates],
      })
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert(`Notification sent to ${activity.currentParticipants} participants!`)

    setIsSending(false)
    onClose()
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reminder":
        return "bg-sky-100 text-sky-800 border-sky-200"
      case "update":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-sky-100">
        <DialogHeader className="border-b border-sky-100 pb-4">
          <DialogTitle className="flex items-center gap-2 text-sky-900">
            <Send className="h-5 w-5" />
            Send Notification
          </DialogTitle>
          <DialogDescription>Send a custom message to all participants of "{activity.title}"</DialogDescription>
        </DialogHeader>

        <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-sky-800">
            <Users className="h-4 w-4" />
            <span>This message will be sent to {activity.currentParticipants} participants</span>
          </div>
        </div>

        <form onSubmit={handleSend} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Message Type & Template</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                type="button"
                variant={selectedTemplate === "general" ? "default" : "outline"}
                size="sm"
                onClick={() => handleTemplateSelect("general")}
                className={
                  selectedTemplate === "general"
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "border-sky-200 hover:bg-sky-50"
                }
              >
                <Badge className={`${getTypeColor("general")} pointer-events-none`}>General</Badge>
              </Button>
              <Button
                type="button"
                variant={selectedTemplate === "reminder" ? "default" : "outline"}
                size="sm"
                onClick={() => handleTemplateSelect("reminder")}
                className={
                  selectedTemplate === "reminder"
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "border-sky-200 hover:bg-sky-50"
                }
              >
                <Badge className={`${getTypeColor("reminder")} pointer-events-none`}>Reminder</Badge>
              </Button>
              <Button
                type="button"
                variant={selectedTemplate === "update" ? "default" : "outline"}
                size="sm"
                onClick={() => handleTemplateSelect("update")}
                className={
                  selectedTemplate === "update"
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "border-sky-200 hover:bg-sky-50"
                }
              >
                <Badge className={`${getTypeColor("update")} pointer-events-none`}>Update</Badge>
              </Button>
              <Button
                type="button"
                variant={selectedTemplate === "urgent" ? "default" : "outline"}
                size="sm"
                onClick={() => handleTemplateSelect("urgent")}
                className={
                  selectedTemplate === "urgent"
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "border-sky-200 hover:bg-sky-50"
                }
              >
                <Badge className={`${getTypeColor("urgent")} pointer-events-none`}>Urgent</Badge>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-gray-700 font-medium">
              Subject
            </Label>
            <Input
              id="subject"
              value={notificationData.subject}
              onChange={(e) => setNotificationData({ ...notificationData, subject: e.target.value })}
              placeholder="Enter notification subject"
              className="border-gray-200 focus:border-sky-400 focus:ring-sky-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-700 font-medium">
              Message
            </Label>
            <Textarea
              id="message"
              value={notificationData.message}
              onChange={(e) => setNotificationData({ ...notificationData, message: e.target.value })}
              placeholder="Enter your message to participants..."
              rows={8}
              className="border-gray-200 focus:border-sky-400 focus:ring-sky-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-gray-700 font-medium">
              Priority Level
            </Label>
            <Select
              value={notificationData.type}
              onValueChange={(value: any) => setNotificationData({ ...notificationData, type: value })}
            >
              <SelectTrigger className="border-gray-200 focus:border-sky-400 focus:ring-sky-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="reminder">Reminder</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-sky-100">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-300">
              Cancel
            </Button>
            <Button type="submit" disabled={isSending} className="bg-sky-600 hover:bg-sky-700 text-white">
              {isSending ? "Sending..." : `Send to ${activity.currentParticipants} Participants`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
