import { NextPage } from "next/types";

import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";

const Home: NextPage = () => {
    return (
        <>
            <Hero />
            <Reviews />
        </>
    )
};

export default Home;