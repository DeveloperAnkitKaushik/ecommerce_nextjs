import { FaStar } from "react-icons/fa6"; // full star
import { FaRegStarHalfStroke } from "react-icons/fa6"; // half star
import { FaRegStar } from "react-icons/fa6"; // no star
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import Image from "next/image";
import styles from "./index.module.css";

const Reviews = () => {
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
                <FaStar />
                <FaStar />
                <h1>Based on 65 reviews</h1>
            </div>
            <div className={styles.review}>
                <div className={styles.dp}>
                    <Image 
                        src='https://images.unsplash.com/photo-1521133573892-e44906baee46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D' 
                        alt='User profile picture' 
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        className={styles.img} 
                    />
                </div>
                <div className={styles.namecontainer}>
                    <div className={styles.singlereview}>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <h1>15/04/2003</h1>
                    </div>
                    <div className={styles.name}>Ankit Kaushik</div>
                    <div className={styles.shotdesc}>Lorem ipsum dolor sit.</div>
                    <div className={styles.longdesc}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est esse tenetur placeat optio itaque accusamus quia dignissimos! Quos, repellat quasi?</div>
                    <div className={styles.feedback}>
                        <h1>Was This Review Helpful?</h1>
                        <div className={styles.likebtn}>
                            <AiOutlineLike />
                            <h1>0</h1>
                        </div>
                        <div className={styles.dislikebtn}>
                            <AiOutlineDislike />
                            <h1>0</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.loadbtn}>Load More</div>
        </div>
    );
}

export default Reviews;
