import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PDFReader = () => {
  const [pdfContent, setPdfContent] = useState("");

  const extractTextFromPDF = async (file) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        let textContent = "";
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const text = await page.getTextContent();
          text.items.forEach((item) => {
            textContent += item.str + " ";
          });
        }

        setPdfContent(textContent);
      };
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
    }
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      extractTextFromPDF(uploadedFile);
    }
  };

  return (
    <div className="container">
      <h1>PDF Reader</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {pdfContent && (
        <div className="pdf-content">
          <h2>Extracted Content:</h2>
          <pre>{pdfContent}</pre>
        </div>
      )}
    </div>
  );
};

export default PDFReader;
