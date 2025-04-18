import React from 'react';

interface SwiperSlideProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const SwiperSlide: React.FC<SwiperSlideProps> = ({
    children,
    className = '',
    style = {},
}) => {
    return (
        <div className={`custom-swiper-slide ${className}`} style={style}>
            {children}
        </div>
    );
};
