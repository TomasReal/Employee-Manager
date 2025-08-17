import { useState } from 'react';
import { Plus, Users, Search, AlertCircle, RefreshCw } from 'lucide-react';
import { useEmployees } from '@/react-app/hooks/useEmployees';
import { Employee, CreateEmployee } from '@/shared/types';
import { LoadingSpinner } from '@/react-app/components/LoadingSpinner';
import { Button } from '@/react-app/components/Button';
import { Modal } from '@/react-app/components/Modal';
import { EmployeeCard } from '@/react-app/components/EmployeeCard';
import { EmployeeDetails } from '@/react-app/components/EmployeeDetails';
import { EmployeeForm } from '@/react-app/components/EmployeeForm';
import { ConfirmDialog } from '@/react-app/components/ConfirmDialog';
import { notify } from '@/shared/notify';
import { LogoutButton } from '../components/LogoutButton';

export default function Home() {
  const {
    employees,
    loading,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    refreshEmployees,
    areaSummaries,
  } = useEmployees();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredEmployees = employees.filter((employee) => {
    const q = searchTerm.trim().toLowerCase();

    const matchesSearch =
      q === '' ||
      employee.fullName.toLowerCase().includes(q) ||
      employee.area.toLowerCase().includes(q) ||
      (employee.phone ?? '').toLowerCase().includes(q) ||
      String(employee.age).includes(q);

    const matchesArea = selectedArea === null || employee.area === selectedArea;

    return matchesSearch && matchesArea;
  });

  const handleRefresh = () =>
    notify.promise(
      refreshEmployees(),
      { loading: 'Refreshing employees...', success: 'Employees updated', error: 'Failed to refresh' }
    );

  const handleCreateEmployee = async (
    data: CreateEmployee | Partial<CreateEmployee>
  ): Promise<boolean> => {
    const payload = data as CreateEmployee;
    const done = notify.loading('Creating employee...');
    try {
      const ok = await createEmployee(payload);
      if (ok) {
        notify.success('Employee created');
        setShowCreateForm(false);
      } else {
        notify.error('Could not create employee');
      }
      return ok;
    } catch (e: any) {
      notify.error(e?.message ?? 'Error creating employee');
      return false;
    } finally {
      done();
    }
  };

  const handleEditEmployee = async (employeeData: Partial<CreateEmployee>) => {
    if (!editingEmployee) return false;
    const done = notify.loading('Updating employee...');
    try {
      const ok = await updateEmployee(editingEmployee.id, employeeData);
      if (ok) {
        notify.success('Employee updated');
        setEditingEmployee(null);
        setSelectedEmployee(null);
      } else {
        notify.error('Could not update employee');
      }
      return ok;
    } catch (e: any) {
      notify.error(e?.message ?? 'Error updating employee');
      return false;
    } finally {
      done();
    }
  };

  const handleDeleteEmployee = async () => {
    if (!deletingEmployee) return;
    const done = notify.loading('Deleting employee...');
    setIsDeleting(true);
    try {
      const ok = await deleteEmployee(deletingEmployee.id);
      if (ok) {
        notify.success('Employee deleted');
        setDeletingEmployee(null);
        setSelectedEmployee(null);
      } else {
        notify.error('Could not delete employee');
      }
    } catch (e: any) {
      notify.error(e?.message ?? 'Error deleting employee');
    } finally {
      setIsDeleting(false);
      done();
    }
  };

  if (loading && employees.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading employees..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">ITHreex Global Employee Manager</h1>
                <p className="text-gray-600 mt-1">Manage your team efficiently</p>
              </div>
              <div className="flex items-center gap-3">
                <LogoutButton />
                <Button
                  variant="secondary"
                  onClick={handleRefresh}
                  icon={<RefreshCw className="w-4 h-4" />}
                  disabled={loading}
                >
                  Refresh
                </Button>
                <Button onClick={() => setShowCreateForm(true)} icon={<Plus className="w-4 h-4" />}>
                  Add Employee
                </Button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, area, phone or age…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <select
                value={selectedArea || ''}
                onChange={(e) => setSelectedArea(e.target.value || null)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Areas</option>
                {areaSummaries.map((area) => (
                  <option key={area.area} value={area.area}>
                    {area.area} ({area.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="font-medium text-red-800">Error loading employees</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={handleRefresh} className="ml-auto">
              Retry
            </Button>
          </div>
        )}

        {areaSummaries.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Employees by Area</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {areaSummaries.map((area) => (
                <div
                  key={area.area}
                  onClick={() => setSelectedArea(selectedArea === area.area ? null : area.area)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedArea === area.area
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{area.area}</h3>
                      <p className="text-sm text-gray-600">{area.count} employees</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredEmployees.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedArea ? 'Try adjusting your filters' : 'Get started by adding your first employee'}
            </p>
            {!searchTerm && !selectedArea && (
              <Button onClick={() => setShowCreateForm(true)}>Add Your First Employee</Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} onClick={() => setSelectedEmployee(employee)} />
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedEmployee} onClose={() => setSelectedEmployee(null)} title="Employee Details" size="lg">
        {selectedEmployee && (
          <EmployeeDetails
            employee={selectedEmployee}
            onEdit={() => setEditingEmployee(selectedEmployee)}
            onDelete={() => setDeletingEmployee(selectedEmployee)}
          />
        )}
      </Modal>

      <Modal isOpen={showCreateForm} onClose={() => setShowCreateForm(false)} title="Add New Employee" size="lg">
        <EmployeeForm onSubmit={handleCreateEmployee} onCancel={() => setShowCreateForm(false)} />
      </Modal>

      <Modal isOpen={!!editingEmployee} onClose={() => setEditingEmployee(null)} title="Edit Employee" size="lg">
        {editingEmployee && (
          <EmployeeForm employee={editingEmployee} onSubmit={handleEditEmployee} onCancel={() => setEditingEmployee(null)} />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingEmployee}
        onClose={() => setDeletingEmployee(null)}
        onConfirm={handleDeleteEmployee}
        title="Delete Employee"
        message={`Are you sure you want to delete ${deletingEmployee?.fullName}? This action cannot be undone.`}
        confirmText="Delete Employee"
        isLoading={isDeleting}
      />
    </div>
  );
}
