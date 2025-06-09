"use client";
import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import { ActivityCard } from "@/components/activity-card";
import Link from "next/link";
import {
  Award,
  ChevronRight,
  Clock,
  Compass,
  HandHeart,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import API from "@/api/axios";
import { useEffect } from "react";

const initializeSanctum = async () => {
  try {
    console.log("Initializing Sanctum handshake...");
    await API.RegularAPI.get('/sanctum/csrf-cookie');
    console.log("Sanctum handshake complete!");
  } catch (error) {
    console.error("Error during Sanctum handshake:", error);
  }
};

export default function Page() {
  const words = ["sharing", "serving", "contributing", "supporting"];

  useEffect(() => {
    initializeSanctum();
  }, []);

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
          <Image
            src="/images/mainhero.avif"
            alt="Background image"
            width={screen.width}
            height={screen.height}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 px-6 py-16 md:py-24 flex flex-col items-center min-h-screen justify-center">
          <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold text-white lg:text-7xl">
            {"Do not keep you to yourself and start"
              .split(" ")
              .map((word, index) => (
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
            Because sometimes, all it takes is a shift — from me to we, from
            time off to time well spent. Whether you're here to help, connect,
            or grow, you're just one flipped word away from making a real
            impact. Explore activities near you and turn your day into something
            meaningful.
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
            <Link
              href="/activities"
              className="flex items-center text-sm font-medium text-sky-600"
            >
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

      <section className="py-16 bg-sky-50 w-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 mb-4">
              Our Platform
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Gamified Activities with Real Impact
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Turn your participation into achievements, earn rewards, and make
              a difference while having fun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <Trophy className="h-10 w-10 text-sky-600" />,
                title: "Earn Points & Badges",
                description:
                  "Complete activities to earn points, unlock badges, and climb the leaderboard.",
              },
              {
                icon: <Award className="h-10 w-10 text-sky-600" />,
                title: "Level Up Your Skills",
                description:
                  "Attend workshops and training sessions to develop new abilities and talents.",
              },
              {
                icon: <HandHeart className="h-10 w-10 text-sky-600" />,
                title: "Make Real Impact",
                description:
                  "Volunteer for causes you care about and see the tangible difference you make.",
              },
              {
                icon: <Users className="h-10 w-10 text-sky-600" />,
                title: "Community Challenges",
                description:
                  "Join forces with others to complete group challenges and earn bonus rewards.",
              },
              {
                icon: <Compass className="h-10 w-10 text-sky-600" />,
                title: "Personalized Journey",
                description:
                  "Get activity recommendations based on your interests and skill development goals.",
              },
              {
                icon: <Star className="h-10 w-10 text-sky-600" />,
                title: "Redeem Rewards",
                description:
                  "Exchange your earned points for real-world rewards, discounts, and experiences.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 mb-4 w-fit">
                  Gamification
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Track Your Progress & Achievements
                </h3>
                <p className="text-gray-600 mb-6">
                  Our platform turns your participation into a rewarding
                  journey. Watch your impact grow as you complete activities,
                  earn points, and unlock new levels.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Personal dashboard to track all your activities",
                    "Achievement system with unlockable badges",
                    "Community leaderboard to showcase your impact",
                    "Progress tracking for skill development",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="bg-sky-100 rounded-full p-1 mr-3 mt-0.5">
                        <Clock className="h-4 w-4 text-sky-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-fit bg-sky-600 hover:bg-sky-700">
                  Create Your Profile
                </Button>
              </div>
              <div className="relative h-[300px] lg:h-auto">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Dashboard showing achievements and progress"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-600/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 mb-4">Questions & Answers</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to know about our platform and how it works.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How does the points system work?",
                  answer:
                    "You earn points by participating in activities on our platform. Different activities award different point values based on their duration, impact, and complexity. Workshop attendance typically earns 30-50 points, while volunteer activities can earn 50-100 points depending on the hours contributed. These points help you level up your profile and unlock new rewards and opportunities.",
                },
                {
                  question: "Can I organize my own activity or event?",
                  answer:
                    "Once you reach Level 3 on our platform, you can propose and organize your own activities. We provide tools to help you manage registrations, communicate with participants, and track impact. Your organized events will also earn you bonus points as an organizer.",
                },
                {
                  question: "What types of rewards can I redeem with my points?",
                  answer:
                    "Our rewards marketplace includes a variety of options such as gift cards from partner businesses, exclusive merchandise, free tickets to premium workshops, and even opportunities to have coffee with industry leaders. We regularly update our rewards based on community feedback and new partnerships.",
                },
                {
                  question: "How do I track my volunteer hours for school or work requirements?",
                  answer:
                    "Our platform automatically tracks all your volunteer hours. You can generate official certificates and detailed reports of your volunteer activities from your profile dashboard. These documents include the organization name, activity description, date, hours contributed, and are verified by our system.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                  <AccordionTrigger className="text-left font-medium text-gray-900 py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 max-w-lg pb-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
              <Button variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-50">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
