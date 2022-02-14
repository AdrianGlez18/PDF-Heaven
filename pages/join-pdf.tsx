import { useState, useEffect, useCallback, ChangeEventHandler } from "react";
import BlockSection from "../components/BlockSection";
import { PDFDocument } from 'pdf-lib'
import { VStack, HStack, Heading, useColorMode } from "@chakra-ui/react";
import { PaddedDiv, FilesDiv } from "../components/emotionComponents";

class ExtendedDocument {
    public docFileType: string;
    public url: string;
    constructor(public docFile: File) {
        this.docFile = docFile;
        this.docFileType = docFile.type;
        this.url = URL.createObjectURL(docFile);
    }

    getImageType(): string {
        return this.docFileType.split("/")[1];
    }
}

const fileToDocURL = (file: File): Promise<ExtendedDocument> => {
    return new Promise((resolve, reject) => {
        const doc = new ExtendedDocument(file);

        resolve(doc);

    });
};

const generatePdfFromDocuments = async (docList: ExtendedDocument[]) => {

    const generatedDoc = await PDFDocument.create()

    for (const docname of docList) {
        console.log(docname.url)

        const docresponse = docname.docFile;
        const buf = await docresponse.arrayBuffer();
        const docBytes = new Uint8Array(buf);
        const doc = await PDFDocument.load(docBytes, { ignoreEncryption: true });

        for (let i = 0; i < doc.getPageCount(); i++) {
            const page = generatedDoc.addPage(
                [doc.getPage(i).getSize().width,
                doc.getPage(i).getSize().height]
            )
            page.drawPage(await generatedDoc.embedPage(doc.getPages()[i]))

        }

    }
    const pdfDoc = await generatedDoc.save();

    //Download the PDF
    const blob = new Blob([pdfDoc], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'pdfHeaven.pdf');
    document.body.appendChild(link);
    link.click();
};

function JoinPdfs() {
    // State for uploaded images
    const [uploadedDocuments, setUploadedDocuments] = useState<ExtendedDocument[]>([]);

    const handleDocumentUpload = useCallback<
        ChangeEventHandler<HTMLInputElement>
    >(
        (event) => {
            // `event.target.files` is of type `FileList`,
            // we convert it to Array for easier manipulation.
            const fileList = event.target.files;
            const fileArray = fileList ? Array.from(fileList) : [];

            // Uploaded images are read and the app state is updated.
            const fileToDocPromises = fileArray.map(fileToDocURL);
            Promise.all(fileToDocPromises).then(setUploadedDocuments);
        },
        [setUploadedDocuments]
    );

    const cleanUpUploadedDocuments = useCallback(() => {
        setUploadedDocuments([]);
        uploadedDocuments.forEach((doc) => {
            // The URL.revokeObjectURL() releases an existing object URL
            // which was previously created by URL.createObjectURL().
            // It lets the browser know not to keep the reference to the file any longer.
            URL.revokeObjectURL(doc.url);
        });
    }, [setUploadedDocuments, uploadedDocuments]);

    const handleGeneratePdfFromDocuments = useCallback(() => {
        generatePdfFromDocuments(uploadedDocuments);
        cleanUpUploadedDocuments();
    }, [uploadedDocuments, cleanUpUploadedDocuments]);

    const { colorMode } = useColorMode()
    return (
        <PaddedDiv>
            <BlockSection delay={0.2}>
                <VStack>
                    <Heading as="h2" color={colorMode === "light" ? 'deepBlue' : 'lightBg'} variant={"section-title"} mb={5}> Join PDF files </Heading>
                    <FilesDiv>
                        {uploadedDocuments.length > 0 ? (
                            uploadedDocuments.map((doc) => (
                                <img key={doc.url} src={doc.url} className="uploaded-image-i2p" />
                            ))
                        ) : (
                            <p>Your pdfs will be here!</p>
                        )}
                    </FilesDiv>

                    {/* Buttons for uploading images and generating a PDF */}
                    <div className="buttons-container-i2p">
                        {/* Uploads images */}
                        <label htmlFor="file-input">
                            <span className="button-i2p">Upload pdf files</span>
                            <input
                                id="file-input"
                                type="file"
                                accept="application/pdf"
                                onChange={handleDocumentUpload}
                                // Native file input is hidden only for styling purposes
                                style={{ display: "none" }}
                                multiple
                            />
                        </label>

                        {/* Generates PDF */}
                        <button
                            onClick={handleGeneratePdfFromDocuments}
                            className="button-i2p"
                            disabled={uploadedDocuments.length === 0}
                        >
                            Generate PDF
                        </button>
                    </div>
                </VStack>
            </BlockSection>
        </PaddedDiv>

    );
}

export default JoinPdfs;