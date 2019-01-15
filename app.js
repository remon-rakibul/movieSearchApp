let express = require('express');
let app = express();
let request = require('request');
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('search');
});

app.get('/results', (req, res) => {
    let query = req.query.search;
    let url = 'http://www.omdbapi.com/?apikey=11bec50f&s=' + query;
    request(url, (error, response, body) => {
        if (JSON.parse(body).Response === 'False') {
            res.render('notFound', {query: query})
        }
        else if (!error && response.statusCode === 200) {
            let data = JSON.parse(body);
            res.render('results', {data: data, query: query});
        }
    });
});

app.listen(3000, () => {
    console.log('server has started');
});