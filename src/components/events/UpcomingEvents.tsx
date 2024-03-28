import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
export default function UpcomingEvents() {
  return (
    <div>
      <h1>Upcoming</h1>

 
<Carousel>
  <CarouselContent>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">1</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">2</CarouselItem>
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">3</CarouselItem>
  </CarouselContent>

  <CarouselPrevious />
      <CarouselNext />
</Carousel>

    </div>
  )
}
