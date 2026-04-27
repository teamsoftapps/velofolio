import React from "react";

interface EventsCardProps {
  title: string;
  status: string;
  location: string;
  date: string;
  deliverables: string[];
  team: string[];
}

const EventsCard: React.FC<EventsCardProps> = ({
  title,
  status,
  location,
  date,
  deliverables,
  team,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold w-[80%]">{title}</h3>
        <div className="w-[20%] text-right">...</div>
      </div>
      <div
        className={
          status === "COMPLETED" ? "text-green-500" : "text-yellow-500"
        }
      >
        {status}
      </div>
      <div className="flex mt-2">
        <div className="w-1/2">
          <div className="text-sm">Location</div>
          <div>{location}</div>
        </div>
        <div className="w-1/2">
          <div className="text-sm">Date</div>
          <div>{date}</div>
        </div>
      </div>
      <div className="mt-2">
        <div className="text-sm">Deliverables</div>
        <ul>
          {deliverables.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-2">
        <div className="text-sm">Team</div>
        <div className="flex space-x-2">
          {team.map((member, index) => (
            <span key={index}>{member}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsCard;
