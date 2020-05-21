export class Patient {
    name: string;
    birthdayDate: Date;
    patientNumber: number;
    status: string;
    constacts: {
        phone: number;
        email: string;
    };
    symptoms: string[];
    observations: { 
        saude24: boolean;
        riskGroup: boolean;
        riskZone: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}