/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { Button, MediaQuery, Text } from '@mantine/core';
import { Carousel, Embla } from '@mantine/carousel';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import cn from 'classnames';

import { IProductLayout } from '..';
import ProductTitle from '@/components/ProductTitle';
import { formatImagesArray } from '@/helpers';

import styles from './styles.module.scss';

const ProductImages = ({ product }: IProductLayout) => {
    const [ images, setImages ] = useState<string[]>([]);
    const [ currentSlide, setCurrentSlide ] = useState<number>(0);
    const [embla, setEmbla] = useState<Embla | null>(null);
    const showCarousel = images.length > 1;

    useEffect(() => {
        if (!product) return;
        if (product.img_urls) setImages(formatImagesArray(product.img_urls));
    }, [ product ]);

    const goToSlide = (slide: number) => {
        if (!embla) return;

        if (slide === -1) {
            slide = images.length - 1;
        } else if (slide === images.length) {
            slide = 0;
        }

        embla.scrollTo(slide);
        setCurrentSlide(slide);
    };

    return (
        <div className={styles.productImages}>
            <ProductTitle product={product} />
            {images.length > 0 && (
                <>
                    <div className={cn(styles.carousel, !showCarousel && styles.soloImage)}>
                        {images.length > 1 ? (
                            <Carousel withControls={false} getEmblaApi={setEmbla} loop height="100%">
                                {images.map((img: string, i: number) => {
                                    if (i >= 5) return; // allow only a maxiumum of 5 images
                                    return (
                                        <Carousel.Slide key={i} className={styles.carouselSlide}>
                                            <img 
                                                src={img} 
                                                alt={`${product?.name} - ${product?.size} Image`}
                                            />
                                        </Carousel.Slide>
                                    )
                                })}
                            </Carousel>
                        ) : (
                            <img 
                                src={images[0]} 
                                alt={`${product?.name} - ${product?.size} Image`}
                            />
                        )}
                       {showCarousel && (
                         <div className={styles.carouselControls}>
                            <div className={styles.slideCounter}>
                                <Text size="sm">{currentSlide + 1} / {images.length}</Text>
                            </div>
                            <Button.Group className={styles.buttonGroup}>
                                <Button 
                                    color="dark" 
                                    variant="outline" 
                                    size="md" 
                                    aria-label="Previous slide" 
                                    onClick={() => goToSlide(currentSlide - 1)}
                                >
                                    <FiArrowLeft />
                                </Button>
                                <Button 
                                    color="dark" 
                                    variant="outline" 
                                    size="md" 
                                    aria-label="Next slide" 
                                    onClick={() => goToSlide(currentSlide + 1)}
                                >
                                    <FiArrowRight />
                                </Button>
                            </Button.Group>
                        </div>
                       )}
                    </div>
                    {showCarousel && (
                        <div className={styles.imageList}>
                            <ul>
                                {images.map((img: string, i: number) => {
                                    const isActive = currentSlide === i;
                                    return (
                                        <li 
                                            key={i} 
                                            role="button" 
                                            onClick={() => goToSlide(i)}
                                            className={cn(isActive && styles.active)}
                                        >
                                            <img 
                                                className={styles.productImage} 
                                                src={img} 
                                                alt={`${product?.name} - ${product?.size} Image`}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    )
};

export default ProductImages;