import { useEffect, useState } from "react";
import { NextPage } from "next/types";
import { useQuery } from '@tanstack/react-query'

import BaseLayout from "layouts/BaseLayout";
import { IProduct } from "@/mongo/models/Product";


const Home: NextPage = () => {
    return (
        <h1>Home</h1>
    )
};

export default Home;