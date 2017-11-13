"use strict";

/*!
 * migrate - Migration
 * Copyright (c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */
var _ = require('lodash');
/**
 * Expose `Migration`.
 */

module.exports = Migration;

function Migration(title, up, down, seedFiles, parent, processed) {
    this.title = title;
    this.up = up;
    this.down = down;
    this.seedFiles = seedFiles;
    this.parent = parent;
    if (!_.isUndefined(processed)) {
        this.processed = processed;
    }
}