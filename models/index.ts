import mongoose from 'mongoose';
import { VolunteerSchema } from './volunteer';
import { VolunteerProgramSchema } from './volunteerProgram';

export const VolunteerModel = mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);
export const VolunteerProgramModel = mongoose.models.VolunteerProgram || mongoose.model('VolunteerProgram', VolunteerProgramSchema); 