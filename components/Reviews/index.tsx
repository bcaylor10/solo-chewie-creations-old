import { useEffect, useState, useRef } from 'react';
import { shuffle } from 'lodash';
import { Title, Text, Container, Loader, Center } from '@mantine/core';
import { useSelector } from 'react-redux';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

import { IReview } from '@/mongo/models/Review';
import { useGetReviews } from '@/queries/reviews';
import ReviewStars from '../ReviewStars';

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

    return (
        <section className={styles.section}>
            <Title order={2} align="center">Our Latest Reviews</Title>
            {!reduxLoading && isLoading ? (
                <Center>
                    <Loader color="turqoise" variant="dots" />
                </Center>
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
                                            <ReviewStars rating={rating} className={styles.stars} />
                                        </div>
                                        <Text align="center" className={styles.message}>{message}</Text>
                                        <Text weight="bold" align="center" size="sm">{author}</Text>
                                    </Container>
                                </Carousel.Slide>
                            )
                        })}
                    </Carousel>
                ) : (
                    <Title align="center" order={4}>No reviews found</Title>
                )
            )}
        </section>
    )
};

export default Reviews;