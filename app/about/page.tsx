import React from 'react'
import PhotoWall from "../components/about/photowall";
import {DotPoint} from "../components/about/dotpoint";

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

const page = async () => {

  return (
    <div className="bg-[#161828]">
         {/* who are we */}
        <div className="flex flex-col lg:flex-row gap-[41px] items-center p-[30px] bg-[#161828]">
            <div className="relative w-full h-[280px] sm:h-[340px] lg:w-[650px] lg:h-[446px] overflow-hidden">
                <PhotoWall />
            </div>
            
            <div className="lg:w-[740px] flex flex-col justify-center space-y-4">
                <h2 className="bold text-[36px] mb-4 text-white font-karla">About Game Maker Club</h2>
                <p className="text-white bold text-[24px] lg:max-w-[732px] w-full font-karla">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
                    lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec
                    suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla
                    faucibus. Maecenas et augue sed lorem fermentum sodales.Aenean fringilla 
                    leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue 
                    sed lorem fermentum sodales.
                </p>
            </div>
        </div>

        {/* our mission */}
        <div className="bg-[#161828] px-[30px] py-[40px]">
        {/* Title — left aligned */}
        <h2 className="text-white text-[36px] font-karla bold mb-8 text-left">What We Do</h2>

        {/* Dotpoints — centered as a block */}
        <div className="max-w-[720px] mx-auto">
            <div className="flex flex-col gap-10">
            <DotPoint
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                iconSrc="/images/wires.png"
            />
            <DotPoint
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                iconSrc="/images/wires.png"
            />
            <DotPoint
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                iconSrc="/images/wires.png"
            />
            </div>
        </div>
        </div>

    </div>

  )
}

export default page