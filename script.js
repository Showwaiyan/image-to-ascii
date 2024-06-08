// Global HTML Elements Variables
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const textArea = document.querySelector('textarea');

const chooseFileBtn = document.querySelector('input[type="file"]');

// size radio input
const sizeEle = document.querySelector('#size');

// Click button
const clickBtn = document.querySelector('button');

// Download button
const downloadBtn = document.querySelector('a');

// Image Variables
const img = new Image();
let pixelArray; // Data to store image's each pixel's r,b,g values

// Ascii Character Values
let asciiImage="";

// Image Source assigning
chooseFileBtn.addEventListener('input',()=>{
    img.src = chooseFileBtn.value;
    // Execution Instruction after loading img
    img.onload = function() {
        canvas.width = 1080;
        canvas.height = canvas.width/(img.width/img.height) ;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        pixelArray = ctx.getImageData(0,0,canvas.width,canvas.height).data;
    }
});

// R,G,B color average
function averageRGB(r,g,b) { return Math.trunc((r+g+b)/3)};

// Substitute Character
function substituteAsciiChar(avgRGB) {
    const asciiArray = " _.,-=+:;cba!0123456789$W#@Ñ".split('').reverse();
    return asciiArray[Math.ceil(((asciiArray.length-1)*avgRGB)/255)];
}

// Processing Image to Ascii Character
function processImgToAscii() {
    // Clearing canvas to display ASCII result
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white"; 

    // Size for resolution
    const size = Number(sizeEle.value);

    for (let y=0; y<canvas.height; y+=size){
        for (let x=0; x<canvas.width; x+=size) {
            // Finding index and getting RGB value
            const index = (y*canvas.width+x)*4;
            const r = pixelArray[index];
            const g = pixelArray[index+1];
            const b = pixelArray[index+2];

            // Getting Ascii value
            const asciiChar = substituteAsciiChar(averageRGB(r,g,b));

            // Fill text on canvas
            ctx.font = `${size}px Courier`;
            ctx.fillText(asciiChar,x,y);
        }
    }
}

function download(){
    downloadBtn.href = canvas.toDataURL("image/jpg",0.7);
    downloadBtn.download = "ascii-photo.jpg";
}

// Click button to process
clickBtn.addEventListener('click',processImgToAscii);

// Size change process
sizeEle.addEventListener('input',processImgToAscii);