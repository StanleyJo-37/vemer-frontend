"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

function page() {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/1`}>
      <Button >to an event's detail</Button>
    </Link>
  )
}

export default page