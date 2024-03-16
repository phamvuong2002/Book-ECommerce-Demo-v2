import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Card from '../../components/Card';

const SlideProducts = ({ title, decription }) => {
    const [products, setProducts] = useState([]);
    const queries = `subject:fiction`;
    const maxResults = 20;
    const queryParams = `q=${queries}&orderBy=newest&maxResults=${maxResults}&startIndex=1&filter=paid-ebooks`

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`${import.meta.env.VITE_GOOGLE_BOOKS_API}?${queryParams}&key=${import.meta.env.VITE_API_KEY}`);
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             setProducts(data.items);
    //         } catch (error) {
    //             console.error('Error fetching data', error);
    //         }
    //     }
    //     fetchData();
    // }, [])

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 py-5">
            <div className="text-center">
                <h2 className="title">{title}</h2>
                <p className="text-Black/75 capitalize md:w-2/3 mx-auto mb-8" >{decription}</p>
            </div>

            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                slidesPerView={4}
                spaceBetween={10}
                // centeredSlides={true}
                // lazy={true}
                // pagination={{
                //     clickable: true,
                // }}
                navigation={true}
                autoplay={{
                    delay:2500,
                    disableOnInteraction: false, 
                }}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                {
                    products.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Card item={item} loading="lazy"/>
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default SlideProducts