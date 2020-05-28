export class Patient {
    name: string;
    birthdayDate: Date;
    patientNumber: number;
    _id: string;
    status: string;
    contacts: {
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