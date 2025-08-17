import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { CreateEmployeeSchema, UpdateEmployeeSchema } from "@/shared/types";

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for all routes
app.use('/*', cors({
  origin: ['http://localhost:5173', 'https://*.mocha.app'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Get all employees
app.get('/employees', async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT * FROM employees ORDER BY created_at DESC').all();
    return c.json(result.results);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return c.json({ error: 'Failed to fetch employees' }, 500);
  }
});

// Get employee by ID
app.get('/employees/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
      return c.json({ error: 'Invalid employee ID' }, 400);
    }

    const result = await c.env.DB.prepare('SELECT * FROM employees WHERE id = ?').bind(id).first();
    
    if (!result) {
      return c.json({ error: 'Employee not found' }, 404);
    }

    return c.json(result);
  } catch (error) {
    console.error('Error fetching employee:', error);
    return c.json({ error: 'Failed to fetch employee' }, 500);
  }
});

// Create new employee
app.post('/employees', zValidator('json', CreateEmployeeSchema), async (c) => {
  try {
    const employee = c.req.valid('json');
    
    const result = await c.env.DB.prepare(`
      INSERT INTO employees (firstName, lastName, email, position, area, phone, hireDate, salary, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      employee.firstName,
      employee.lastName,
      employee.email,
      employee.position,
      employee.area,
      employee.phone || null,
      employee.hireDate,
      employee.salary || null,
      employee.status || 'active'
    ).run();

    const newEmployee = await c.env.DB.prepare('SELECT * FROM employees WHERE id = ?').bind(result.meta.last_row_id).first();
    
    return c.json(newEmployee, 201);
  } catch (error) {
    console.error('Error creating employee:', error);
    return c.json({ error: 'Failed to create employee' }, 500);
  }
});

// Update employee
app.put('/employees/:id', zValidator('json', UpdateEmployeeSchema.omit({ id: true })), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
      return c.json({ error: 'Invalid employee ID' }, 400);
    }

    const updates = c.req.valid('json');
    
    // Check if employee exists
    const existing = await c.env.DB.prepare('SELECT * FROM employees WHERE id = ?').bind(id).first();
    if (!existing) {
      return c.json({ error: 'Employee not found' }, 404);
    }

    // Build update query
    const updateFields = [];
    const values = [];
    
    if (updates.firstName !== undefined) {
      updateFields.push('firstName = ?');
      values.push(updates.firstName);
    }
    if (updates.lastName !== undefined) {
      updateFields.push('lastName = ?');
      values.push(updates.lastName);
    }
    if (updates.email !== undefined) {
      updateFields.push('email = ?');
      values.push(updates.email);
    }
    if (updates.position !== undefined) {
      updateFields.push('position = ?');
      values.push(updates.position);
    }
    if (updates.area !== undefined) {
      updateFields.push('area = ?');
      values.push(updates.area);
    }
    if (updates.phone !== undefined) {
      updateFields.push('phone = ?');
      values.push(updates.phone);
    }
    if (updates.hireDate !== undefined) {
      updateFields.push('hireDate = ?');
      values.push(updates.hireDate);
    }
    if (updates.salary !== undefined) {
      updateFields.push('salary = ?');
      values.push(updates.salary);
    }
    if (updates.status !== undefined) {
      updateFields.push('status = ?');
      values.push(updates.status);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await c.env.DB.prepare(`
      UPDATE employees SET ${updateFields.join(', ')} WHERE id = ?
    `).bind(...values).run();

    const updatedEmployee = await c.env.DB.prepare('SELECT * FROM employees WHERE id = ?').bind(id).first();
    
    return c.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    return c.json({ error: 'Failed to update employee' }, 500);
  }
});

// Delete employee
app.delete('/employees/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
      return c.json({ error: 'Invalid employee ID' }, 400);
    }

    // Check if employee exists
    const existing = await c.env.DB.prepare('SELECT * FROM employees WHERE id = ?').bind(id).first();
    if (!existing) {
      return c.json({ error: 'Employee not found' }, 404);
    }

    await c.env.DB.prepare('DELETE FROM employees WHERE id = ?').bind(id).run();
    
    return c.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return c.json({ error: 'Failed to delete employee' }, 500);
  }
});

export default app;
