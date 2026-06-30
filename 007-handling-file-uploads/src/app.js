import express from 'express';
import morgan from 'morgan';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const fn = `${Date.now()}-${file.originalname}`;
        cb(null, fn);
    }
})

const upload = multer({ storage: storage });

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.put("/upload", upload.single('saphire'), (req, res) => {
    console.log(req)
})

export default app;