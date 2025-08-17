const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        id: { type: Number, primary: true, generated: true },
        fullName: { type: String, length: 120, nullable: false },
        email: { type: String, length: 120, unique: true, nullable: false },
        passwordHash: { type: String, length: 120, nullable: false },
        createdAt: { type: 'timestamp', createDate: true, default: () => 'now()' },
    },
    indices: [{ name: 'idx_users_email', columns: ['email'], unique: true }],
});
