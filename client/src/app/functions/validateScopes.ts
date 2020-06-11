export function validateScopes(userScopes: string[], scopes: string[]) {
	const have = scopes.some((accessScope) => {
		return userScopes.includes(accessScope);
	});
	return have
}