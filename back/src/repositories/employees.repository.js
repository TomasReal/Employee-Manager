const { AppDataSource } = require('../data-source');
const Employee = require('../entity/Employee');

const repo = () => AppDataSource.getRepository(Employee);

async function findAll() {
    return repo().find({ order: { fullName: 'ASC' } });
}
async function findById(id) {
    return repo().findOne({ where: { id } });
}
async function findByPhone(phone) {
    return repo().findOne({ where: { phone } });
}

async function create(data) {
    return repo().save(data);
}
async function update(id, data) {
    await repo().update({ id }, data);
    return findById(id);
}

async function remove(id) {
    return repo().delete({ id });
}


async function countByArea() {
    return repo()
        .createQueryBuilder('e')
        .select('e.area', 'area')
        .addSelect('COUNT(*)', 'count')
        .groupBy('e.area')
        .orderBy('e.area', 'ASC')
        .getRawMany();
}

module.exports = { findAll, findById, create, update, countByArea, findByPhone, remove };
