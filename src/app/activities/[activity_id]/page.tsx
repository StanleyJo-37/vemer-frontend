"use client"

import ActivityAPI from "@/api/ActivityAPI"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, Clock, Calendar, Building, Share2, HandHelping, Users, CalendarIcon, MapPinIcon, Users2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PillTag } from "@/components/pill-tag"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ActivityProp{

}

const activitySample = {
  id: "1",
  title: "Beach Clean-up Day",
  image: "/placeholder.svg?height=400&width=800",
  description:
    "Join us for a day of environmental action as we clean up Ancol Beach. This activity brings together volunteers from all walks of life to help preserve our beautiful coastline and protect marine life. We'll provide all necessary equipment including gloves, trash bags, and refreshments.",
  benefits: [
    "Environmental education from marine biologists",
    "Certificate of participation",
    "Free eco-friendly t-shirt",
    "Networking with like-minded individuals",
    "Refreshments and lunch provided",
  ],
  type: "Volunteer",
  format: "Onsite",
  date: "15 June 2025",
  location: "Jakarta",
  specificLocation: "Ancol Beach, North Jakarta",
}


export default function ActivityPage() {
  const { activity_id } = useParams(); 
  const [activity, setActivity] = useState<ActivityProp|undefined>(undefined);

  useEffect(() => {
    const getactivity = async() => {
      const resp = await ActivityAPI.activity_detail(Number(activity_id));
      if (resp) {
        setActivity(resp as ActivityProp);
      } else {
        console.error("Received invalid activity data:", resp);
      };
    };

    getactivity();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">{activitySample.title}</h1>
            <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image src={activitySample.image || "/placeholder.svg"} alt={activitySample.title} fill className="object-cover" priority />
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-sky-700">About This Activity</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700">{activitySample.description}</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-sky-700">What You'll Get</h2>
            <ul className="space-y-3">
              {activitySample.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-sky-100 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-sky-500"></div>
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <Button className="w-full bg-sky-500 hover:bg-sky-600 text-lg py-6">Register Now</Button>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-start">
                    <div className="bg-sky-100 p-2 rounded-md mr-3">
                      <HandHelping className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium">Activity Type</p>
                      <p className="text-sm text-gray-500">{activitySample.type}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-sky-100 p-2 rounded-md mr-3">
                      <CalendarIcon className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm text-gray-500">{activitySample.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-sky-100 p-2 rounded-md mr-3">
                      <MapPinIcon className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-gray-500">{activitySample.location}</p>
                      <p className="text-sm text-gray-700 mt-1">{activitySample.specificLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-sky-100 p-2 rounded-md mr-3">
                      <Users2Icon className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium">Organizer</p>
                      <p className="text-sm text-gray-500">Environmental Community</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    Share This Activity
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
