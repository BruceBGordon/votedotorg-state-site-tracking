const { Schema } = require('mongoose');

module.exports = new Schema({
    type: String,   // html or pdf
    state: String,    // state CA, NV
    category: String,   // AbsenteeInfo, EarlyVote
    url: String,
    hash: String,
    pdfs: [new Schema({ url: String, hash: String })],    // could have multiple pdf links on page
    content: String,
    disableScrape: { type: Boolean, default: false },  // default enabled for all
    lastChangeDate: Date,
    lastRunJobId: Schema.ObjectId
});
