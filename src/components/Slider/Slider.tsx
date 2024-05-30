'use client';

import { useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";
import Link from "next/link";
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Autoplay from 'embla-carousel-autoplay';

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img1: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    img2: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    img3: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img1: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    img2: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    img3: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img1: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    img2: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    img3: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect(); // Update selected index on mount
    setIsMounted(true); // Mark component as mounted
  }, [emblaApi, onSelect]);

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const img1Variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, duration: 1.5 } },
  };

  const img2Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, duration: 1.5 } },
  };

  const img3Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50, duration: 1.5 } },
  };

  return (
    <div className={styles.container}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div className={styles.innercontainer} key={slide.id}>
              <div className="maincontainer">
                <div className={styles.maincontent}>
                  <motion.div
                    className={styles.textcontent}
                    initial="hidden"
                    animate={isMounted && selectedIndex === index ? "visible" : "hidden"}
                    variants={textVariants}
                    key={`${index}-text`}
                  >
                    <h2>{slide.description}</h2>
                    <h1>{slide.title}</h1>
                    <motion.a
                      className={styles.btn}
                      initial="hidden"
                      animate={isMounted && selectedIndex === index ? "visible" : "hidden"}
                      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5 } } }} // Increase duration here
                      key={`${index}-button`}
                      href={slide.url}
                    >
                      <div>See Collections</div>
                    </motion.a>
                  </motion.div>
                  <div className={styles.imgcontainer}>
                    <motion.div
                      className={styles.imgcontainer1}
                      initial="hidden"
                      animate={isMounted && selectedIndex === index ? "visible" : "hidden"}
                      variants={img1Variants}
                      key={`${index}-img1`}
                    >
                      <div
                        style={{ backgroundImage: `url(${slide.img1})` }}
                        className={styles.img1}></div>
                    </motion.div>
                    <div className={styles.imgcontainer2}>
                      <motion.div
                        className={styles.imginnercontainer2}
                        initial="hidden"
                        animate={isMounted && selectedIndex === index ? "visible" : "hidden"}
                        variants={img2Variants}
                        key={`${index}-img2`}
                      >
                        <div
                          style={{ backgroundImage: `url(${slide.img2})` }}
                          className={styles.img2}></div>
                      </motion.div>
                      <motion.div
                        className={styles.imginnercontainer3}
                        initial="hidden"
                        animate={isMounted && selectedIndex === index ? "visible" : "hidden"}
                        variants={img3Variants}
                        key={`${index}-img3`}
                      >
                        <div
                          style={{ backgroundImage: `url(${slide.img3})` }}
                          className={styles.img3}></div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
