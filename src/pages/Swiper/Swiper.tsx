// @ts-nocheck
import React, { Children, cloneElement, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './swiper.css'
import { Circle } from '../../jotai/store.tsx'
import { useAtom } from 'jotai/index'

interface pagination {
    dynamicBullets?: boolean,
    fraction?: boolean,
    clickable?: boolean,
    progress?: boolean ,
}

interface SwiperProps {
    children: React.ReactNode;
    className?: string;
    slidesPerView?: number;
    spaceBetween?: number;
    navigation?: boolean;
    loop?: boolean;
    autoplay?: boolean;
    autoplayDelay?: number;
    pagination?: boolean | pagination;
    scrollbar?: boolean;
    direction?: 'vertical' | 'horizontal'
    defaultTz?: boolean;
    time?: boolean;
}

export const Swiper: React.FC<SwiperProps> = ({
                                                  children,
                                                  className = '',
                                                  slidesPerView = 1,
                                                  spaceBetween = 0,
                                                  navigation = false,
                                                  defaultTz = true,
                                                  loop = false,
                                                  autoplay = false,
                                                  autoplayDelay = 3000,
                                                  pagination = false,
                                                  scrollbar = false,
                                                  direction = 'horizontal',
                                                  time = false
                                              }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [animal, setAnimal] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)
    const slideCount = Children.count(children)
    const dragState = useRef({
        mouseStart: 0,
        mouseEnd: 0,
        mouseOver: 0,
        width: 0,
    })
    const [circle] = useAtom(Circle)
    const goToSlide = (index: number) => {
        let newIndex = index
        
        if (loop) {
            if (index < 0) newIndex = slideCount - 1
            if (index >= slideCount) newIndex = 0
        } else {
            if (index < 0) newIndex = 0
            if (index >= slideCount) newIndex = slideCount - 1
        }
        
        setActiveIndex(newIndex)
    }
    const nextSlide = () => {
        goToSlide(activeIndex + 1)
    }
    const prevSlide = () => {
        goToSlide(activeIndex - 1)
    }
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }
    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }
    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            nextSlide()
        }
        
        if (touchStart - touchEnd < -50) {
            prevSlide()
        }
    }
    const handleMouseDown = (e) => {
        dragState.current.width = direction == 'horizontal' ? (100 / slidesPerView) / 100 * e.currentTarget.offsetWidth : (100 / slidesPerView) / 100 * e.currentTarget.offsetHeight
        dragState.current.mouseStart = direction == 'horizontal' ? e.clientX : e.clientY
        dragState.current.mouseEnd = direction == 'horizontal' ? e.clientX : e.clientY
        dragState.current.mouseOver = activeIndex
        setAnimal(false)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseEnd)
    }
    const handleMouseMove = (e) => {
        dragState.current.mouseEnd = direction == 'horizontal' ? e.clientX : e.clientY
        const a = -(dragState.current.mouseOver + ((dragState.current.mouseStart - (direction == 'horizontal' ? e.clientX : e.clientY)) / dragState.current.width))
        setActiveIndex(-a)
    }
    const handleMouseEnd = () => {
        setAnimal(true)
        if (dragState.current.mouseStart - dragState.current.mouseEnd > (dragState.current.width / 2)) {
            goToSlide(dragState.current.mouseOver + 1)
            goToSlide(dragState.current.mouseOver + Math.round((dragState.current.mouseStart - dragState.current.mouseEnd) / dragState.current.width))
        } else if (dragState.current.mouseStart - dragState.current.mouseEnd < (-dragState.current.width / 2)) {
            goToSlide(dragState.current.mouseOver - 1)
        } else {
            setActiveIndex(dragState.current.mouseOver)
        }
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseEnd)
        dragState.current.width = 0
    }
    
    // Autoplay functionality
    useEffect(() => {
        let interval: NodeJS.Timeout
        
        if (autoplay) {
            interval = setInterval(() => {
                nextSlide()
            }, autoplayDelay)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [activeIndex, autoplay])
    
    // Apply styles to slides
    const slideStyle = {
        transform: `translate${direction == 'vertical' ? 'Y' : 'X'}(-${(100 / slidesPerView) / 100 * activeIndex * 100}%)`,
        transition: animal ? 'transform 0.3s ease-in-out' : '',
        flexWrap: direction == 'vertical' ? 'wrap' : 'nowrap',
        marginLeft: `${-activeIndex * spaceBetween}px`,
    }
    
    const timerRef = useRef(null)
    useEffect(() => {
        if (time) {
            if (!timerRef.current) {
                timerRef.current = setInterval(() => {
                    let count = 0
                    circle.map((_item, index) => {
                        if (document.documentElement.getElementsByClassName('buttom-circle')[index].classList.contains('check-circle')) {
                            count = index
                        }
                    })
                    document.documentElement.getElementsByClassName('buttom-circle')[count].classList.remove('check-circle')
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    count == 1 ? setActiveIndex(0) : setActiveIndex(1)
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    count == 1 ? document.documentElement.getElementsByClassName('buttom-circle')[0].classList.add('check-circle') :
                        document.documentElement.getElementsByClassName('buttom-circle')[1].classList.add('check-circle')
                    
                }, 1500)
            }
            
        }
        
    }, [])
    return (
        <div
            className={`custom-swiper ${className}`}
            ref={containerRef}
        >
            <div
                className="custom-swiper-wrapper"
                style={slideStyle}
                onTouchStart={defaultTz && handleTouchStart}
                onTouchMove={defaultTz && handleTouchMove}
                onTouchEnd={defaultTz && handleTouchEnd}
                onMouseDown={defaultTz && handleMouseDown}
            >
                {Children.map(children, (child, index) => {
                    return cloneElement(child as React.ReactElement, {
                        style: {
                            width: `${100 / slidesPerView}%`,
                            marginRight: index < slideCount - 1 ? `${spaceBetween}px` : 0,
                            backgroundColor: 'white',
                        },
                    })
                })}
            </div>
            
            {navigation && (
                <>
                    <button
                        className="custom-swiper-button-prev"
                        onClick={prevSlide}
                        disabled={!loop && activeIndex === 0}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="custom-swiper-button-next"
                        onClick={nextSlide}
                        disabled={!loop && activeIndex === slideCount - 1}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
            {pagination && !pagination.progress &&
                (pagination.fraction ? <div
                        className="swiper-container-bottom-number"
                    >{Math.round(activeIndex) + 1}/9
                    </div> : <div
                        className={`swiper-container-bottom-circle`}
                        style={{
                            right: direction == 'vertical' ? '10px' : '',
                            left: direction == 'vertical' ? 'auto' : '',
                            top: direction == 'vertical' ? '50%' : '',
                            transform: direction == 'vertical' ? 'translateY(-50%)' : 'translateX(-50%)',
                            width: direction == 'vertical' ? '20px' : '',
                        }}
                    >
                        {
                            circle.map((_item, index) => {
                                return <div
                                    className={`buttom-circle ${index == activeIndex ? 'check-circle' : ''}`}
                                    style={{
                                        display: pagination.dynamicBullets ? ((index <= activeIndex + 2 && index >= activeIndex - 2) ? 'block' : 'none') : 'block',
                                        width: pagination.dynamicBullets ? `${20 - Math.abs(index - activeIndex) * 5}px` : pagination.custom ? '20px' : '10px',
                                        height: pagination.dynamicBullets ? `${20 - Math.abs(index - activeIndex) * 5}px` : pagination.custom ? '20px' : '10px',
                                        lineHeight: '20px'
                                    }}
                                    onClick={() => {
                                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                        pagination.clickable ? setActiveIndex(index) : ''
                                    }}
                                    key={index}
                                >{pagination.custom && (index + 1)}</div>
                            })
                        }
                    </div>
                )
            }
            {(scrollbar || pagination.progress) &&
              <div
                className="swiper-container-bottom"
                style={{
                    bottom: pagination.progress ? 'auto' : '0',
                    top: pagination.progress ? '0px' : 'auto'
                }}
              >
                <div
                  style={{
                      width: pagination.progress ? 100 / 9 * (activeIndex + 1) + '%' : 100 / 9 + '%',
                      marginLeft: pagination.progress ? '' : activeIndex * 100 / 9 + '%',
                  }}
                ></div>
              </div>
            }
        </div>
    )
}
