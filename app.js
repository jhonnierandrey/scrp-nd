const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const PORT = 3000

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));