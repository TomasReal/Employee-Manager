// import { useState, useEffect } from 'react';
// import { Employee, CreateEmployee } from '@/shared/types';
// import { Button } from './Button';

// interface EmployeeFormProps {
//   employee?: Employee;                       // si viene, es edición
//   onSubmit: (data: CreateEmployee) => Promise<boolean>;
//   onCancel: () => void;
//   isLoading?: boolean;
// }

// export function EmployeeForm({
//   employee,
//   onSubmit,
//   onCancel,
//   isLoading = false
// }: EmployeeFormProps) {
//   const [formData, setFormData] = useState<CreateEmployee>({
//     fullName: '',
//     seniority: 0, // requerido por el back
//     age: 0,
//     area: '',
//     phone: '',
//   });

//   useEffect(() => {
//     if (employee) {
//       setFormData({
//         fullName: employee.fullName,
//         age: employee.age,
//         area: employee.area,
//         seniority: employee.seniority,  // ← tomar del empleado
//         phone: employee.phone,
//       });
//     }
//   }, [employee]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const success = await onSubmit(formData);
//     if (success) onCancel();
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     // age debe ser número entero
//     if (name === 'age') {
//       const num = value === '' ? '' : Number(value);
//       setFormData(prev => ({
//         ...prev,
//         age: (num === '' ? 0 : Number.isNaN(num) ? prev.age : Math.max(0, Math.trunc(num as number)))
//       }));
//       return;
//     }

//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 space-y-4">
//       {/* Información solo visible en edición */}
//       {employee && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//           <div>
//             <span className="block text-gray-500">ID</span>
//             <span className="font-medium">{employee.id}</span>
//           </div>
//           <div>
//             <span className="block text-gray-500">Created At</span>
//             <span className="font-medium">
//               {new Date(employee.createdAt).toLocaleString()}
//             </span>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
//             Full Name *
//           </label>
//           <input
//             type="text"
//             id="fullName"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//             placeholder="John Doe"
//           />
//         </div>

//         <div>
//           <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
//             Age *
//           </label>
//           <input
//             type="number"
//             id="age"
//             name="age"
//             min={0}
//             step={1}
//             value={formData.age}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//             placeholder="30"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
//             Area *
//           </label>
//           <input
//             type="text"
//             id="area"
//             name="area"
//             value={formData.area}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//             placeholder="IT, HR, Sales…"
//           />

//           <div>
//             <label htmlFor="seniority" className="block text-sm font-medium text-gray-700 mb-1">Seniority (years) *</label>
//             <input
//               id="seniority" name="seniority" type="number" min={0} step={1} value={formData.seniority} onChange={handleChange} required
//               className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               placeholder="0"
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//             Phone *
//           </label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//             placeholder="+54 9 11 1234 5678"
//           />
//         </div>
//       </div>

//       <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
//         <Button variant="secondary" onClick={onCancel} disabled={isLoading} type="button">
//           Cancel
//         </Button>
//         <Button type="submit" loading={isLoading}>
//           {employee ? 'Update Employee' : 'Create Employee'}
//         </Button>
//       </div>
//     </form>
//   );
// }


import { useState, useEffect } from 'react';
import { Employee, CreateEmployee } from '@/shared/types';
import { Button } from './Button';

interface EmployeeFormProps {
  employee?: Employee; // si viene, es edición
  onSubmit: (data: CreateEmployee | Partial<CreateEmployee>) => Promise<boolean>;
  onCancel: () => void;
  isLoading?: boolean;
}

type Draft = {
  fullName: string;
  age: string;        // string para permitir vacío
  area: string;
  seniority: string;  // string para permitir vacío
  phone: string;
};

export function EmployeeForm({
  employee,
  onSubmit,
  onCancel,
  isLoading = false,
}: EmployeeFormProps) {
  const [draft, setDraft] = useState<Draft>({
    fullName: '',
    age: '',
    area: '',
    seniority: '',
    phone: '',
  });

  useEffect(() => {
    if (employee) {
      setDraft({
        fullName: employee.fullName ?? '',
        age: employee.age !== undefined ? String(employee.age) : '',
        area: employee.area ?? '',
        seniority: employee.seniority !== undefined ? String(employee.seniority) : '',
        phone: employee.phone ?? '',
      });
    } else {
      setDraft({ fullName: '', age: '', area: '', seniority: '', phone: '' });
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // siempre string (incluye '')
    setDraft(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones mínimas
    const ageNum = Number(draft.age);
    const senNum = Number(draft.seniority);
    if (
      draft.fullName.trim() === '' ||
      draft.area.trim() === '' ||
      draft.phone.trim() === '' ||
      draft.age.trim() === '' ||
      draft.seniority.trim() === '' ||
      Number.isNaN(ageNum) ||
      Number.isNaN(senNum) ||
      ageNum < 0 ||
      senNum < 0 ||
      !Number.isInteger(ageNum) ||
      !Number.isInteger(senNum)
    ) {
      // Podés integrar toasts acá si querés
      return;
    }

    const payload: CreateEmployee = {
      fullName: draft.fullName.trim(),
      age: ageNum,
      area: draft.area.trim(),
      seniority: senNum,
      phone: draft.phone.trim(),
    };

    const ok = await onSubmit(payload);
    if (ok) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {/* Info solo en edición */}
      {employee && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="block text-gray-500">ID</span>
            <span className="font-medium">{employee.id}</span>
          </div>
          <div>
            <span className="block text-gray-500">Created At</span>
            <span className="font-medium">
              {new Date(employee.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={draft.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age *
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min={0}
            step={1}
            required
            value={draft.age}            // permite ''
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="30"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
            Area *
          </label>
          <input
            id="area"
            name="area"
            type="text"
            required
            value={draft.area}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="IT, HR, Sales…"
          />
        </div>

        <div>
          <label htmlFor="seniority" className="block text-sm font-medium text-gray-700 mb-1">
            Seniority (years) *
          </label>
          <input
            id="seniority"
            name="seniority"
            type="number"
            min={0}
            step={1}
            required
            value={draft.seniority}      // permite ''
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
            inputMode="numeric"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={draft.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="+54 9 11 1234 5678"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button variant="secondary" type="button" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" loading={isLoading}>
          {employee ? 'Update Employee' : 'Create Employee'}
        </Button>
      </div>
    </form>
  );
}
