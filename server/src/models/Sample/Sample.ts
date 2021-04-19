import Sample from './types';
import mongoose, { Schema } from 'mongoose';

const SampleSchema: Schema = new Schema({
    fileKey: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    moods: {
        type: [{
            label: String,
            value: String,
        }],
    },
    genres: {
        type: [{
            label: String,
            value: String,
            subgenres: [
                {
                    label: String,
                    value: String,
                }
            ]
        }],
    },
    artists: {
        type: [{
            label: String,
            value: String,
        }],
    },
    trackType: {
        type: String,
        required: true,
    },
    bpm: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model<Sample>('Sample', SampleSchema);