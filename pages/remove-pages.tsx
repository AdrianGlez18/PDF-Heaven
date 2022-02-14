import { useState, useEffect, useCallback, ChangeEventHandler } from "react";
import BlockSection from "../components/BlockSection";
import { PDFDocument } from 'pdf-lib'
import { SimpleGrid, VStack, HStack, Heading, useColorMode } from "@chakra-ui/react";
import { PaddedDiv, NumericInput, FileDiv, Format, Label } from "../components/emotionComponents";

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

const generateNewDocument = async (docList: ExtendedDocument[], toDelete: number[]) => {

    const generatedDoc = await PDFDocument.create();
    //const toDelete = [2, 5, 7];
    const docname = docList[0];

    const docresponse = docname.docFile;
    const buf = await docresponse.arrayBuffer();
    const docBytes = new Uint8Array(buf);
    const doc = await PDFDocument.load(docBytes, { ignoreEncryption: true });

    for (let i = 0; i < doc.getPageCount(); i++) {
        if (!toDelete.includes(i + 1)) {
            const page = generatedDoc.addPage(
                [doc.getPage(i).getSize().width,
                doc.getPage(i).getSize().height]
            )
            page.drawPage(await generatedDoc.embedPage(doc.getPages()[i]));
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

function RemovePages() {
    // State for uploaded images
    const [uploadedDocuments, setUploadedDocuments] = useState<ExtendedDocument[]>([]);
    const [toDelete, setToDelete] = useState<number[]>([]);

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
        URL.revokeObjectURL(uploadedDocuments[0].url);
    }, [setUploadedDocuments, uploadedDocuments]);

    const handlegenerateNewDocument = useCallback(() => {
        generateNewDocument(uploadedDocuments, toDelete);
        cleanUpUploadedDocuments();
    }, [uploadedDocuments, cleanUpUploadedDocuments]);

    const handlePagesToDelete = useCallback<
        ChangeEventHandler<HTMLInputElement>
    >((event) => {
        // `event.target.files` is of type `FileList`,
        // we convert it to Array for easier manipulation.
        const rawList = event.target.value;
        const list = rawList ? rawList.split(",") : [];
        list.forEach(n => {
            if (n.includes("-")) {
                const range = n.split("-");
                const start = parseInt(range[0]);
                const end = parseInt(range[1]);
                for (let i = start; i <= end; i++) {
                    toDelete.push(i);
                }
            } else {
                toDelete.push(parseInt(n));
            }
        });
        //const rawArray = rawList ? Array.from(rawList) : [];

        // Uploaded images are read and the app state is updated.
        //const fileToDocPromises = fileArray.map(fileToDocURL);
        //Promise.all(fileToDocPromises).then(setUploadedDocuments);
    },
        [setToDelete]
    );

    const { colorMode } = useColorMode()

    return (
        <PaddedDiv>
            <BlockSection delay={0.2}>

            

                <VStack>
                <Heading as="h2" color={colorMode === "light" ? 'deepBlue' : 'lightBg'} variant={"section-title"} mt={30}> Remove Pages from PDF </Heading>
                    <Label>Pdf document: </Label>
                    <FileDiv>

                        {uploadedDocuments.length > 0 ? (
                            uploadedDocuments[0].docFile.name
                        ) : (
                            <p>Upload a PDF file...</p>
                        )}
                    </FileDiv>
                    <Label htmlFor="name">Pages to delete: </Label>
                    <Format>
                        Some Pages: 1, 2, 3
                    </Format>
                    <Format>
                        Ranges: 1-3, 4-6, 7-9
                    </Format>
                    <Format>
                        Mixed: 1, 3-5, 7
                    </Format>
                    <NumericInput type="text" name="name" onChange={handlePagesToDelete} />
                    <HStack>
                        <div className="buttons-container-i2p">
                            {/* Uploads images */}
                            <label htmlFor="file-input">
                                <span className="button-i2p">Upload a pdf file</span>
                                <input
                                    id="file-input"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleDocumentUpload}
                                    // Native file input is hidden only for styling purposes
                                    style={{ display: "none" }}
                                />
                            </label>

                            {/* Generates PDF */}
                            <button
                                onClick={handlegenerateNewDocument}
                                className="button-i2p"
                                disabled={uploadedDocuments.length === 0}
                            >
                                Generate PDF
                            </button>
                        </div>
                    </HStack>
                </VStack>

                {/* Buttons for uploading images and generating a PDF */}


            </BlockSection>
        </PaddedDiv>
    );
}

export default RemovePages;