import express from 'express';
import multer from 'multer';
import path from 'path';
import { spawn } from 'child_process';
import cv from 'opencv4nodejs';
import Design from '../models/designModel.js';
import Product from '../models/productModel.js';

const designRouter = express.Router();

// Multer config for file upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const filetypes = /jpg|jpeg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Files must be images or PDFs');
    }
  }
});

// @desc    Upload file to canvas
// @route   POST /api/design/upload
// @access  Public
designRouter.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).send({
    message: 'File uploaded successfully',
    filePath: `/${req.file.path}`
  });
});

// @desc    Create a design with optional measures
// @route   POST /api/design
// @access  Public
designRouter.post('/', async (req, res) => {
  const { city, country, typeOfProperty, floorNumber, directionOfVentilation, numberOfRooms, roomArea, file } = req.body;

  const design = new Design({
    city,
    country,
    typeOfProperty,
    floorNumber,
    directionOfVentilation,
    numberOfRooms,
    roomArea,
    file
  });

  const createdDesign = await design.save();
  res.status(201).json(createdDesign);
});

// @desc    Recognize rooms by colors
// @route   POST /api/design/recognize-rooms
// @access  Public
designRouter.post('/recognize-rooms', (req, res) => {
  const { filePath } = req.body;

  const process = spawn('node', ['path/to/recognizeRooms.js', filePath]);

  process.stdout.on('data', (data) => {
    res.status(200).json({ message: data.toString() });
  });

  process.stderr.on('data', (data) => {
    res.status(400).json({ error: data.toString() });
  });
});

// @desc    Calculate BTU for rooms
// @route   POST /api/design/calculate-btu
// @access  Public
designRouter.post('/calculate-btu', (req, res) => {
  const { roomArea, zoneDescription } = req.body;

  const btuTab = {
    bedroom: 850,
    'Living room + Windows': 1000,
    'Living room': 1000,
    'Kitchen': 1000,
    'Basement': 700,
    'Open space': 1100,
    'office': 900,
    'Meeting room': 1000
  };

  const btuPerM2 = btuTab[zoneDescription];
  const totalBTU = roomArea * btuPerM2;

  res.status(200).json({ totalBTU });
});

// @desc    Select relevant air conditioner
// @route   POST /api/design/select-ac
// @access  Public
designRouter.post('/select-ac', async (req, res) => {
  const { totalBTU } = req.body;

  try {
    const suitableAC = await Product.findOne({ btu: { $gte: totalBTU } }).sort({ btu: 1 });

    if (suitableAC) {
      res.status(200).json(suitableAC);
    } else {
      res.status(404).json({ message: 'No suitable air conditioner found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default designRouter;

// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { spawn } from 'child_process';
// import Design from '../models/designModel.js';
// import Product from '../models/productModel.js';

// const designRouter = express.Router();

// // Multer config for file upload
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// const upload = multer({
//   storage,
//   fileFilter(req, file, cb) {
//     const filetypes = /jpg|jpeg|png|pdf/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb('Files must be images or PDFs');
//     }
//   }
// });

// // @desc    Upload file to canvas
// // @route   POST /api/design/upload
// // @access  Public
// designRouter.post('/upload', upload.single('file'), (req, res) => {
//   res.status(200).send({
//     message: 'File uploaded successfully',
//     filePath: `/${req.file.path}`
//   });
// });

// // @desc    Create a design with optional measures
// // @route   POST /api/design
// // @access  Public
// designRouter.post('/', async (req, res) => {
//   const { city, country, typeOfProperty, floorNumber, directionOfVentilation, numberOfRooms, roomArea, file } = req.body;

//   const design = new Design({
//     city,
//     country,
//     typeOfProperty,
//     floorNumber,
//     directionOfVentilation,
//     numberOfRooms,
//     roomArea,
//     file
//   });

//   const createdDesign = await design.save();
//   res.status(201).json(createdDesign);
// });

// // @desc    Recognize rooms by colors
// // @route   POST /api/design/recognize-rooms
// // @access  Public
// designRouter.post('/recognize-rooms', (req, res) => {
//   const { filePath } = req.body;

//   const process = spawn('python', ['path/to/recognize_rooms.py', filePath]);

//   process.stdout.on('data', (data) => {
//     res.status(200).json({ message: data.toString() });
//   });

//   process.stderr.on('data', (data) => {
//     res.status(400).json({ error: data.toString() });
//   });
// });

// // @desc    Calculate BTU for rooms
// // @route   POST /api/design/calculate-btu
// // @access  Public
// designRouter.post('/calculate-btu', (req, res) => {
//   const { roomArea, zoneDescription } = req.body;

//   const btuTab = {
//     bedroom: 850,
//     'Living room + Windows': 1000,
//     'Living room': 1000,
//     'Kitchen': 1000,
//     'Basement': 700,
//     'Open space': 1100,
//     'office': 900,
//     'Meeting room': 1000
//   };

//   const btuPerM2 = btuTab[zoneDescription];
//   const totalBTU = roomArea * btuPerM2;

//   res.status(200).json({ totalBTU });
// });

// // @desc    Select relevant air conditioner
// // @route   POST /api/design/select-ac
// // @access  Public
// designRouter.post('/select-ac', async (req, res) => {
//   const { totalBTU } = req.body;

//   try {
//     const suitableAC = await Product.findOne({ btu: { $gte: totalBTU } }).sort({ btu: 1 });

//     if (suitableAC) {
//       res.status(200).json(suitableAC);
//     } else {
//       res.status(404).json({ message: 'No suitable air conditioner found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default designRouter;

