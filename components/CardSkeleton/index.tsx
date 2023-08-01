import React from "react"
import ContentLoader from "react-content-loader"

const CardSkeleton = () => (
    <ContentLoader 
        speed={2}
        className="w-full h-[460px]"
        viewBox="0 0"
        backgroundColor="#192734"
        foregroundColor="#294054"
    >
        <rect x="0" y="0" rx="0" ry="0" className="w-full h-[460px]" />
    </ContentLoader>
)

export default CardSkeleton;

