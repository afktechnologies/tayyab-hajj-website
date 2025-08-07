"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PreRegistrationModal } from "@/components/modals/pre-registration-modal"

interface TripEvent {
  date: string // YYYY-MM-DD
  name: string
  status: string // e.g., "Open", "Filling Fast", "Full", "Pre-registration"
}

const trips: TripEvent[] = [
  { date: "2025-03-15", name: "Spring Umrah Group 1", status: "Filling Fast" },
  { date: "2025-06-10", name: "Summer Umrah Group 2", status: "Open" },
  { date: "2025-09-05", name: "Fall Umrah Group 3", status: "Open" },
  { date: "2025-12-01", name: "Winter Umrah Group 4", status: "Open" },
  { date: "2026-06-01", name: "Hajj 2026", status: "Pre-registration" }, // Placeholder for Hajj
]

export function CalendarUI() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<TripEvent | null>(null)

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month) // 0 for Sunday, 1 for Monday

    const calendarDays = []
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="p-2" />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
      const tripForDay = trips.find((trip) => trip.date === fullDate)

      calendarDays.push(
        <div
          key={day}
          className={`p-2 border rounded-lg flex flex-col items-center justify-center h-28 ${
            tripForDay
              ? "bg-yellow-50 border-yellow-300 cursor-pointer hover:bg-yellow-100"
              : "bg-white border-gray-200"
          }`}
          onClick={() => tripForDay && handleDayClick(tripForDay)}
        >
          <span className="font-bold text-lg">{day}</span>
          {tripForDay && (
            <>
              <p className="text-sm font-semibold text-yellow-800 text-center mt-1">{tripForDay.name}</p>
              <p
                className={`text-xs mt-1 ${
                  tripForDay.status === "Filling Fast"
                    ? "text-red-600"
                    : tripForDay.status === "Pre-registration"
                      ? "text-blue-600"
                      : "text-green-600"
                }`}
              >
                {tripForDay.status}
              </p>
            </>
          )}
        </div>,
      )
    }
    return calendarDays
  }

  const handleDayClick = (trip: TripEvent) => {
    setSelectedTrip(trip)
    setIsModalOpen(true)
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <div className="flex justify-between items-center mb-6">
        <Button onClick={goToPreviousMonth} variant="outline" aria-label="Previous month">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold font-arabic">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <Button onClick={goToNextMonth} variant="outline" aria-label="Next month">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div> */}

      {/* <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700 mb-4">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

      {selectedTrip && (
        <PreRegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tripName={selectedTrip.name}
          tripDate={selectedTrip.date}
        />
      )} */}
    </div>
  )
}
