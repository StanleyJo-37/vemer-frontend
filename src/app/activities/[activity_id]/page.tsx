"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { JoinEventPopup } from "@/components/join-event-popup"
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  ArrowLeft,
  Heart,
  Share2,
  CheckCircle,
  Star,
  Award,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"

// Updated mock data with simplified join popup configurations
const mockActivities = [
  {
    id: "1",
    title: "Community Garden Cleanup",
    description:
      "Join us for a morning of beautifying our local community garden. We'll be weeding, planting new flowers, and general maintenance to keep our green space thriving. This is a great opportunity to meet neighbors, learn about gardening, and contribute to environmental sustainability in our community.",
    benefits:
      "Learn sustainable gardening practices and connect with nature. Meet like-minded community members and build lasting friendships. Contribute to local environmental health and biodiversity. Enjoy fresh air and physical activity in a beautiful setting. Receive a small potted plant to take home as a thank you gift!",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-06-15",
    location: "Central Park Community Garden",
    price: "0",
    category: "Environmental",
    organizer: "Green Earth Initiative",
    isFree: true,
    maxParticipants: 25,
    currentParticipants: 18,
    points: 150,
    badge: {
      name: "Garden Guardian",
      description: "Participated in community garden cleanup",
      rarity: "Common",
      icon: "🌱",
    },
    joinPopup: {
      title: "Welcome to our Garden Cleanup!",
      message:
        "Thank you for joining our community garden cleanup! We're excited to have you help us beautify our neighborhood. Please fill out our registration form at https://forms.google.com/garden-cleanup to help us organize the event better. Don't forget to bring your own tools if you have them!",
    },
  },
  {
    id: "2",
    title: "Beach Cleanup Drive",
    description:
      "Help us protect marine life and keep our beaches beautiful! We'll spend the morning collecting trash and debris from the shoreline. This activity includes education about ocean conservation and the impact of pollution on marine ecosystems.",
    benefits:
      "Make a direct impact on ocean health and marine conservation. Learn about marine ecosystems and environmental protection. Enjoy a morning by the beautiful coastline. Connect with environmental advocates and ocean lovers. Receive cleanup supplies and refreshments provided by our sponsors.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-06-20",
    location: "Sunset Beach",
    price: "0",
    category: "Environmental",
    organizer: "Ocean Guardians",
    isFree: true,
    maxParticipants: 50,
    currentParticipants: 32,
    points: 200,
    badge: {
      name: "Ocean Protector",
      description: "Helped protect marine life through beach cleanup",
      rarity: "Uncommon",
      icon: "🌊",
    },
    joinPopup: {
      title: "Join the Ocean Protection Mission!",
      message:
        "Welcome to our beach cleanup initiative! To ensure we have all the necessary supplies and can coordinate transportation, please complete our detailed registration at https://forms.google.com/beach-cleanup-registration. We'll also send you important updates via our WhatsApp group: https://chat.whatsapp.com/beach-cleanup-group",
    },
  },
  {
    id: "3",
    title: "Food Bank Volunteer Day",
    description:
      "Make a direct impact on food insecurity in our community by volunteering at the local food bank. Activities include sorting donations, packing food boxes, and helping with distribution. This is a meaningful way to give back and support families in need. No experience necessary - training provided.",
    benefits:
      "Help families in need and fight food insecurity in your community. Learn about local social issues and volunteer opportunities. Meet compassionate volunteers and community leaders. Gain valuable volunteer experience for resumes or applications. Receive a volunteer appreciation certificate and light refreshments.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-06-25",
    location: "Downtown Food Bank",
    price: "0",
    category: "Community Service",
    organizer: "Helping Hands Network",
    isFree: true,
    maxParticipants: 15,
    currentParticipants: 15,
    points: 180,
    badge: {
      name: "Community Helper",
      description: "Volunteered at local food bank",
      rarity: "Common",
      icon: "🤝",
    },
    joinPopup: {
      title: "Thank you for volunteering!",
      message:
        "Your willingness to help fight food insecurity in our community is truly appreciated. We're looking forward to working alongside you to make a difference in people's lives. Please arrive 15 minutes early for a brief orientation.",
    },
  },
  {
    id: "4",
    title: "Senior Center Reading Program",
    description:
      "Bring joy to elderly residents by participating in our reading program. Volunteers will read books, newspapers, or magazines to seniors, engage in conversations, and provide companionship. This intergenerational activity enriches lives on both sides and helps combat loneliness among our elderly community members.",
    benefits:
      "Share meaningful stories and create connections across generations. Learn from the wisdom and life experiences of seniors. Develop communication and empathy skills. Make a positive impact on elderly community members' wellbeing. Receive training on working with seniors and volunteer recognition.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-07-02",
    location: "Sunshine Senior Center",
    price: "0",
    category: "Community Service",
    organizer: "Intergenerational Connect",
    isFree: true,
    maxParticipants: 12,
    currentParticipants: 8,
    points: 120,
    badge: {
      name: "Wisdom Keeper",
      description: "Connected with seniors through reading program",
      rarity: "Uncommon",
      icon: "📚",
    },
    // No join popup - direct join
  },
  {
    id: "5",
    title: "Youth Coding Workshop",
    description:
      "Introduce young people to the world of programming through this hands-on coding workshop. Participants will learn basic programming concepts, create simple games, and explore career opportunities in technology. Perfect for ages 10-16, no prior experience needed. Laptops provided.",
    benefits:
      "Learn fundamental programming skills and computer science concepts. Create your own simple game to share with friends and family. Explore exciting career opportunities in the technology industry. Receive a certificate of completion and continued learning resources. Get access to our online coding community and mentorship program!",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-07-08",
    location: "Tech Innovation Hub",
    price: "25",
    category: "Education",
    organizer: "Code for Tomorrow",
    isFree: false,
    maxParticipants: 20,
    currentParticipants: 15,
    points: 300,
    badge: {
      name: "Code Explorer",
      description: "Completed youth coding workshop",
      rarity: "Rare",
      icon: "💻",
    },
    joinPopup: {
      title: "Welcome to Code for Tomorrow!",
      message:
        "We're excited to introduce you to the world of programming! Since this workshop is for youth ages 10-16, we need parent/guardian consent. Please have a parent complete our registration form at https://forms.google.com/youth-coding-consent and review our safety guidelines at https://www.codetomorrow.org/safety-guidelines",
    },
  },
  {
    id: "6",
    title: "Community Art Mural Project",
    description:
      "Be part of creating a beautiful mural that represents our diverse community! This collaborative art project welcomes artists of all skill levels to contribute to a large-scale public artwork. We'll provide all materials and guidance from professional muralists. The finished piece will be permanently displayed in the community center.",
    benefits:
      "Express your creativity and contribute to a lasting community artwork. Learn mural painting techniques from professional artists. Connect with local artists and creative community members. See your artistic contribution displayed permanently in the community center. Receive art supplies and a group photo with the finished mural.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2025-07-12",
    location: "Community Center Wall",
    price: "0",
    category: "Arts & Culture",
    organizer: "Creative Communities Collective",
    isFree: true,
    maxParticipants: 30,
    currentParticipants: 22,
    points: 250,
    badge: {
      name: "Community Artist",
      description: "Contributed to community mural project",
      rarity: "Rare",
      icon: "🎨",
    },
    joinPopup: {
      title: "Join Our Creative Community!",
      message:
        "Welcome to our community mural project! We're thrilled to have you contribute to this lasting piece of art. Check out our inspiration board at https://pinterest.com/community-mural and join our artist Discord community at https://discord.gg/community-artists for updates and to connect with fellow artists!",
    },
  },
]

