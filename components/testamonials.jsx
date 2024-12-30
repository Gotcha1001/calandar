"use client"
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import Autoplay from 'embla-carousel-autoplay'
import testimonials from '@/lib/testamonialsData'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const TestamonialCarousel
    = () => {
        return (
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                className="w-full mx-auto">
                <CarouselContent >
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="h-full">
                                    <CardContent className="flex flex-col h-full justify-between p-6">
                                        <p className='text-gray-600 mb-4'>
                                            &quot;{testimonial.content}&quot;
                                        </p>
                                        <div className='flex items-center mt-4'>
                                            <Avatar className="h-12 w-12 mr-4">
                                                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                                <AvatarFallback>{testimonial.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className='font-semibold'>{testimonial.name}</p>
                                                <p className='text-sm text-gray-500'>{testimonial.role}</p>
                                            </div>

                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

            </Carousel>
        )
    }

export default TestamonialCarousel
