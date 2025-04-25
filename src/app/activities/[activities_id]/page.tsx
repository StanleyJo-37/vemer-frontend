"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, Clock, Calendar, Building, Share2, HandHelping, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PillTag } from "@/components/pill-tag"

export default function EventPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className=" mx-auto px-8 py-6">
          <h1 className="text-4xl font-bold mb-8">Ethical AI Application: Building AI With Responsibility</h1>

          <div className="flex gap-6 ">
            {/* Image Carousel and Info */}
            <div className="flex flex-col gap-3 mb-8">
              <div className="relative w-2/3 h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                <Image src="/images/binus-university.jpg" alt="Event Image" fill className="object-cover" />
                <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              {/* Event Details */}
              <div className="bg-white px-8 rounded-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-base mb-6">
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Blandit fames himenaeos condimentum ex diam odio eget
                  conubia morbi. Semper viverra turpis non leo mauris diam habitant dapibus. Cursus litora nullam pharetra sit
                  purus duis suspendisse. Etiam metus porttitor dui leo feugiat. Non torquent tempor nec, aliquam feugiat
                  class. Hac velit feugiat venenatis conubia nam sem lectus. Phasellus facilisis ipsum vehicula litora ipsum
                  praesent aenean aliquam. Lorem torquent ultricies eleifend tempor platea nunc. Senectus fermentum cubilia
                  auctor dignissim dui justo in integer. Suspendisse praesent libero non lobortis urna. Cras lacus ligula nam
                  sollicitudin massa morbi eget. Blandit dolor orci morbi penatibus nullam vitae praesent nibh.
                </p>
                <p className="text-base">
                  Etiam consequat praesent proin fusce vestibulum nunc, scelerisque montes? Maecenas turpis ut nam. Malesuada
                  dolor eleifend ullamcorper elit a. Dui enim at bibendum phasellus purus porta. Arcu fringilla nullam class
                  nostra habitant rutrum. Facilisis ultrices pulvinar quam sapien lobortis. Dictum ipsum ligula odio dictum
                  primis.
                </p>
              </div>

              <div className="bg-white px-8 rounded-lg mb-8 flex justify-between items-start">
                <div className="w-3/4">
                  <h2 className="text-2xl font-bold mb-4">What Will You Get?</h2>
                  <p className="text-base mb-6">
                    Auctor lectus faucibus leo urna tortor fermentum porta. Orci senectus scelerisque id etiam nunc vitae
                    vitae sapien habitasse. Nisi habitant vivamus blandit nascetur mi ad rhoncus scelerisque. Mi primis tempus
                    et, dictumst id euismod erat magna. Risus nam bibendum dignissim, cubilia magnis magnis. Aquisque cubilia
                    inceptos rhoncus penatibus praesent. Himenaeos sem metus netus vestibulum interdum a auctor adipiscing.
                    Senectus venenatis auctor vitae mattis purus nec blandit. Etiam arcu platea aliquet; praesent penatibus
                    inceptos habitant non.
                  </p>
                  <p className="text-base">
                    Integer tortor aliquam praesent nascetur urna dignissim nec aliquet. At augue ut sollicitudin nascetur;
                    accumsan libero. Tortor mi litora vehicula aliquam fringilla interdum in augue. Nascetur metus molestie
                    risus porta fermentum. Facilisi platea consequat auctor laoreet praesent, sodales vulputate parturient.
                    Suscipit lectus efficitur cras in vulputate aptent facilisi potenti.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-2/5 flex flex-col gap-2 ">
              <div className="flex flex-col gap-4">
                <div className="h-[250px] relative rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                  <Image src="/images/binus-university.jpg" alt="AI Technology" fill className="object-cover" />
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" className="flex items-center gap-1 rounded-sm">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="space-y-5 mt-2">
                <div className="flex items-center gap-2">
                  <HandHelping className="h-5 w-5" />
                  <span>Volunteer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Onsite</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>13.00 - 15.00 WIB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>20 September 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>Jakarta Pusat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  <span>Ureeka Binus</span>
                </div>

                <div className="flex gap-2 mt-2 ">
                  <PillTag variant="blue">Technology</PillTag>
                  <PillTag variant="yellow">Education</PillTag>
                  <PillTag variant="green">Work</PillTag>
                </div>
              </div>
              <Button className="bg-[#0b5c29] hover:bg-[#0b5c29]/80 text-white px-8 py-6 text-lg w-full mt-12">Register</Button>
            </div>
          </div>
      </main>
    </div>
  )
}
