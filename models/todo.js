// module.exports = function(sequelize, DataTypes) {
//   return sequelize.define('todo', {
//     description: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [1, 250]
//       }
//     },
//     completed: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false
//     }
//   });
// };


module.exports = function(sequelize, DataTypes) {
	return sequelize.define('todo', {
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			validate: {
				isBoolean: function (value) {
					if (typeof value !== 'boolean') {
						throw new Error('Completed must be a boolean');
					}
				}
			}
		}
	});
};
