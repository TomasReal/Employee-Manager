// import { Employee } from '@/shared/types';
// import { Phone, Calendar, Briefcase, User, Clock } from 'lucide-react';

// interface EmployeeCardProps {
//   employee: Employee;
//   onClick: () => void;
// }

// function getInitials(name?: string) {
//   if (!name) return '?';
//   const parts = name.trim().split(/\s+/);
//   const first = parts[0]?.[0] ?? '';
//   const last = parts[1]?.[0] ?? '';
//   return (first + last).toUpperCase();
// }

// export function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
//   const initials = getInitials(employee.fullName);

//   return (
//     <div
//       onClick={onClick}
//       className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group"
//     >
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
//             {initials}
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//               {employee.fullName || 'Employee'}
//             </h3>
//             <p className="text-sm text-gray-600 flex items-center gap-2">
//               <Briefcase className="w-4 h-4" />
//               <span>{employee.area}</span>

//               <span className="text-gray-400">•</span>

//               <User className="w-4 h-4" />
//               <span>{employee.age} años</span>

//               <span className="text-gray-400">•</span>

//               <Clock className="w-4 h-4" />
//               <span>{employee.seniority} años</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-2 text-sm text-gray-600">
//         {employee.phone && (
//           <div className="flex items-center gap-2">
//             <Phone className="w-4 h-4" />
//             <span>{employee.phone}</span>
//           </div>
//         )}
//         <div className="flex items-center gap-2">
//           <Calendar className="w-4 h-4" />
//           <span>Alta {new Date(employee.createdAt).toLocaleDateString()}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Employee } from '@/shared/types';
import { Phone, Calendar, Briefcase, User, Clock } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
}

function getInitials(name?: string) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts[1]?.[0] ?? '';
  return (first + last).toUpperCase();
}

export function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
  const initials = getInitials(employee.fullName);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {employee.fullName || 'Employee'}
            </h3>

            {/* metadatos con wrap */}
            <p className="text-sm text-gray-600 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <Briefcase className="w-4 h-4" />
                <span>{employee.area}</span>
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <User className="w-4 h-4" />
                <span>{employee.age} años</span>
              </span>

              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <Clock className="w-4 h-4" />
                <span>{employee.seniority} años</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        {employee.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="break-all">{employee.phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Alta {new Date(employee.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
