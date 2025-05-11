import type { Activity } from "@/app/activities/page"

// Generate random date within the next 6 months
function getRandomDate() {
  const today = new Date()
  const futureDate = new Date()
  futureDate.setMonth(today.getMonth() + Math.floor(Math.random() * 6))
  futureDate.setDate(Math.floor(Math.random() * 28) + 1) // Random day between 1-28
  return futureDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Generate random price
function getRandomPrice(isFree: boolean) {
  if (isFree) return "Free"
  const price = Math.floor(Math.random() * 20) * 5000 + 50000 // Random price between 50k-150k IDR
  return `Rp ${price.toLocaleString("id-ID")}`
}

// Activity categories
const categories = ["Workshop", "Volunteer", "Seminar", "Networking", "Hackathon", "Conference"]

// Indonesian cities
const locations = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Bali", "Medan", "Makassar"]

// Organizers
const organizers = [
  "Tech Community ID",
  "Social Impact Foundation",
  "University of Indonesia",
  "Startup Indonesia",
  "Creative Hub",
  "Government Initiative",
]

// Activity titles by category
const activityTitles = {
  Workshop: [
    "UI/UX Design Fundamentals",
    "Mobile App Development",
    "Data Science for Beginners",
    "Digital Marketing Strategies",
    "Creative Writing Workshop",
    "Photography Masterclass",
    "Public Speaking Essentials",
    "Financial Literacy 101",
  ],
  Volunteer: [
    "Beach Cleanup Drive",
    "Teach for Indonesia",
    "Community Garden Project",
    "Elderly Care Program",
    "Animal Shelter Support",
    "Food Distribution Initiative",
    "Disaster Relief Training",
    "Environmental Conservation",
  ],
  Seminar: [
    "Future of Technology",
    "Sustainable Development Goals",
    "Mental Health Awareness",
    "Career Development Paths",
    "Entrepreneurship Insights",
    "Climate Change Solutions",
    "Cultural Heritage Preservation",
    "Education Innovation",
  ],
  Networking: [
    "Tech Professionals Meetup",
    "Creative Industries Mixer",
    "Startup Founders Gathering",
    "Women in Leadership Network",
    "Young Professionals Night",
    "Industry Experts Roundtable",
    "Cross-Cultural Exchange",
    "Alumni Networking Event",
  ],
  Hackathon: [
    "Social Impact Hackathon",
    "FinTech Innovation Challenge",
    "Healthcare Solutions Hackathon",
    "Smart City Development",
    "Education Technology Hackathon",
    "Sustainable Energy Challenge",
    "AI for Good Competition",
    "Open Data Hackathon",
  ],
  Conference: [
    "Digital Transformation Summit",
    "Sustainable Business Conference",
    "Tech in Asia Conference",
    "Creative Economy Forum",
    "Future of Work Summit",
    "Healthcare Innovation Conference",
    "Education Technology Expo",
    "Social Entrepreneurship Summit",
  ],
}

export const mockActivities: Activity[] = Array.from({ length: 50 }, (_, i) => {
  const category = categories[Math.floor(Math.random() * categories.length)] as keyof typeof activityTitles
  const titles = activityTitles[category]
  const title = titles[Math.floor(Math.random() * titles.length)]
  const location = locations[Math.floor(Math.random() * locations.length)]
  const organizer = organizers[Math.floor(Math.random() * organizers.length)]
  const isFree = Math.random() > 0.6 // 40% chance of being free
  const price = getRandomPrice(isFree)
  const date = getRandomDate()

  return {
    id: `activity-${i + 1}`,
    title,
    image: `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(category)}`,
    date,
    location,
    price,
    category,
    organizer,
    isFree,
  }
})
