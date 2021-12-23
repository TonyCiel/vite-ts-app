const user = require('../database/user')
const role = require('../database/role')

module.exports = {
	...user,
	...role
}