import { useEffect, useState, useRef } from 'react';
import { shuffle } from 'lodash';
import { Title, Text, Container } from '@mantine/core';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

import { IReview } from '@/mongo/models/Review';
import { useGetReviews } from '@/queries/reviews';
import Loader from '../Loader';

import styles from './styles.module.scss';

const Reviews = () => {
    const reduxLoading = useSelector((store: any) => store.site.loading);
    const [ reviews, setReviews ] = useState<IReview[]>([]);
    const { data, isLoading, status } = useGetReviews();
    const autoplay = useRef(Autoplay({ delay: 4000 }));

    useEffect(() => {        
        if (status === 'success') {
            const shuffled = shuffle(data?.data);
            setReviews(shuffled);
        }
    }, [ status ]);

    const renderStars = (rating: number) => {
        const isDecimal = rating % 1 !== 0;
        const wholeStars: number = Math.floor(rating);
        const stars: any[] = [];

        for (let i = 0; i < wholeStars; i++) {
            stars.push(<FaStar className={styles.star} />);
        };

        if (isDecimal) stars.push(<FaStarHalfAlt className={styles.star} />);

        return stars;
    };

    return (
        <section className={styles.section}>
            <Title order={2} align="center">Our Latest Reviews</Title>
            {!reduxLoading && isLoading ? (
                <Loader loading={isLoading} />
            ) : (
                reviews.length > 0 ? (
                    <Carousel 
                        loop 
                        draggable={false} 
                        withControls={false}
                        plugins={[autoplay.current]}
                        onMouseEnter={autoplay.current.stop}
                        onMouseLeave={autoplay.current.reset}
                    >
                        {reviews.map((r: IReview, i: number) => {
                            const { rating, message, author } = r;
                    
                            return (
                                <Carousel.Slide key={i}>
                                    <Container>
                                        <div className={styles.starsContainer}>
                                            {renderStars(rating)}
                                        </div>
                                        <Text align="center" className={styles.message}>{message}</Text>
                                        <Text weight="bold" align="center" size="sm">{author}</Text>
                                    </Container>
                                </Carousel.Slide>
                            )
                        })}
                    </Carousel>
                ) : (
                    <h1>No reviews found</h1>
                )
            )}
        </section>
    )
};

export default Reviews;