import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Studio from "./sections/Studio";
import TrustedBy from "./sections/TrustedBy";
import Works from "./sections/Works";

export default function Home() {
    return (
        <div className="bg-[#000000] w-full min-h-screen overflow-x-hidden">
            <Hero />
            <TrustedBy />
            <Works /> 
            <Studio />           
            <Contact />
        </div>
    )
}