"use client"
import { motion } from "framer-motion"
import { FlipWords } from "@/components/ui/flip-words"
import { ActivityCard } from "@/components/activity-card"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function Page() {
  const words = ["sharing", "serving", "contributing", "supporting"]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full font-[family-name:var(--font-geist-sans)] !m-0 relative">
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="w-full relative">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1706806595136-5afefb45da1a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Background image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 px-6 py-16 md:py-24 flex flex-col items-center min-h-screen justify-center">
          <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold text-white lg:text-7xl">
            {"Do not keep you to yourself and start".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}

            <motion.span
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.7,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              <FlipWords words={words} className="text-sky-200" />
            </motion.span>

            {"back.".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.8 + index * 0.1,
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="mx-auto max-w-xl py-4 text-center font-normal text-white/90 text-sm lg:text-lg"
          >
            Because sometimes, all it takes is a shift — from me to we, from time off to time well spent. Whether you're
            here to help, connect, or grow, you're just one flipped word away from making a real impact. Explore activities
            near you and turn your day into something meaningful.
          </motion.p>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1.1,
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button className="w-60 bg-sky-600 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Explore Now
            </button>
            <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
              Contact Support
            </button>
          </motion.div>
        </div>
      </div>

      <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Featured Activities</h2>
              <Link href="/activities" className="flex items-center text-sm font-medium text-sky-600">
                View all activities
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <ActivityCard
                title="Summer Music Festival"
                image="/placeholder.svg?height=400&width=600"
                date="Aug 15-17, 2023"
                location="Central Park, New York"
                price="$89"
                category="Music"
              />
              <ActivityCard
                title="Tech Conference 2023"
                image="/placeholder.svg?height=400&width=600"
                date="Sep 5-7, 2023"
                location="Convention Center, San Francisco"
                price="$199"
                category="Technology"
              />
              <ActivityCard
                title="Food & Wine Expo"
                image="/placeholder.svg?height=400&width=600"
                date="Jul 22-23, 2023"
                location="Grand Hall, Chicago"
                price="$45"
                category="Food"
              />
              <ActivityCard
                title="Art Exhibition"
                image="/placeholder.svg?height=400&width=600"
                date="Aug 10-20, 2023"
                location="Modern Gallery, Los Angeles"
                price="$25"
                category="Art"
              />
            </div>
          </div>
        </section>
    </div>
  )
}
