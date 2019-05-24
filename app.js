const db = require('./conn.js');
const prompt = require('prompt-promise');
const newArtist = {};

function getArtists() {
    return db.any(`select * from artist;`)
}

function addArtistDB() {
    return db.any(`insert into artist (artist_name) values ('${newArtist.artist_name}');`)
}

function addArtist() {
    return prompt('Artist Name: ')
    .then(name = val => {
        newArtist['artist_name'] = val;
        console.log(newArtist);
        prompt.done();
        return addArtistDB();
    })
    .catch(rejected = err => {
        console.log('ERROR', err.stack);
        prompt.finish();
    });
}

function main() {
    addArtist()
    .then(()=> {
        getArtists()
            .then(artists => {
                console.log(artists);
                artists.map(artist => {
                    console.log(artist.id, artist.artist_name);
                });
        });
    }
    )
}

main();