import Image from 'next/image';
import React from 'react';
import GoalCard from './GoalsCard';



const GoalsDashboard: React.FC = () => {
  const goals = [
    {
      title: 'Monthly Revenue Goal',
      percentage: 72,
      current: 18200,
      target: 25000,
    },
    {
      title: 'Monthly Jobs Goal',
      percentage: 70,
      current: 14,
      target: 20,
    },
    {
      title: 'Payment Collection Goal',
      percentage: 109,
      current: 16400,
      target: 15000,
    },
    {
      title: 'Team Utilization Goal',
      percentage: 74,
      target: 80,
      extra: 'Average',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  bg-gray-50 ">
      {goals.map((goal, index) => (
        <GoalCard
          key={index}
          title={goal.title}
          percentage={goal.percentage}
          current={goal.current}
          target={goal.target}
          extra={goal.extra}
        />
      ))}
    </div>
  );
};

export default GoalsDashboard;