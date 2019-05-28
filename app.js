const db = require('./conn.js');
const prompt = require('prompt-promise');
const newArtist = {};
const newTrack = {};

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
            printTrack()
        })  
    })
}

function printTrack() {
    addTrack()
    .then(()=> {
        getTracks()
        .then(tracks => {
            console.log(tracks);
            tracks.map(track => {
                console.log(track.track_name);
                })
            })   
        })
}

function getTracks() {
    return db.any(`select * from track;`)
}

function addTrackDB() {
    return db.any(`insert into track (track_name) values ('${newTrack.track_name}');`)
}

function addTrack() {
    return prompt('Track Name: ')
    .then(track = val => {
        newTrack['track_name'] = val;
        console.log(newTrack);
        prompt.done();
        return addTrackDB();
    })
    .catch(rejected = err => {
        console.log('ERROR', err.stack);
        prompt.finish();
    });
}

// async function second() {
//     await main()
//     console.log('this is a test for second funciton');
//     addTrack()
// }

// second()
// .then(()=> {
//     getTracks()
//         .then(tracks => {
//             console.log(tracks);
//             tracks.map(track => {
//                 console.log(track.track_name);
//             });
//         });
//         addTrack()
// });

main();