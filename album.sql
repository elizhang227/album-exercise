drop table artist;
drop table track;

create table artist 
(
    id serial, 
    artist_name text,
    primary key (id)
);

insert into artist 
    (artist_name) 
values 
    ('Michael Jackson'),
    ('Pink Sweats'),
    ('Rick James'),
    ('Prince');


create table track
(
    id serial,
    track_name text,
    primary key (id)
);

insert into track
    (track_name)
values
    ('Test Track');