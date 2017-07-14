// 'use strict';

// module.exports = {
//   up: function (queryInterface, Sequelize) {
//     return (queryInterface.createTable('hashtags', {
//       id: {
//         type:          Sequelize.INTEGER,
//         primaryKey:    true,
//         autoIncrement: true,
//         allowNull:     false
//       },
//       postId: {
//         type:       Sequelize.INTEGER,
//         allowNull:  false,
//         onDelete:  'cascade',
//         references: {
//           model: 'posts',
//           key:   'id'
//         }
//       },
//       hashtags: {
//         type:      Sequelize.TEXT,
//         allowNull: false,
//       }
//     }));
//   },
//   down: function(queryInterface, Sequelize) {
//     return queryInterface.dropTable('comments');
//   }
// };
