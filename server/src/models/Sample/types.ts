import { Document } from 'mongoose';

export default interface Sample extends Document {
    key: string;
    moods: string[];
    genres: string[];
    subgenres: string[];
    bpm: number;
}