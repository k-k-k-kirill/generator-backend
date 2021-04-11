import Sample from './types';
import mongoose, { Schema } from 'mongoose';

const SampleSchema: Schema = new Schema({
    key: {
        type: String,
        required: true,
    },
    moods: {
        type: [String],
    },
    genres: {
        type: [String],
    },
    subgenres: {
        type: [String],
    },
    bpm: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model<Sample>('Sample', SampleSchema);