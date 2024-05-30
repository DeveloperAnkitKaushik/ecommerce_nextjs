'use client';

import Category from "@/components/Category/Category";
import FeaturedProduct from "@/components/FeaturedProduct/FeaturedProduct";
import Slider from "@/components/Slider/Slider";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

const HomePage = () => {
  const {user} = useKindeBrowserClient();
  console.log(user);
  
  return (
    <div className=''>
      <Slider/>
      <FeaturedProduct/>
      <Category/>
    </div>
  )
}

export default HomePage