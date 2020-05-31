import { Role } from './role.model';
export class User {
	_id?: string;
	name: string;
	email: string;
	role: Role;
	password?: string;
}