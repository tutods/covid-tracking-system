import { Patient } from './patient.model';

export class CovidTest {
    _id?: string;
    code?: string;
    patient: any;
    notes?: string;
    status?: string;
    result?: string;
    date: Date;
    pathFile?: string;
};