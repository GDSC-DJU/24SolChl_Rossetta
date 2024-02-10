const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const  cors = require('cors');

dotenv.config();
//1.
const getRouter = require('./routes/getRouter');
const postRouter = require('./routes/postRouter');
const putRouter = require('./routes/putRouter');
const deleteRouter = require('./routes/deleteRouter');
const app = express();

app.set('port',process.env.PORT || 8000);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());

app.use(cors({ origin: 'http://localhost:3000'}));
//2.
app.use('/get',getRouter);
app.use('/delete',putRouter);
app.use('/put',deleteRouter);
app.use('/post',postRouter);


app.use((req,res,next)=>{
    const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    err.status = 404;
    res.json({
        code: err.status,
        massage : "undefined"
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