// Helper function to parse benefits into sentences
const parseBenefits = (benefits: string): string[] => {
  if (!benefits) return []

  const sentences = benefits
    .split(/[.!]\s+|[\n\r]+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0)
    .map((sentence) => {
      if (!/[.!?]$/.test(sentence)) {
        return sentence + "."
      }
      return sentence
    })

  return sentences
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Common":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "Uncommon":
      return "bg-green-100 text-green-800 border-green-200"
    case "Rare":
      return "bg-sky-100 text-sky-800 border-sky-200"
    case "Epic":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "Legendary":
      return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-yellow-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function ActivityDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [activity, setActivity] = useState<any>(null)
  const [isJoined, setIsJoined] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showJoinPopup, setShowJoinPopup] = useState(false)

  useEffect(() => {
    // Get the ID from the URL using useParams
    const id = params?.activity_id as string

    console.log("URL params:", params)
    console.log("Activity ID from URL:", id)
    console.log(
      "Available activities:",
      mockActivities.map((a) => ({ id: a.id, title: a.title })),
    )

    // Find the activity by ID
    const foundActivity = mockActivities.find((a) => a.id === id)
    console.log("Found activity:", foundActivity)

    if (foundActivity) {
      setActivity(foundActivity)
    }
    setIsLoading(false)
  }, [params])

  const handleJoinActivity = () => {
    if (activity?.joinPopup) {
      setShowJoinPopup(true)
    } else {
      // Direct join without popup
      setIsJoined(true)
      alert("Successfully joined the event!")
    }
  }

  const handleJoinConfirm = () => {
    setIsJoined(true)
    setShowJoinPopup(false)
    alert("Successfully joined the event!")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: activity.title,
        text: activity.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const formatPrice = () => {
    if (!activity) return "Free"
    if (activity.isFree || activity.price === "Free" || activity.price === "0") {
      return "Free"
    }
    return `$${activity.price}`
  }

  const getPriceColor = () => {
    if (!activity) return "text-green-600"
    if (activity.isFree || activity.price === "Free" || activity.price === "0") {
      return "text-green-600"
    }
    return "text-sky-600"
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Activity Not Found</h1>
          <p className="text-gray-600 mb-2">The activity with ID "{params?.id}" doesn't exist.</p>
          <p className="text-sm text-gray-500 mb-6">Available IDs: {mockActivities.map((a) => a.id).join(", ")}</p>
          <Button onClick={() => router.push("/activities")} className="bg-sky-600 hover:bg-sky-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Activities
          </Button>
        </div>
      </div>
    )
  }

  const benefitsList = activity.benefits ? parseBenefits(activity.benefits) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 hover:bg-sky-50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={activity.image || "/placeholder.svg"}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Activity Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{activity.title}</h1>
                <Badge variant="secondary" className="mb-4 bg-sky-100 text-sky-800">
                  {activity.category}
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={handleShare} className="border-sky-200 hover:bg-sky-50">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="space-y-6">
              {/* About This Event */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Event</h2>
                <p className="text-gray-700 leading-relaxed">{activity.description}</p>
              </div>

              {/* What Will You Get */}
              {benefitsList.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">What Will You Get?</h2>
                  <ul className="space-y-2">
                    {benefitsList.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rewards Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Event Rewards</h2>
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-4">
                  <div className="space-y-3">
                    {/* Points */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Earn {activity.points} Points</p>
                        <p className="text-sm text-gray-600">Points will be awarded upon event completion</p>
                      </div>
                    </div>

                    {/* Badge */}
                    {activity.badge && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Award className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">Unlock "{activity.badge.name}" Badge</p>
                            <Badge className={`${getRarityColor(activity.badge.rarity)} text-xs cursor-default`}>
                              {activity.badge.rarity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{activity.badge.description}</p>
                        </div>
                        <div className="text-2xl">{activity.badge.icon}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer Info */}
            <Card className="mt-6 border-sky-100">
              <CardHeader>
                <CardTitle className="text-lg text-sky-900">Organized by</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-sky-100 text-sky-700">{activity.organizer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{activity.organizer}</p>
                    <p className="text-sm text-gray-600">Community Organizer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Join Card */}
          <Card className="border-sky-200">
            <CardHeader>
              <CardTitle className="text-xl text-sky-900">Join This Activity</CardTitle>
              <CardDescription>Be part of making a positive impact in your community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`text-3xl font-bold ${getPriceColor()}`}>{formatPrice()}</div>

              <Button
                className={`w-full ${isJoined ? "bg-sky-100 text-sky-700 border-sky-200" : "bg-sky-600 hover:bg-sky-700"}`}
                onClick={handleJoinActivity}
                variant={isJoined ? "outline" : "default"}
                disabled={isJoined}
              >
                {isJoined ? (
                  <>
                    <Heart className="mr-2 h-4 w-4 fill-current" />
                    Joined
                  </>
                ) : (
                  "Join Activity"
                )}
              </Button>

              <div className="text-sm text-gray-600 text-center">
                {isJoined ? "You're registered for this activity!" : "Click to register for this activity"}
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card className="border-sky-200">
            <CardHeader>
              <CardTitle className="text-sky-900">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-sky-600" />
                <div>
                  <p className="font-medium">{new Date(activity.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Date</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-sky-600" />
                <div>
                  <p className="font-medium">9:00 AM - 12:00 PM</p>
                  <p className="text-sm text-gray-600">Duration</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-sky-600" />
                <div>
                  <p className="font-medium">{activity.location}</p>
                  <p className="text-sm text-gray-600">Location</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-sky-600" />
                <div>
                  <p className="font-medium">
                    {activity.maxParticipants - activity.currentParticipants} spots available
                  </p>
                  <p className="text-sm text-gray-600">Capacity</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-sky-600" />
                <div>
                  <p className={`font-medium ${getPriceColor()}`}>{formatPrice()}</p>
                  <p className="text-sm text-gray-600">Price</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rewards Card */}
          <Card className="border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-sky-900 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Event Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-sky-100">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-semibold text-gray-900">{activity.points} Points</p>
                  <p className="text-xs text-gray-600">Awarded upon completion</p>
                </div>
              </div>

              {activity.badge && (
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-sky-100">
                  <div className="text-xl">{activity.badge.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{activity.badge.name}</p>
                    <Badge className={`${getRarityColor(activity.badge.rarity)} text-xs cursor-default mt-1`}>
                      {activity.badge.rarity}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* What to Bring */}
          <Card className="border-sky-200">
            <CardHeader>
              <CardTitle className="text-sky-900">What to Bring</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Comfortable clothing and closed-toe shoes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Water bottle and snacks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Gloves (if you have them)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Positive attitude and enthusiasm!</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Join Event Popup */}
      <JoinEventPopup
        isOpen={showJoinPopup}
        onClose={() => setShowJoinPopup(false)}
        onJoin={handleJoinConfirm}
        activity={activity}
      />
    </div>
  )
}
