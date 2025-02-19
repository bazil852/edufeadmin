import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { PaymentSchedule } from '../../types/payment';
import { formatDate } from '../../utils/formatters';

interface PaymentScheduleCardProps {
  schedule: PaymentSchedule;
  onToggle: (id: string) => void;
}

const PaymentScheduleCard: React.FC<PaymentScheduleCardProps> = ({ schedule, onToggle }) => {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">
            {schedule.type === 'interest' ? 'Monthly Interest' : 'Capital Repayment'}
          </h3>
          <p className="text-sm text-gray-500">{schedule.description}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={schedule.isActive}
            onChange={() => onToggle(schedule.id)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#114A55]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#114A55]"></div>
        </label>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar size={16} className="text-gray-400" />
          <span>Day {schedule.day} of each month</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} className="text-gray-400" />
          <span>Next run: {formatDate(schedule.nextRun)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentScheduleCard;