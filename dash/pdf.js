/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


// intial params
let pdf;
let canvas;
let isPageRendering;
let  pageRenderingQueue = null;
let canvasContext;
let totalPages;
let currentPageNum = 1;

let pdf_bs = sessionStorage.getItem('pdf');
console.log(pdf_bs);

// events
window.addEventListener('load', function () {
    isPageRendering = false;
    pageRenderingQueue = null;
    canvas = document.getElementById('pdf_canvas');
    canvasContext = canvas.getContext('2d');
    //console.log(pdf_bs);
    //base64toPDF(pdf_bs);

    initEvents();
    initPDFRenderer();
});

function initEvents() {
    let prevPageBtn = document.getElementById('prev_page');
    let nextPageBtn = document.getElementById('next_page');
    let goToPage = document.getElementById('go_to_page');
    prevPageBtn.addEventListener('click', renderPreviousPage);
    nextPageBtn.addEventListener('click', renderNextPage);
    goToPage.addEventListener('click', goToPageNum);
}

// init when window is loaded
function initPDFRenderer() {

    //var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';

    var bufferArray = base64ToArrayBuffer(pdf_bs);
    var blobStore = new Blob([bufferArray], {type: "application/pdf"});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobStore);
        return;
    }

    var data = window.URL.createObjectURL(blobStore);
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.href = data;
    console.log(link);

    const url = link; // replace with your pdf location

    let option = {url};


    pdfjsLib.getDocument(option).promise.then(pdfData => {
        totalPages = pdfData.numPages;
        let pagesCounter = document.getElementById('total_page_num');
        pagesCounter.textContent = totalPages;
        // assigning read pdfContent to global variable
        pdf = pdfData;
        renderPage(currentPageNum);
    });
}

function renderPage(pageNumToRender = 1, scale = 1) {
    isPageRendering = true;
    document.getElementById('current_page_num').textContent = pageNumToRender;
    pdf.getPage(pageNumToRender).then(page => {
        document.getElementById("loader").style.display = "none";
        const viewport = page.getViewport({scale: 1});
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        let renderCtx = {canvasContext, viewport};
        page.render(renderCtx).promise.then(() => {
            isPageRendering = false;
            if (pageRenderingQueue !== null) { // this is to check of there is next page to be rendered in the queue
                renderPage(pageNumToRender);
                pageRenderingQueue = null;
            }
        });
    });
}

function renderPageQueue(pageNum) {
    if (pageRenderingQueue != null) {
        pageRenderingQueue = pageNum;
    } else {
        renderPage(pageNum);
    }
}

function renderNextPage(ev) {
    if (currentPageNum >= totalPages) {
        alert("This is the last page");
        return;
    }
    currentPageNum++;
    renderPageQueue(currentPageNum);
}

function renderPreviousPage(ev) {
    if (currentPageNum <= 1) {
        alert("This is the first page");
        return;
    }
    currentPageNum--;
    renderPageQueue(currentPageNum);
}

function goToPageNum(ev) {
    let numberInput = document.getElementById('page_num');
    let pageNumber = parseInt(numberInput.value);
    if (pageNumber) {
        if (pageNumber <= totalPages && pageNumber >= 1) {
            currentPageNum = pageNumber;
            numberInput.value = "";
            renderPageQueue(pageNumber);
            return;
        }
    }
    alert("Enter a valide page numer");
}