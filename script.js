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

// Substitute Character
function substituteAsciiChar(avgRGB) {
    if (256<avgRGB<=246) return 'Ñ';
    else if (246<avgRGB<=237) return '@';
    else if (237<avgRGB<=228) return '#';
    else if (228<avgRGB<=219) return 'W';
    else if (219<avgRGB<=210) return '$';
    else if (210<avgRGB<=201) return '9';
    else if (201<avgRGB<=192) return '8';
    else if (192<avgRGB<=183) return '7';
    else if (183<avgRGB<=174) return '6';
    else if (174<avgRGB<=165) return '5';
    else if (165<avgRGB<=156) return '4';
    else if (156<avgRGB<=147) return '3';
    else if (147<avgRGB<=138) return '2';
    else if (138<avgRGB<=129) return '1';
    else if (129<avgRGB<=120) return '0';
    else if (120<avgRGB<=111) return '?';
    else if (111<avgRGB<=102) return '!';
    else if (102<avgRGB<=93) return 'a';
    else if (93<avgRGB<=84) return 'b';
    else if (84<avgRGB<=75) return 'c';
    else if (75<avgRGB<=66) return ';';
    else if (66<avgRGB<=57) return ':';
    else if (57<avgRGB<=48) return '+';
    else if (48<avgRGB<=39) return '=';
    else if (39<avgRGB<=30) return '-';
    else if (30<avgRGB<=21) return ',';
    else if (21<avgRGB<=12) return '.';
    else if (12<avgRGB<=0) return '_';
}

// Processing Image to Ascii Character
function processImgToAscii(pixelData) {
    let asciiChar = "";
    for (let i=0; i<=pixelData.length; i+=4) {
        for (let j=0; j<=canvas.width; j++) {
            asciiChar += substituteAsciiChar(averageRGB(pixelData[i],pixelData[i+1],pixelData[i+2]));
        }
        asciiChar += "\n";
    }
    return asciiChar;
}