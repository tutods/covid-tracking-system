export function validateRoles(userRole: string, roles: string[]) {
	const userRoleLower = userRole.toLowerCase()
	const rolesLower = roles.map((role) => { return role.toLowerCase() })

	let have = rolesLower.some((roleLower) => {
		return userRoleLower.includes(roleLower)
	})

	return have
}