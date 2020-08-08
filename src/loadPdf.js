import pdfjsLib from "pdfjs-dist";
import workerEntry from "../node_modules/pdfjs-dist/build/pdf.worker.entry";

// Setting worker path to worker bundle.
pdfjsLib.GlobalWorkerOptions.workerSrc = workerEntry;

const loadPdf = pdfPath => {
  // Loading a document.
  const loadingTask = pdfjsLib.getDocument(pdfPath);

  loadingTask.promise
    .then(function(pdfDocument) {
      // Request a first page
      return pdfDocument.getPage(1).then(function(pdfPage) {
        // Display page on the existing canvas with 100% scale.
        var viewport = pdfPage.getViewport({ scale: 2.0 });
        var canvas = document.getElementById("theCanvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        var ctx = canvas.getContext("2d");
        var renderTask = pdfPage.render({
          canvasContext: ctx,
          viewport: viewport
        });
        return renderTask.promise;
      });
    })
    .catch(function(reason) {
      console.error("Error: " + reason);
    });
};

export default loadPdf;
