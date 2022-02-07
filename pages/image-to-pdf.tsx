import React, { ChangeEventHandler } from "react";
import BlockSection from "../components/BlockSection";
import jsPDF from "jspdf";

class ExtendedImage {
    public img;
    constructor(public imageFileType: string) {
      this.img = document.createElement("img");
      this.imageFileType= imageFileType;
    }
  
    getImageType(): string {
      return this.imageFileType.split("/")[1];
    }
  }

// Each image is loaded and an object URL is created.
const fileToImageURL = (file: File): Promise<ExtendedImage> => {
  return new Promise((resolve, reject) => {
    const image = new ExtendedImage(file.type);

    image.img.onload = () => {
      resolve(image);
    };

    image.img.onerror = () => {
      reject(new Error("Failed to convert File to Image"));
    };

    image.img.src = URL.createObjectURL(file);
  });
};

// The dimensions are in millimeters.
const A4_PAPER_DIMENSIONS = {
  width: 210,
  height: 297,
};

const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;

interface ImageDimension {
  width: number;
  height: number;
}

// Calculates the best possible position of an image on the A4 paper format,
// so that the maximal area of A4 is used and the image ratio is preserved.
const imageDimensionsOnA4 = (dimensions: ImageDimension) => {
  const isLandscapeImage = dimensions.width >= dimensions.height;

  // If the image is in landscape, the full width of A4 is used.
  if (isLandscapeImage) {
    return {
      width: A4_PAPER_DIMENSIONS.width,
      height:
        A4_PAPER_DIMENSIONS.width / (dimensions.width / dimensions.height),
    };
  }

  // If the image is in portrait and the full height of A4 would skew
  // the image ratio, we scale the image dimensions.
  const imageRatio = dimensions.width / dimensions.height;
  if (imageRatio > A4_PAPER_RATIO) {
    const imageScaleFactor =
      (A4_PAPER_RATIO * dimensions.height) / dimensions.width;

    const scaledImageHeight = A4_PAPER_DIMENSIONS.height * imageScaleFactor;

    return {
      height: scaledImageHeight,
      width: scaledImageHeight * imageRatio,
    };
  }

  // The full height of A4 can be used without skewing the image ratio.
  return {
    width: A4_PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
    height: A4_PAPER_DIMENSIONS.height,
  };
};

// Creates a PDF document containing all the uploaded images.
const generatePdfFromImages = (imageList: ExtendedImage[]) => {
  // Default export is A4 paper, portrait, using millimeters for units.
  const doc = new jsPDF();

  // We let the images add all pages,
  // therefore the first default page can be removed.
  doc.deletePage(1);

  imageList.forEach((image) => {
    const imageDimensions = imageDimensionsOnA4({
      width: image.img.width,
      height: image.img.height,
    });

    doc.addPage();
    doc.addImage(
      image.img.src,
      image.getImageType(),
      // Images are vertically and horizontally centered on the page.
      (A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
      (A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
      imageDimensions.width,
      imageDimensions.height
    );
  });

  const pdfURL = doc.output("bloburl");
  window.open(pdfURL as any, "_blank");
};

function ImagePDF() {
  // State for uploaded images
  const [uploadedImages, setUploadedImages] = React.useState<ExtendedImage[]>([]);

  const handleImageUpload = React.useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      // `event.target.files` is of type `FileList`,
      // we convert it to Array for easier manipulation.
      const fileList = event.target.files;
      const fileArray = fileList ? Array.from(fileList) : [];

      // Uploaded images are read and the app state is updated.
      const fileToImagePromises = fileArray.map(fileToImageURL);
      Promise.all(fileToImagePromises).then(setUploadedImages);
    },
    [setUploadedImages]
  );

  const cleanUpUploadedImages = React.useCallback(() => {
    setUploadedImages([]);
    uploadedImages.forEach((image) => {
      // The URL.revokeObjectURL() releases an existing object URL
      // which was previously created by URL.createObjectURL().
      // It lets the browser know not to keep the reference to the file any longer.
      URL.revokeObjectURL(image.img.src);
    });
  }, [setUploadedImages, uploadedImages]);

  const handleGeneratePdfFromImages = React.useCallback(() => {
    generatePdfFromImages(uploadedImages);
    cleanUpUploadedImages();
  }, [uploadedImages, cleanUpUploadedImages]);

  return (
    <BlockSection delay={0.2}>

      {/* Overview of uploaded images */}
      <div className="images-container-i2p">
        {uploadedImages.length > 0 ? (
          uploadedImages.map((image) => (
            <img key={image.img.src} src={image.img.src} className="uploaded-image-i2p" />
          ))
        ) : (
          <p>Upload some images...</p>
        )}
      </div>

      {/* Buttons for uploading images and generating a PDF */}
      <div className="buttons-container-i2p">
        {/* Uploads images */}
        <label htmlFor="file-input">
          <span className="button-i2p">Upload images</span>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            // Native file input is hidden only for styling purposes
            style={{ display: "none" }}
            multiple
          />
        </label>

        {/* Generates PDF */}
        <button
          onClick={handleGeneratePdfFromImages}
          className="button-i2p"
          disabled={uploadedImages.length === 0}
        >
          Generate PDF
        </button>
      </div>
    </BlockSection>
  );
}

export default ImagePDF;