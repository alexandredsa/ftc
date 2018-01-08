const parse = require('csv-parse');
const fs = require('fs-extra');

const PlayerModel = require('../models/Player');
const ClubModel = require('../models/Club');
const NationalityModel = require('../models/Nationality');
const _ = require('underscore');
module.exports = (req, res, next) => {
    function Player(Name, Overall, Club, Club_Logo, Photo, Preferred_Positions, Nationality, Flag) {
        this.Name = Name;
        this.Overall = Overall;
        this.Club = Club;
        this.Club_Logo = Club_Logo;
        this.Photo = Photo;
        this.Preferred_Positions = Preferred_Positions;
        this.Nationality = Nationality;
        this.Flag = Flag;
    };
    const Players = [];
    const csvFilePath = 'players.csv';
    const csv = require('csvtojson');
    let promises = [];
    csv()
        .fromFile(csvFilePath)
        .on('json', (player) => {
            let playerInstance = new Player(player['Name'], player['Overall'], player['Club'], player['Club Logo'], player['Photo'], player['Preferred Positions'], player['Nationality'], player['Flag'])
            Players.push(playerInstance);
        })
        .on('done', (error) => {
            //_.uniq(Players, (player) => player.Club).map(player => saveClub(player));
            //_.uniq(Players, (player) => player.Nationality).map(player => saveNationality(player));
            //Players.forEach(player => save(player));

            res.json(200, { status: 'ok' });
            next();
        });

    async function saveClub(playerInstance) {
        club = await new ClubModel({ name: playerInstance.Club, logo_url: playerInstance.Club_Logo }).save();
    }

    async function saveNationality(playerInstance) {
        nationality = await new NationalityModel({ name: playerInstance.Nationality, flag_url: playerInstance.Flag }).save();
    }

    async function save(playerInstance) {
        let club = await ClubModel.findOne({ name: playerInstance.Club });
        let nationality = await NationalityModel.findOne({ name: playerInstance.Nationality });

        let player = new PlayerModel({
            nationality: nationality._id,
            club: club._id,
            name: playerInstance.Name,
            rating: playerInstance.Overall,
            photo_url: playerInstance.Photo,
            position: playerInstance.Preferred_Positions.split(" ").shift()
        }).save();

        return player;
    }
};