import { useState, useEffect } from 'react';
import { Employee, CreateEmployee, UpdateEmployee, AreaSummary } from '@/shared/types';
import { employeeApi } from '@/react-app/services/api';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeApi.getAll();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employee: CreateEmployee): Promise<boolean> => {
    try {
      const newEmployee = await employeeApi.create(employee);
      setEmployees(prev => [...prev, newEmployee]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create employee');
      return false;
    }
  };

  const updateEmployee = async (id: number, updates: Partial<UpdateEmployee>): Promise<boolean> => {
    try {
      const updatedEmployee = await employeeApi.update(id, updates);
      setEmployees(prev => prev.map(emp => emp.id === id ? updatedEmployee : emp));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update employee');
      return false;
    }
  };

  const deleteEmployee = async (id: number): Promise<boolean> => {
    try {
      await employeeApi.delete(id);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete employee');
      return false;
    }
  };

  const getAreaSummaries = (): AreaSummary[] => {
    const areaMap = employees.reduce((acc, employee) => {
      if (!acc[employee.area]) {
        acc[employee.area] = [];
      }
      acc[employee.area].push(employee);
      return acc;
    }, {} as Record<string, Employee[]>);

    return Object.entries(areaMap).map(([area, areaEmployees]) => ({
      area,
      count: areaEmployees.length,
      employees: areaEmployees,
    }));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    refreshEmployees: fetchEmployees,
    areaSummaries: getAreaSummaries(),
  };
}
