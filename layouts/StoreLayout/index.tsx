import { useSelector } from "react-redux";

import Header from "../BaseLayout/Header";
import OurProcess from "./OurProcess";
import Footer from "./Footer";
import { ContactModal, UserModal } from "@/components/Modals";
import Loader from "@/components/Loader";

const StoreLayout = ({ children }: any) => {
    const loading = useSelector((store: any) => store.site.loading);

    return (
        <>
            <Loader loading={loading} variant="bars" />
            <Header />
            <main>
                {children}
                <OurProcess />
            </main>
            <Footer />
            <ContactModal />
            <UserModal />
        </>
    )
};

export default StoreLayout;