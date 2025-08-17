// import { Employee } from '@/shared/types'; // { id, fullName, age, area, phone, createdAt }
// import { Phone, Calendar, Briefcase, User, Edit, Trash2 } from 'lucide-react';
// import { Button } from './Button';

// interface EmployeeDetailsProps {
//   employee: Employee;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// function getInitials(name?: string) {
//   if (!name) return '?';
//   const parts = name.trim().split(/\s+/);
//   const first = parts[0]?.[0] ?? '';
//   const last = parts[1]?.[0] ?? '';
//   return (first + last).toUpperCase();
// }

// export function EmployeeDetails({ employee, onEdit, onDelete }: EmployeeDetailsProps) {
//   const initials = getInitials(employee.fullName);

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex items-start justify-between mb-6">
//         <div className="flex items-center gap-4">
//           <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
//             {initials}
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               {employee.fullName || 'Employee'}
//             </h2>
//             <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
//               <Briefcase className="w-4 h-4" />
//               <span>{employee.area}</span>
//               <span className="text-gray-400">•</span>
//               <User className="w-4 h-4" />
//               <span>{employee.age} años</span>
//             </p>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <Button
//             variant="secondary"
//             size="sm"
//             onClick={onEdit}
//             icon={<Edit className="w-4 h-4" />}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="danger"
//             size="sm"
//             onClick={onDelete}
//             icon={<Trash2 className="w-4 h-4" />}
//           >
//             Delete
//           </Button>
//         </div>
//       </div>

//       {/* Details Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-4">
//           {/* Age */}
//           <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//               <User className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-700">Age</p>
//               <p className="text-gray-900">{employee.age}</p>
//             </div>
//           </div>

//           {/* Phone */}
//           {employee.phone && (
//             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//               <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                 <Phone className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-700">Phone</p>
//                 <p className="text-gray-900">{employee.phone}</p>
//               </div>
//             </div>
//           )}

//           {/* Area */}
//           <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//             <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//               <Briefcase className="w-5 h-5 text-purple-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-700">Area</p>
//               <p className="text-gray-900">{employee.area}</p>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4">
//           {/* Created At */}
//           <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//             <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
//               <Calendar className="w-5 h-5 text-indigo-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-700">Created At</p>
//               <p className="text-gray-900">
//                 {new Date(employee.createdAt).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric',
//                 })}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Employee ID */}
//       <div className="mt-6 pt-6 border-t border-gray-200">
//         <p className="text-sm text-gray-500">Employee ID: {employee.id}</p>
//       </div>
//     </div>
//   );
// }

import { Employee } from '@/shared/types'; // id, fullName, age, area, seniority, phone, createdAt
import { Phone, Calendar, Briefcase, User, Edit, Trash2, Clock } from 'lucide-react';
import { Button } from './Button';

interface EmployeeDetailsProps {
  employee: Employee;
  onEdit: () => void;
  onDelete: () => void;
}

function getInitials(name?: string) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts[1]?.[0] ?? '';
  return (first + last).toUpperCase();
}

export function EmployeeDetails({ employee, onEdit, onDelete }: EmployeeDetailsProps) {
  const initials = getInitials(employee.fullName);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {initials}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {employee.fullName || 'Employee'}
            </h2>
            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
              <Briefcase className="w-4 h-4" />
              <span>{employee.area}</span>
              <span className="text-gray-400">•</span>
              <User className="w-4 h-4" />
              <span>{employee.age} años</span>
              <span className="text-gray-400">•</span>
              <Clock className="w-4 h-4" />
              <span>{employee.seniority} años</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onEdit}
            icon={<Edit className="w-4 h-4" />}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onDelete}
            icon={<Trash2 className="w-4 h-4" />}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Age */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Age</p>
              <p className="text-gray-900">{employee.age}</p>
            </div>
          </div>

          {/* Phone */}
          {employee.phone && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-gray-900">{employee.phone}</p>
              </div>
            </div>
          )}

          {/* Area */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Area</p>
              <p className="text-gray-900">{employee.area}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Seniority */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Seniority</p>
              <p className="text-gray-900">{employee.seniority} años</p>
            </div>
          </div>

          {/* Created At */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Created At</p>
              <p className="text-gray-900">
                {new Date(employee.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee ID */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">Employee ID: {employee.id}</p>
      </div>
    </div>
  );
}
