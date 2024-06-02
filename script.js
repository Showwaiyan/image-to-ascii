// Global HTML Elements Variables
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const textArea = document.querySelector('textarea');

const chooseFileBtn = document.querySelector('input[type="file"]');

// Image Variables
const img = new Image();
let pixelArray; // Data to store image's each pixel's r,b,g values

// Ascii Character Values
let asciiImage="";

// Image Source assigning
chooseFileBtn.addEventListener('input',()=>{
    img.src = chooseFileBtn.value;
    img.src = "/img/moon.jpg";
    // Execution Instruction after loading img
    img.onload = function() {
        canvas.height = canvas.width/(img.width/img.height) ;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        pixelArray = ctx.getImageData(0,0,canvas.width,canvas.height).data;
    }
});

// R,G,B color average
function averageRGB(r,g,b) { return Math.trunc((r+g+b)/3)};

// Substitute Character
function substituteAsciiChar(avgRGB) {
    const asciiArray = " _.,-=+:;cba!0123456789$W#@Ñ".split('');
    return asciiArray[Math.ceil(((asciiArray.length-1)*avgRGB)/255)];
}

// Processing Image to Ascii Character
function processImgToAscii() {
    for (let i=0; i<pixelArray.length; i+=4) {
            asciiImage += substituteAsciiChar(averageRGB(pixelArray[i],pixelArray[i+1],pixelArray[i+2]));
    }
    textArea.value = asciiImage;
}