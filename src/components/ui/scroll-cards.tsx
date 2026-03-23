"use client";
import { FC } from "react";
import Image from "next/image";

// Types
export interface iCardItem {
    title: string;
    description: string;
    tag: string;
    src: string;
    link: string;
    color: string;
    textColor: string;
}

interface iCardProps extends Omit<iCardItem, "src" | "link" | "tag"> {
    i: number;
    src: string;
}

// Components
const Card: FC<iCardProps> = ({ title, description, color, textColor, i, src }) => {
    return (
        <div className="h-screen flex items-center justify-center sticky top-0 md:p-0 px-4">
            <div
                className="relative flex flex-col h-[350px] w-full max-w-[550px] py-12 px-6 md:px-10
                rotate-0 md:h-[500px] items-center justify-center mx-auto 
                shadow-2xl overflow-hidden rounded-[2rem] border border-white/30"
                style={{ backgroundColor: color }}
            >
                <div className="absolute inset-0 z-0">
                    <Image
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        src={src}
                        alt={title || "Image"}
                        fill
                        priority={i === 0}
                    />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center mt-auto w-full">
                    {title && (
                        <span className="font-bold relative text-3xl md:text-5xl mb-2">
                            <span
                                className="relative z-10 font-black tracking-tight"
                                style={{ color: textColor }}
                            >
                                {title}
                            </span>
                        </span>
                    )}
                    {description && (
                        <div
                            className="text-sm md:text-xl font-medium text-center mb-0 z-50 tracking-wide text-white/90"
                            style={{ lineHeight: 1.4, color: textColor }}
                        >
                            {description}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

interface iCardSlideProps {
    items: iCardItem[];
}

export const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
    return (
        <div className="relative w-full">
            {items.map((project, i) => {
                return <Card key={`p_${i}`} {...project} i={i} />;
            })}
        </div>
    );
};
