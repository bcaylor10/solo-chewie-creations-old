import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface IReviewStars {
    rating: number;
    className?: any;
}

const ReviewStars = ({ rating, className = '' }: IReviewStars) => {
    const isDecimal = rating % 1 !== 0;
    const wholeStars: number = Math.floor(rating);
    const stars: any[] = [];
    
    for (let i = 0; i < wholeStars; i++) {
        stars.push(<FaStar className={className} />);
    };
    
    if (isDecimal) stars.push(<FaStarHalfAlt className={className} />);
        
    if (stars.length !== 5) {
        for (let i = stars.length; stars.length !== 5; i++) {
            stars.push(<FaRegStar className={className} />)
        }
    }
    
    return (
        <div>{stars}</div>
    );
};

export default ReviewStars;