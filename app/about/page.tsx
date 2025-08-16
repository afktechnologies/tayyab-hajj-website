import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, BookOpen, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-islamic-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-arabic">About Taybah Hajj & Umrah</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Dedicated to serving the Muslim community with professional, spiritual, and memorable pilgrimage experiences
          </p>
        </div>
      </section>

      {/* Company Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-arabic text-gray-800">Our Sacred Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              At Taybah Hajj & Umrah, we believe that the journey to the Holy Cities should be transformative,
              comfortable, and spiritually enriching. Since 2022, we have been privileged to guide over 500+ Muslims
              from the United States and Canada on their sacred pilgrimage, combining decades of religious scholarship
              with professional travel expertise.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">500+ Pilgrims</h3>
                <p className="text-gray-600">Satisfied travelers since 2022</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">40+ Years</h3>
                <p className="text-gray-600">Combined experience in Islamic guidance</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">USA & Canada</h3>
                <p className="text-gray-600">Serving Muslim communities nationwide</p>
              </div>
            </div>
            <div className="mt-12">
              <Link href="#team-profiles">
                <button className="btn-primary">Meet Our Team</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Profiles */}
      <section id="team-profiles" className="py-16 bg-warm-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-arabic text-gray-800">Meet Our Leadership Team</h2>
            <p className="text-lg text-gray-600">
              Experienced scholars and travel professionals dedicated to your spiritual journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Sheikh Abdullahu Profile */}
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
                    <Image
                      src="/images/abdul-nur.jpg"
                      alt="Sheikh Abdullahu Nur Abul Fadli"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-arabic">Sheikh Abdullaahi Nur (Abul Fadli)</h3>
                  <p className="text-yellow-600 font-semibold mb-4">Lead Scholar & Spiritual Guide</p>

                  <div className="space-y-4 text-left w-full">
                    <div className="flex items-start space-x-3">
                      <BookOpen className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Religious Expertise</h4>
                        <p className="text-gray-600 text-sm">40+ years in Da'wah and Islamic education</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Pilgrimage Leadership</h4>
                        <p className="text-gray-600 text-sm">Led 30+ successful Hajj and Umrah groups</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Academic Background</h4>
                        <p className="text-gray-600 text-sm">Fiqh expert with Master's degree from Yemen</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Community Leadership</h4>
                        <p className="text-gray-600 text-sm">Have Masters in Fiqh and Aqeedah</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Brother Abdulmajid Profile */}
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
                    <Image
                      src="/images/abdul-majid.jpg"
                      alt="Br. Abdulmajid Mohamed"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-arabic">Br. Abdulmajid Mohamed</h3>
                  <p className="text-blue-600 font-semibold mb-4">Travel & Logistics Director</p>

                  <div className="space-y-4 text-left w-full">
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Multilingual Expertise</h4>
                        <p className="text-gray-600 text-sm">Fluent in 5+ languages for international coordination</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Travel Experience</h4>
                        <p className="text-gray-600 text-sm">10+ years in international travel coordination</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <BookOpen className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Academic Credentials</h4>
                        <p className="text-gray-600 text-sm">Master's degree in Business Administration</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Community Service</h4>
                        <p className="text-gray-600 text-sm">Former Director at Masjid Assunnah</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-arabic text-gray-800">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide every aspect of our service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Islamic Authenticity</h3>
              <p className="text-gray-600">
                Every aspect of our tours follows authentic Islamic teachings and traditions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personal Care</h3>
              <p className="text-gray-600">
                Individual attention and support for each pilgrim throughout their journey
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                Commitment to the highest standards in accommodation, transportation, and service
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                Building lasting bonds among pilgrims and serving the broader Muslim community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-desert-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-arabic text-gray-800">Ready to Begin Your Sacred Journey?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join our experienced team for a transformative pilgrimage experience guided by Islamic scholarship and
            professional excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="btn-primary text-lg px-8 py-3">Schedule Consultation</button>
            </Link>
            <Link href="/trips">
              <button className="btn-secondary text-lg px-8 py-3">View Upcoming Trips</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
