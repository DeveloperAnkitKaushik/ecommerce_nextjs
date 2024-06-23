'use client';

import { useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from "framer-motion";
import Autoplay from 'embla-carousel-autoplay';

const slides = [
  {
    id: 1,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img1: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfDF8MHx8fDI%3D",
    img2: "https://images.unsplash.com/photo-1507553532144-b9df5e38c8d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI5fHxmYXNoaW9ufGVufDB8MHwwfHx8Mg%3D%3D",
    img3: "https://images.unsplash.com/photo-1562151270-c7d22ceb586a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGZhc2hpb258ZW58MHwxfDB8fHwy",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img1: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc2hpb258ZW58MHwxfDB8fHwy",
    img2: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfDB8MHx8fDI%3D",
    img3: "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGZhc2hpb258ZW58MHwxfDB8fHwy",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img1: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhc2hpb258ZW58MHwxfDB8fHwy",
    img2: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfDB8MHx8fDI%3D",
    img3: "https://images.unsplash.com/photo-1507015264727-8e0a4e8d3f8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU1fHxmYXNoaW9ufGVufDB8MHwwfHx8Mg%3D%3D",
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
