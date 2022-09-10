import { NextPage } from "next/types";

import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";

const Home: NextPage = () => {
    return (
        <>
            <Hero />
            <Testimonials />
        </>
    )
};

export default Home;