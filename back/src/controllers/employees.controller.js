const svc = require('../services/employees.service');

async function list(req, res, next) {
    try { res.json(await svc.list()); } catch (e) { next(e); }
}
async function detail(req, res, next) {
    try { res.json(await svc.detail(req.params.id)); } catch (e) { next(e); }
}
async function create(req, res, next) {
    try { res.status(201).json(await svc.createEmployee(req.body)); } catch (e) { next(e); }
}
async function update(req, res, next) {
    try { res.json(await svc.updateEmployee(req.params.id, req.body)); } catch (e) { next(e); }
}
async function stats(req, res, next) {
    try { res.json(await svc.statsByArea()); } catch (e) { next(e); }
}

async function remove(req, res, next) {
    try {
        const result = await svc.removeEmployee(req.params.id);
        res.status(200).json(result);
    } catch (e) { next(e); }
}



module.exports = { list, detail, create, update, stats, remove };
