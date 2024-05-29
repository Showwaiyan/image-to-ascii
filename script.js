// Global HTML Elements Variables
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const textArea = document.querySelector('textarea');

const chooseFileBtn = document.querySelector('input[type="file"]');

// Image Variables
const img = new Image();
let pixelArray; // Data to store image's each pixel's r,b,g values

// Image Source assigning
chooseFileBtn.addEventListener('input',()=>{
    img.src = chooseFileBtn.value;
    // Execution Instruction after loading img
    img.onload = function() {
        canvas.height = canvas.width/(img.width/img.height) ;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        pixelArray = ctx.getImageData(0,0,canvas.width,canvas.height).data;
    }
});

// R,G,B color average
function averageRGB(r,g,b) { return Math.trunc((r+g+b)/3)};