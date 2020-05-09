module.exports = (req, _, next) => {
    const filters = {}
	for (const name in req.query) {
		if (name !== 'sort' && name !== 'page' && req.query.hasOwnProperty(name)) {
            const filterValue = req.query[name]
            console.log(filterValue)
			if (filterValue.indexOf(',') >= 0) {
				const [min, max] = filterValue.split(',')
				filters[name] = {
					$gte: min && min.length ? parseFloat(min): undefined,
					$lte: max && max.length ? parseFloat(max): undefined,
				}
			} else {
				filters[name] = filterValue
			}
			
		}
	}
	if (Object.keys(filters).length) {
		req.filters = filters
	}
    next()
}

function getDate(age){
    var today = new Date();
    var Date = today.getFullYear() - age;
    console.log(date)
    return birthDate;
}