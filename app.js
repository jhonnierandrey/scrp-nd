const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');


// index page
app.get('/', (req, res) => {
    res.render('pages/index');
});

app.post('/api', (req, res) => {

    const articles = []

    axios(req.body.weburl)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            $(req.body.classname, html).each(function(){
                const title = $(this).text();
                const web_url = $(this).find('a').attr('href');

                articles.push({
                    title,
                    web_url
                })
            })
            res.send(articles)
        }).catch( err => console.log(err));
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});
  
module.exports = app;