"use strict";

/*!
 * migrate
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Set = require('./set')
    , path = require('path')
    , fs = require('fs');

const chalk = require('chalk');

/**
 * Expose the migrate function.
 */

exports = module.exports = migrate;

function migrate(title, up, down, seedFiles) {
    // migration
    if ('string' === typeof title && up && down) {
        migrate.set.addMigration(title, up, down, seedFiles);
        // specify migration file
    } else if ('string' === typeof title) {
        migrate.set = new Set(title);
        // no migration path
    } else if (!migrate.set) {
        throw new Error('must invoke migrate(path) before running migrations');
        // run migrations
    } else {
        return migrate.set;
    }
}

exports.state = function(stateFile) {
    var state = {
        pos: 0,
        migrations: [],
        path: stateFile
    };
    try {
        state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    } catch (e) {
    }
    return state;
};

exports.load = function(stateFile, migrationsDirectory) {

    var set = new Set(stateFile);
    var dir = path.resolve(migrationsDirectory);

    fs.readdirSync(dir).filter(function(file) {
        return file.match(/^\d+.*\.js$/);
    }).sort().forEach(function(file) {
        var mod = require(path.join(dir, file));
        set.addMigration(file, mod.up, mod.down, mod.seedFiles, mod.parent);
    });

    try {
        if (stateFile) {
            fs.accessSync(stateFile, fs.R_OK);
            try {
                var stateFileContents = fs.readFileSync(stateFile, 'utf8');
                set.pos = JSON.parse(stateFileContents).pos;
            } catch (e) {
                console.log(chalk.bgRed('Unable to fetch the current state of the migrations from the stateFile! -> Exiting!'));
                process.exit(1);
            }
        }
    } catch (e) { 
        // the file does not exist yet... no worries
    }   

    return set;
};
