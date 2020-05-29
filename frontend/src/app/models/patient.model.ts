export class Patient {
	_id?: string;
	name: string;
	birthdayDate: Date;
	patientNumber: number;
	status: string;
	contacts: {
		phone: number;
		email: string;
	};
	symptoms: string[];
	observations: {
		saude24?: boolean;
		riskGroup?: boolean;
		riskZone?: boolean;
	};
}