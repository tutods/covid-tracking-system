export function validateRoles(userRole: string, roles: string[]) {
	const userRoleLower = userRole.toLowerCase()
	const rolesLower = roles.map((role) => { return role.toLowerCase() })

	let have
	have = roles.some((role) => {
		return userRole.includes(role)
	})

	if (!have) {
		have = rolesLower.some((roleLower) => {
			return userRoleLower.includes(roleLower)
		})
	}


	return have
}