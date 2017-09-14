"use strict";

/*!
 * migrate - Migration
 * Copyright (c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Expose `Migration`.
 */

module.exports = Migration;

function Migration(title, up, down, seedFiles, parent) {
    this.title = title;
    this.up = up;
    this.down = down;
    this.seedFiles = seedFiles;
    this.parent = parent;
}