// scripts/seed.js
require('dotenv').config();
require('reflect-metadata');
const { AppDataSource } = require('../src/data-source');
const Employee = require('../src/entity/Employee');

const AREAS = ['IT', 'Ventas', 'RRHH', 'Finanzas', 'Soporte'];
const FIRST = ['Ana', 'Lucía', 'María', 'Sofía', 'Laura', 'Camila', 'Valentina', 'Carla', 'Julia', 'Martina', 'Pedro', 'Juan', 'Lucas', 'Mateo', 'Nicolás', 'Bruno', 'Diego', 'Agustín', 'Javier', 'Tomás'];
const LAST = ['Gómez', 'Pérez', 'Rodríguez', 'López', 'Fernández', 'Martínez', 'García', 'Sánchez', 'Díaz', 'Torres', 'Suárez', 'Romero', 'Alonso', 'Castro', 'Vega', 'Ramos', 'Navarro', 'Molina', 'Cruz', 'Silva'];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function int(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function phone() { return `+54 9 11 ${int(1000, 9999)} ${int(1000, 9999)}`; }

function makeEmployee() {
    const fullName = `${rand(FIRST)} ${rand(LAST)}`;
    return {
        fullName,
        age: int(20, 60),
        area: rand(AREAS),
        seniority: int(0, 20),
        phone: phone()
    };
}

async function run() {
    const howMany = Number(process.argv[2]) || 30;
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(Employee);

    await repo.clear();

    const data = Array.from({ length: howMany }, makeEmployee);
    await repo.save(data);

    const counts = await repo
        .createQueryBuilder('e')
        .select('e.area', 'area')
        .addSelect('COUNT(*)', 'count')
        .groupBy('e.area')
        .orderBy('area', 'ASC')
        .getRawMany();

    console.log(`✅ Seed completado. Insertados: ${howMany}`);
    console.table(counts);

    await AppDataSource.destroy();
}

run().catch(async (err) => {
    console.error('❌ Error en seed:', err);
    try { await AppDataSource.destroy(); } catch { }
    process.exit(1);
});
