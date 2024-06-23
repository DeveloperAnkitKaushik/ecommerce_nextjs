'use client';

import { useState } from "react";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import Image from "next/image";
import styles from "./index.module.css";

const reviews = [
    {
        name: "Ankit Kaushik",
        date: "15/04/2003",
        profileImg: "https://images.unsplash.com/photo-1521133573892-e44906baee46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D",
        rating: 5,
        shortDesc: "Amazing product.",
        longDesc: "This product exceeded my expectations. The quality is superb and the service was excellent. Will definitely buy again!",
        helpful: 0,
        notHelpful: 0,
    },
    {
        name: "John Doe",
        date: "22/01/2022",
        profileImg: "https://images.unsplash.com/photo-1511424187101-2aaa60069357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4.5,
        shortDesc: "Excellent product.",
        longDesc: "The product quality is top-notch, and the customer service is excellent. Highly recommended!",
        helpful: 2,
        notHelpful: 1,
    },
    {
        name: "Jane Smith",
        date: "10/11/2021",
        profileImg: "https://images.unsplash.com/photo-1502378735452-bc7d86632805?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww%3D%3D",
        rating: 4,
        shortDesc: "Very good.",
        longDesc: "I am satisfied with the product. It meets my expectations and the delivery was prompt.",
        helpful: 3,
        notHelpful: 0,
    },
    {
        name: "Emily Johnson",
        date: "05/09/2020",
        profileImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVtb3x8MHx8MHx8MA%3D%3D",
        rating: 4.8,
        shortDesc: "Great product!",
        longDesc: "This product is amazing! The quality is excellent and it was exactly what I needed.",
        helpful: 5,
        notHelpful: 1,
    },
    {
        name: "Michael Brown",
        date: "19/03/2023",
        profileImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fHww%3D%3D",
        rating: 3.5,
        shortDesc: "Decent.",
        longDesc: "The product is okay, but there are a few minor issues. Customer service was helpful though.",
        helpful: 1,
        notHelpful: 2,
    },
    {
        name: "Sarah Wilson",
        date: "28/02/2021",
        profileImg: "https://images.unsplash.com/photo-1718900351979-3e00f88386a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8",
        rating: 5,
        shortDesc: "Absolutely love it!",
        longDesc: "This is the best product I have purchased in a long time. Excellent quality and fast shipping!",
        helpful: 4,
        notHelpful: 0,
    },
    {
        name: "David Martin",
        date: "02/07/2022",
        profileImg: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4.2,
        shortDesc: "Very good value.",
        longDesc: "The product offers great value for money. It performs well and I am pleased with my purchase.",
        helpful: 3,
        notHelpful: 1,
    },
    {
        name: "Sophia Turner",
        date: "15/08/2021",
        profileImg: "https://images.unsplash.com/photo-1715512518630-18b8f4aea693?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
        rating: 4.7,
        shortDesc: "Impressive quality.",
        longDesc: "The quality of this product is very impressive. I would definitely recommend it to others.",
        helpful: 2,
        notHelpful: 0,
    },
    {
        name: "Chris Evans",
        date: "11/06/2020",
        profileImg: "https://images.unsplash.com/photo-1718931216724-40371852f48b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
        rating: 3.8,
        shortDesc: "Good, but room for improvement.",
        longDesc: "The product is good, but there are a few areas where it could be improved. Overall, I'm satisfied.",
        helpful: 1,
        notHelpful: 1,
    },
    {
        name: "Olivia Harris",
        date: "23/03/2022",
        profileImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGVtb3x8MHx8MHx8MA%3D%3D",
        rating: 5,
        shortDesc: "Fantastic!",
        longDesc: "This product is fantastic! It exceeded all my expectations and I couldn't be happier with my purchase.",
        helpful: 4,
        notHelpful: 0,
    },
    {
        name: "Liam Scott",
        date: "29/09/2021",
        profileImg: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
        rating: 4.3,
        shortDesc: "Very happy.",
        longDesc: "I am very happy with this product. It works as advertised and is worth the money.",
        helpful: 2,
        notHelpful: 0,
    },
    {
        name: "Emma Davis",
        date: "18/12/2020",
        profileImg: "https://images.unsplash.com/photo-1502378735452-bc7d86632805?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww%3D%3D",
        rating: 3.9,
        shortDesc: "Satisfied.",
        longDesc: "The product is satisfactory. It meets my needs, but there is nothing exceptional about it.",
        helpful: 1,
        notHelpful: 1,
    },
];

const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <>
            {[...Array(fullStars)].map((_, index) => (
                <FaStar key={index} />
            ))}
            {[...Array(halfStars)].map((_, index) => (
                <FaRegStarHalfStroke key={index} />
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <FaRegStar key={index} />
            ))}
        </>
    );
};

const Reviews = () => {
    const [visibleReviews, setVisibleReviews] = useState(3);

    const handleLoadMore = () => {
        setVisibleReviews(prev => prev + 3);
    };

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h1>Customers reviews</h1>
                <div className={styles.btn}>Write a review</div>
            </div>
            <div className={styles.totalreview}>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
                <FaRegStar />
                <h1>Based on 65 reviews</h1>
            </div>
            {reviews.slice(0, visibleReviews).map((review, index) => (
                <div className={styles.review} key={index}>
                    <div className={styles.dp}>
                        <Image 
                            src={review.profileImg} 
                            alt='User profile picture' 
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                            className={styles.img} 
                        />
                    </div>
                    <div className={styles.namecontainer}>
                        <div className={styles.singlereview}>
                            {renderStars(review.rating)}
                            <h1>{review.date}</h1>
                        </div>
                        <div className={styles.name}>{review.name}</div>
                        <div className={styles.shotdesc}>{review.shortDesc}</div>
                        <div className={styles.longdesc}>{review.longDesc}</div>
                        <div className={styles.feedback}>
                            <h1>Was This Review Helpful?</h1>
                            <div className={styles.likebtn}>
                                <AiOutlineLike />
                                <h1>{review.helpful}</h1>
                            </div>
                            <div className={styles.dislikebtn}>
                                <AiOutlineDislike />
                                <h1>{review.notHelpful}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {visibleReviews < reviews.length && (
                <div className={styles.loadbtn} onClick={handleLoadMore}>
                    Load More
                </div>
            )}
        </div>
    );
}

export default Reviews;
