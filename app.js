const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const  cors = require('cors');

dotenv.config();

const memberRouter = require('./routes/memberRouter');
const wechslerRouter = require('./routes/wechslerRouter')
const paintRouter = require('./routes/paintRouter');
const patternRouter = require('./routes/patternRouter');
const pronunciationRouter = require('./routes/pronunciationRouter');
const situationRouter = require('./routes/situationRouter')
const app = express();


app.set('port',process.env.PORT || 8000);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());

app.use(cors({ origin: 'http://localhost:3000'}));

app.use('/wechsler',wechslerRouter);
app.use('/member',memberRouter);
app.use('/paint',paintRouter);
app.use('/pattern',patternRouter);
app.use('/pronunciation',pronunciationRouter);
app.use('/situation',situationRouter);



app.use((req,res,next)=>{
    const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    res.status(404).json({
        code:404,
        massage:'failed Update',
    });

    next(err);
});
app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NOSD_ENV !== 'production' ? err:{};
    
})

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
})