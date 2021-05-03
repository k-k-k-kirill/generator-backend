import { Document } from 'mongoose';

export default interface Sample extends Document {
    fileKey: string;
    key: string;
    moods: string[];
    genres: string[];
    subgenres: string[];
    bpm: number;
    duration: number;
}