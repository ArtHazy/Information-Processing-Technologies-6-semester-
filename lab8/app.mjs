import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(cors());

app.listen(3000)
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/obj.xml', (req,res)=>{
    res.sendFile(path.join(__dirname, 'obj.xml'))
})
app.get('/obj.xsl', (req,res)=>{
    res.sendFile(path.join(__dirname, 'obj.xsl'))
})