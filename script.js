// Global HTML Elements Variables
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

const textArea = document.querySelector('textarea');

const chooseFileBtn = document.querySelector('input[type="file"]');

// Image Variables
const img = new Image();
let pixelArray; // Data to store image's each pixel's r,b,g values

// Image Source assigning
chooseFileBtn.addEventListener('input',()=>img.src = chooseFileBtn.value);