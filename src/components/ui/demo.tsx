'use client'

import { useState } from 'react'

import { CircleCheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const CalendarAppointmentBookingDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 20))
  const [selectedTime, setSelectedTime] = useState<string | null>('10:00')

  const timeSlots = Array.from({ length: 37 }, (_, i) => {
    const totalMinutes = i * 15
    const hour = Math.floor(totalMinutes / 60) + 9
    const minute = totalMinutes % 60

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  })

  const bookedDates = Array.from({ length: 3 }, (_, i) => new Date(2025, 5, 17 + i))

  return (
    <div className="w-full flex flex-col items-center">
      <Card className='w-full max-w-5xl mx-auto gap-0 p-0 shadow-2xl border-0 overflow-hidden' style={{ background: 'white', borderRadius: 'var(--radius-lg)' }}>
        <CardHeader className='flex h-max justify-center border-b !p-8' style={{ background: 'var(--bg-color)' }}>
          <CardTitle className="text-3xl font-normal text-[var(--text-primary)]">Book your appointment</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col md:flex-row p-0'>
          <div className='flex-1 p-8 md:p-12 flex justify-center items-center overflow-x-auto'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
              disabled={bookedDates}
              showOutsideDays={false}
              modifiers={{
                booked: bookedDates
              }}
              modifiersClassNames={{
                booked: '[&>button]:line-through opacity-100'
              }}
              classNames={{
                weekday: "size-10 md:size-14 p-0 text-sm font-medium text-muted-foreground/80",
                day_button: "relative flex size-10 md:size-14 items-center justify-center whitespace-nowrap rounded-lg p-0 text-foreground outline-offset-2 group-[[data-selected]:not(.range-middle)]:[transition-property:color,background-color,border-radius,box-shadow] group-[[data-selected]:not(.range-middle)]:duration-150 focus:outline-none group-data-[disabled]:pointer-events-none focus-visible:z-10 hover:bg-accent group-data-[selected]:bg-primary hover:text-foreground group-data-[selected]:text-primary-foreground group-data-[disabled]:text-foreground/30 group-data-[disabled]:line-through group-data-[outside]:text-foreground/30 group-data-[outside]:group-data-[selected]:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 group-[.range-start:not(.range-end)]:rounded-e-none group-[.range-end:not(.range-start)]:rounded-s-none group-[.range-middle]:rounded-none group-data-[selected]:group-[.range-middle]:bg-accent group-data-[selected]:group-[.range-middle]:text-foreground",
                day: "group size-10 md:size-14 px-0 text-base",
                week_number: "size-10 md:size-14 p-0 text-sm font-medium text-muted-foreground/80",
                month_caption: "relative mx-10 mb-4 flex h-9 items-center justify-center z-20 text-lg",
              }}
              className='bg-transparent p-0'
              formatters={{
                formatWeekdayName: date => {
                  return date.toLocaleString('en-US', { weekday: 'short' })
                }
              }}
            />
          </div>
          <div className='w-full md:w-80 shrink-0 border-t md:border-t-0 md:border-l' style={{ background: 'var(--bg-color)' }}>
            <ScrollArea className='h-80 md:h-[500px]'>
              <div className='flex flex-col gap-3 p-8'>
                <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">Select Time</h4>
                {timeSlots.map(time => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'ghost'}
                    onClick={() => setSelectedTime(time)}
                    className='w-full h-auto shadow-none text-base py-4 text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.5)]'
                    style={selectedTime === time ? { background: 'var(--accent-main)', color: 'white', border: 'none' } : {}}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-6 border-t px-8 !py-6 md:flex-row' style={{ background: 'var(--bg-color)' }}>
          <div className='flex items-center gap-3 text-base text-[var(--text-secondary)]'>
            {date && selectedTime ? (
              <>
                <CircleCheckIcon className='size-6 stroke-[var(--accent-main)]' />
                <span>
                  Your meeting is booked for{' '}
                  <span className='font-medium text-[var(--text-primary)]'>
                    {' '}
                    {date?.toLocaleDateString('en-US', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}{' '}
                  </span>
                  at <span className='font-medium text-[var(--text-primary)]'>{selectedTime}</span>.
                </span>
              </>
            ) : (
              <>Select a date and time for your meeting.</>
            )}
          </div>
          <Button disabled={!date || !selectedTime} className='w-full h-auto md:ml-auto md:w-auto text-white px-10 py-4 text-lg rounded-full' variant='outline' style={{ background: 'black', border: 'none' }}>
            Continue
          </Button>
        </CardFooter>
      </Card>
      <p className='text-muted-foreground mt-6 text-center text-sm' role='region'>
        Aura Vision Appointment Calendar
      </p>
    </div>
  )
}

export default CalendarAppointmentBookingDemo
