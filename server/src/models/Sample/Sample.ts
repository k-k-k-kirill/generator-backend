import Sample from './types';
import mongoose, { Schema } from 'mongoose';

const TagSchema: Schema = new Schema({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});

const GenreSchema: Schema = new Schema({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    subgenres: {
        type: [TagSchema],
        required: false,
    }
});

const SampleSchema: Schema = new Schema({
    fileKey: {
        type: String,
        required: true,
    },
    key: {
        type: TagSchema,
        required: true,
    },
    moods: {
        type: [TagSchema],
        required: false,
    },
    genres: {
        type: [GenreSchema],
        required: false,
    },
    artists: {
        type: [TagSchema],
        required: false,
    },
    trackType: {
        type: TagSchema,
        required: true,
    },
    bpm: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model<Sample>('Sample', SampleSchema);