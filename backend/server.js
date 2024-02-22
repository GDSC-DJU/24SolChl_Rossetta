const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const  cors = require('cors');
const bodyParser = require('body-parser');


dotenv.config();

const memberRouter = require('./routes/memberRouter');
const wechslerRouter = require('./routes/wechslerRouter')
const paintRouter = require('./routes/paintRouter');
const patternRouter = require('./routes/patternRouter');
const pronunciationRouter = require('./routes/pronunciationRouter');
const situationRouter = require('./routes/situationRouter')

const app = express();




app.set('port',process.env.PORT || 8000);

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(__dirname + '/img'));


// 구동방식 변경 http://35.208.138.116:8000 GCP 외부 주소 접속 / localhost:3000 로컬 상 구동
app.use(cors());

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
        massage:'Not Found',
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