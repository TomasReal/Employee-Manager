const repo = require('../repositories/employees.repository');


const normPhone = (s) => String(s).trim().replace(/[\s\-()]/g, '');

function validateCreate(payload) {
    const { fullName, age, area, seniority, phone } = payload || {};
    if (!fullName || typeof fullName !== 'string') throw { status: 400, message: 'fullName is required (string)' };
    if (!Number.isInteger(Number(age))) throw { status: 400, message: 'age is required (int)' };
    if (!area || typeof area !== 'string') throw { status: 400, message: 'area is required (string)' };
    if (!Number.isInteger(Number(seniority))) throw { status: 400, message: 'seniority is required (int)' };
    if (!phone || typeof phone !== 'string') throw { status: 400, message: 'phone is required (string)' };
    return {
        fullName: fullName.trim(),
        age: Number(age),
        area: area.trim(),
        seniority: Number(seniority),
        phone: normPhone(phone)
    };
}

function validateUpdate(payload) {
    const out = {};
    if ('fullName' in payload) {
        if (!payload.fullName || typeof payload.fullName !== 'string') throw { status: 400, message: 'fullName must be string' };
        out.fullName = payload.fullName.trim();
    }
    if ('age' in payload) {
        if (!Number.isInteger(Number(payload.age))) throw { status: 400, message: 'age muest be int' };
        out.age = Number(payload.age);
    }
    if ('area' in payload) {
        if (!payload.area || typeof payload.area !== 'string') throw { status: 400, message: 'area must be string' };
        out.area = payload.area.trim();
    }
    if ('seniority' in payload) {
        if (!Number.isInteger(Number(payload.seniority))) throw { status: 400, message: 'seniority must be int' };
        out.seniority = Number(payload.seniority);
    }
    if ('phone' in payload) {
        if (!payload.phone || typeof payload.phone !== 'string') throw { status: 400, message: 'phone muest be string' };
        out.phone = normPhone(payload.phone);
    }
    if (Object.keys(out).length === 0) throw { status: 400, message: 'No valid fields to update' };
    return out;
}

async function list() {
    return repo.findAll();
}
async function detail(id) {
    const num = Number(id);
    if (!Number.isInteger(num)) throw { status: 400, message: 'Invalid ID' };
    const found = await repo.findById(num);
    if (!found) throw { status: 404, message: 'Employee not found' };
    return found;
}
async function createEmployee(payload) {
    const data = validateCreate(payload);
    const exists = await repo.findByPhone(data.phone);
    if (exists) throw { status: 409, message: 'Already exist an employee with this phone' };
    return repo.create(data);
}
async function updateEmployee(id, payload) {
    const num = Number(id);
    if (!Number.isInteger(num)) throw { status: 400, message: 'Invalid ID' };
    const existing = await repo.findById(num);
    if (!existing) throw { status: 404, message: 'Employee not found' };
    const data = validateUpdate(payload);
    return repo.update(num, data);
}
async function statsByArea() {
    const rows = await repo.countByArea();
    return rows.map(r => ({ area: r.area, count: Number(r.count) }));
}

async function removeEmployee(id) {
    const num = Number(id);
    if (!Number.isInteger(num)) throw { status: 400, message: 'ID inválido' };

    const existing = await repo.findById(num);
    if (!existing) throw { status: 404, message: 'Empleado no encontrado' };

    await repo.remove(num);
    return { message: 'Employee removed successfully' };
}


module.exports = { list, detail, createEmployee, updateEmployee, statsByArea, removeEmployee };
