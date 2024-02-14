const useImageFileNameGet = (allImages) => {


    const imgObj = {
        featuredImgName: "",
        otherImageName: []
    }

    const featuredImg = allImages.filter((img) => img.isFeatured == true);
    if (featuredImg && featuredImg[0]) {
        const fileName = getImgFileName(featuredImg[0].path);
        imgObj.featuredImgName = fileName
    } else {
        imgObj.featuredImgName = ""

    }

    const otherImages = allImages.filter((img) => img.isFeatured == false);

    const otherImagesPath = otherImages.map(img => {
        if (img) {
            const fileName = getImgFileName(img.path);
            return fileName
        }
    });

    imgObj.otherImageName = otherImagesPath;


    return imgObj;
}


const getImgFileName = (imgFilePath) => {
    const filePath = imgFilePath;
    const parts = filePath.split("\\");
    const fileName = parts[parts.length - 1];
    return fileName;
};

export default useImageFileNameGet