const { response } = require('express');
const express = require('express');

const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
    console.log('Estoy escuchando por el puerto 3000');});

    app.get('/', function(req, res) {
        res.send('holi')
    });

app.get('/movies', (req, res) => {
    fs.readFile('movies.json', 'utf8', (err, data) => {
        if (err){
console.log("No se puede leer el archivo",err);
return;
        }
        const movies = JSON.parse(data);
        return res.json(movies);
        });
});

app.post('/movies', (req, res) => {

    fs.readFile('movies.json', 'utf8', (err, data) => {
        if (err){
            console.log("No se puede leer el archivo",err);
        }

const movies = JSON.parse(data);

const newMovieID = movies.length + 1;

req.body.id = newMovieID;

movies.push(req.body);

const newMovie = JSON.stringify(movies,null,3);

fs.writeFile('movies.json', newMovie, (err) =>
    {

    if (err){
        console.log("No se puede leer el archivo", err );
    }

    return res.status(200).send("new movie added");
    })

    })

});

app.patch('/movies/:id', (req, res) => {
    const mid = req.params.id;
    const { name,description,year} = req.body;

    fs.readFile('movies.json', 'utf8', (err, data) => {
if (err) {
    console.log("No se puede leer el fichero",err);
}

const movies = JSON.parse(data);

movies.forEach(movie => {

    if (movie.id === Number(mid)) {

if (name != undefined) {
    movie.name = name;
}

if (description != undefined) {
    movie.description = description;

    }

if (year != undefined) {
    movie.year = year;

    }

    const movieUpdated = JSON.stringify(movies,null,3);

fs.writeFile('movies.json', movieUpdated, (err) => {
    if (err) {
        console.log("ha ocurrido un error al escribir",err);
    }
        return res.status(200).send("movie updated");

})
    }
});
})
})

app.delete('/movie:id', (req, res) => {
    const mid = req.params.id;
    fs.readFile('movies.json', 'utf8', (err, data) => {
        if (err) {
            console.log("Ha ocurrido un error al leer el fichero",err);
        }

        const movies = JSON.parse(data);
        movies.forEach(movie => {
            if (movie.id === Number(mid)) {

                movies.splice(movies.indexOf(movie), 1);

                const movieDeleted = JSON.stringify(movies, null, 3)

                fs.writeFile('movies.json', movieDeleted, (err) => {
                    if (err) {
                        console.log("ha ocurrido un error al escribir",err);
                    }
                        return res.status(200).send("movie deleted");

                    })
                }
            })
        })
    })