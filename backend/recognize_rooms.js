// import cv  from 'opencv4nodejs';
// import fs from'fs';

// function recognizeRooms(imagePath) {
//     // Load the image
//     const image = cv.imread(imagePath);
//     if (image.empty) {
//         console.log("Error: Unable to load image.");
//         return;
//     }

//     // Convert the image to HSV color space for easier color detection
//     const hsvImage = image.cvtColor(cv.COLOR_BGR2HSV);

//     // Define color ranges (example: blue, green, red, etc.)
//     const colorRanges = {
//         "Bedroom": { lower: [100, 150, 0], upper: [140, 255, 255] },       // Example: blue color range
//         "Living_room": { lower: [40, 50, 50], upper: [80, 255, 255] },     // Example: green color range
//         "Kitchen": { lower: [0, 100, 100], upper: [10, 255, 255] }, 
//         "Basement": { lower: [0, 100, 100], upper: [10, 255, 255] }, 
//         "Open_space": { lower: [0, 100, 100], upper: [10, 255, 255] }, 
//         "Office": { lower: [0, 100, 100], upper: [10, 255, 255] }, 
//         "Meeting_room": { lower: [0, 100, 100], upper: [10, 255, 255] }
//         // Add more color ranges for different rooms
//     };

//     // Initialize an object to store room areas
//     const roomAreas = {};

//     for (const room in colorRanges) {
//         const lowerBound = new cv.Mat(colorRanges[room].lower, cv.CV_8U);
//         const upperBound = new cv.Mat(colorRanges[room].upper, cv.CV_8U);

//         // Find the colors within the specified boundaries and apply the mask
//         const mask = hsvImage.inRange(lowerBound, upperBound);
//         roomAreas[room] = mask.countNonZero();
//     }

//     // Print out the recognized room areas
//     for (const room in roomAreas) {
//         console.log(`${room}: ${roomAreas[room]} pixels`);
//     }
// }

// // Check if the script is run directly
// if (process.argv.length !== 3) {
//     console.log("Usage: node recognizeRooms.js <image_path>");
// } else {
//     recognizeRooms(process.argv[2]);
// }
// export default recognizeRooms;