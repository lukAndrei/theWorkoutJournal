import { AppUser } from './appUser.model';

export interface WorkoutComment {
    comment: string,
    user: AppUser,
    id: string,
    timestamp: Date,
    replies: WorkoutComment[],

}