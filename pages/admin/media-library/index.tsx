import { ImageSelector } from "@/components/Forms";
import { IImage } from "util/aws";

const MediaLibrary = () => {

    const handleClick = (img: IImage) => {
        console.log('clicked')
    };

    return (
        <ImageSelector onClick={handleClick} onClickTitle="View Image" title="Media Library" showTitle />
    );
};

export default MediaLibrary;