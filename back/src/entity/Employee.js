const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Employee',
    tableName: 'employees',
    columns: {
        id: { type: 'int', primary: true, generated: true },
        fullName: { type: 'varchar', length: 120, nullable: false },
        age: { type: 'int', nullable: false },
        area: { type: 'varchar', length: 60, nullable: false },
        seniority: { type: 'int', nullable: false },
        phone: { type: 'varchar', length: 30, nullable: false, unique: true },
        createdAt: { type: 'timestamp', default: () => 'now()' }
    },
    indices: [
        { name: 'idx_employees_area', columns: ['area'] }
    ]
});
