"use client"

import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"

interface PendingApplicationsBadgeProps {
  count: number
}

export function PendingApplicationsBadge({ count }: PendingApplicationsBadgeProps) {
  if (count <= 0) return null

  return (
    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center gap-1">
      <AlertCircle className="h-3 w-3" />
      <span>{count} pending</span>
    </Badge>
  )
}
