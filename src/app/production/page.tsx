/** @format */

// /** @format */
// 'use client';

// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import ProductionHeader from '../components/productionHeader';
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from 'react-beautiful-dnd';
// import { GrAttachment } from 'react-icons/gr';

// interface Card {
//   id: string;
//   title: string;
//   label: string;
//   date: string;
//   description: string;
//   attachments: number;
//   comments: number;
//   members: string[];
//   image?: string;
// }

// interface List {
//   id: string;
//   title: string;
//   cards: Card[];
// }

// interface InitialData {
//   lists: {
//     [key: string]: List;
//   };
//   listOrder: string[];
// }

// const initialData: InitialData = {
//   lists: {
//     pending: {
//       id: 'pending',
//       title: 'Pending',
//       cards: [
//         {
//           id: 'card-1',
//           title: 'Pre-Wedding Shoot - Sarah & John',
//           label: 'SARAH JOHNSON',
//           date: 'OCT 7, 2025',
//           description:
//             'Highlight Reel (3 min), Full Edited Footage (2 hours)...',
//           attachments: 2,
//           comments: 4,
//           members: ['user1'],
//           image: '/images/prodCardImg.png',
//         },
//         {
//           id: 'card-2',
//           title: 'Corporate Event - Tech Conference',
//           label: 'EVENT PLANNER',
//           date: 'OCT 10, 2025',
//           description: 'Full Coverage Video (4 hours)',
//           attachments: 1,
//           comments: 2,
//           members: ['user2', 'user3'],
//         },
//       ],
//     },
//     'in-progress': {
//       id: 'in-progress',
//       title: 'In Progress',
//       cards: [
//         {
//           id: 'card-3',
//           title: 'Wedding Day - Emma & Liam',
//           label: 'PRIYA SHARMA',
//           date: 'OCT 5, 2025',
//           description:
//             'Full Edited Video (3 hours), Social Media Teasers (3 clips)',
//           attachments: 4,
//           comments: 5,
//           members: ['user4'],
//           image: '/images/prodCardImg.png',
//         },
//         {
//           id: 'card-4',
//           title: 'Product Launch - New Gadget',
//           label: 'MARKETING TEAM',
//           date: 'OCT 12, 2025',
//           description: 'Promotional Video (2 min)',
//           attachments: 3,
//           comments: 1,
//           members: ['user5'],
//         },
//       ],
//     },
//     completed: {
//       id: 'completed',
//       title: 'Completed',
//       cards: [
//         {
//           id: 'card-5',
//           title: 'Proposal Shoot - Michael & Lisa',
//           label: 'MICHAEL JOHNSON',
//           date: 'OCT 1, 2025',
//           description: 'Highlight Reel (2 min), Full Edited Footage (45 min)',
//           attachments: 6,
//           comments: 10,
//           members: ['user6'],
//         },
//         {
//           id: 'card-6',
//           title: "Birthday Party - Kid's Celebration",
//           label: 'PARENT ORGANIZER',
//           date: 'SEP 28, 2025',
//           description: 'Fun Edit (1 hour)',
//           attachments: 5,
//           comments: 3,
//           members: ['user7', 'user8'],
//         },
//       ],
//     },
//   },
//   listOrder: ['pending', 'in-progress', 'completed'],
// };

// const Page: React.FC = () => {
//   const [data, setData] = useState<InitialData>(initialData);

//   const onDragEnd = (result: DropResult) => {
//     const { destination, source, draggableId } = result;

//     if (!destination) return;

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     )
//       return;

//     const start = data.lists[source.droppableId];
//     const finish = data.lists[destination.droppableId];

//     if (start === finish) {
//       const newCards = Array.from(start.cards);
//       const [removed] = newCards.splice(source.index, 1);
//       newCards.splice(destination.index, 0, removed);

//       setData({
//         ...data,
//         lists: {
//           ...data.lists,
//           [source.droppableId]: { ...start, cards: newCards },
//         },
//       });
//     } else {
//       const startCards = Array.from(start.cards);
//       const [removed] = startCards.splice(source.index, 1);
//       const finishCards = Array.from(finish.cards);
//       finishCards.splice(destination.index, 0, removed);

//       setData({
//         ...data,
//         lists: {
//           ...data.lists,
//           [source.droppableId]: { ...start, cards: startCards },
//           [destination.droppableId]: { ...finish, cards: finishCards },
//         },
//       });
//     }
//   };

//   const getTitleStyles = (title: any) => {
//     switch (title.toLowerCase()) {
//       case 'pending':
//         return 'text-[#01B0E9] bg-[#F2FAFD]';
//       case 'in progress':
//         return 'text-[#FDBF2B] bg-[#FFFCF4]';
//       case 'completed':
//         return 'text-[#13CC95] bg-[#F3FCFA]';
//       default:
//         return 'text-gray-500 bg-gray-100'; // Fallback styles
//     }
//   };

//   return (
//     <div className='min-h-screen w-full flex flex-col items-start bg-gray-100'>
//       <Navbar />
//       <div className='w-full max-w-[1500px] mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-10'>
//         <div className='w-full'>
//           <ProductionHeader />
//         </div>
//         <DragDropContext onDragEnd={onDragEnd}>
//           <div className='flex flex-row overflow-x-auto sm:gap-3 py-4'>
//             {data.listOrder.map((listId) => {
//               const list = data.lists[listId];
//               return (
//                 <div
//                   key={list.id}
//                   className='bg-white rounded-lg p-3 min-w-[230px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px] flex-shrink-0 flex flex-col'>
//                   <div className='flex justify-between items-center mb-3'>
//                     <div className='flex flex-row justify-center items-center'>
//                       <div
//                         className={`w-10 h-10 flex flex-row justify-around items-center rounded-full mr-2 ${getTitleStyles(
//                           list.title
//                         )}`}>
//                         <span className='text-[30px] '>+</span>
//                       </div>
//                       <h3 className='font-semibold text-lg text-black'>
//                         {list.title}
//                       </h3>
//                     </div>
//                     <button className='text-gray-500'>⋯</button>
//                   </div>
//                   <Droppable droppableId={list.id}>
//                     {(provided: any) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                         className='flex-grow space-y-3 min-h-[100px]  '>
//                         {list.cards.map((card, index) => (
//                           <Draggable
//                             key={card.id}
//                             draggableId={card.id}
//                             index={index}>
//                             {(provided: any) => (
//                               <div
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 className='w-[1/4] bg-white rounded-lg shadow-md p-3'>
//                                 {card.image && (
//                                   <img
//                                     src={card.image}
//                                     alt={card.title}
//                                     className='w-full h-32 object-cover rounded-md mb-2'
//                                   />
//                                 )}
//                                 <h4 className='font-bold text-base mb-1 text-black'>
//                                   {card.title}
//                                 </h4>
//                                 <div className='flex items-center mb-1'>
//                                   <span className='bg-[#E5F7FD] text-[#01B0E9] text-xs px-2 py-0.5 mr-2 rounded-2xl '>
//                                     {card.label}
//                                   </span>
//                                   <span className='text-red-500 text-[12px] bg-[#FCF3F1] px-2 rounded-2xl'>
//                                     {card.date}
//                                   </span>
//                                 </div>
//                                 <p className='text-sm text-black mb-2'>
//                                   {card.description}
//                                 </p>
//                                 <div className='flex justify-between items-center'>
//                                   <div className='flex space-x-2 text-gray-500 text-sm'>
//                                     <div className='flex flex-row  justify-between items-center gap-1 '>
//                                       <GrAttachment />
//                                       <span> {card.attachments}</span>
//                                     </div>
//                                     <span>💬 {card.comments}</span>
//                                   </div>
//                                   <div className='flex -space-x-2'>
//                                     {card.members.map((member) => (
//                                       <img
//                                         key={member}
//                                         src={'/teampic1.png'}
//                                         alt={member}
//                                         className='w-10 h-10 rounded-full border-2 border-white'
//                                       />
//                                     ))}
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </div>
//                     )}
//                   </Droppable>
//                   <button className='w-full mt-3 text-center text-gray-500 py-2 border-t border-gray-200'>
//                     + Add a card
//                   </button>
//                 </div>
//               );
//             })}
//             <div className='bg-white rounded-lg p-3 min-w-[230px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px] flex-shrink-0 flex items-center justify-center text-gray-500 font-medium'>
//               + Add another list
//             </div>
//           </div>
//         </DragDropContext>
//       </div>
//     </div>
//   );
// };

// export default Page;
/** @format */
'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductionHeader from '../components/productionHeader';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { GrAttachment } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';

interface Card {
  id: string;
  title: string;
  label: string;
  date: string;
  description: string;
  attachments: number;
  comments: number;
  members: string[];
  image?: string;
}

interface List {
  id: string;
  title: string;
  cards: Card[];
}

interface InitialData {
  lists: {
    [key: string]: List;
  };
  listOrder: string[];
}

const initialData: InitialData = {
  lists: {
    pending: {
      id: 'pending',
      title: 'Pending',
      cards: [
        {
          id: 'card-1',
          title: 'Pre-Wedding Shoot - Sarah & John',
          label: 'SARAH JOHNSON',
          date: 'OCT 7, 2025',
          description:
            'Highlight Reel (3 min), Full Edited Footage (2 hours)...',
          attachments: 2,
          comments: 4,
          members: ['user1'],
          image: '/images/prodCardImg.png',
        },
        {
          id: 'card-2',
          title: 'Corporate Event - Tech Conference',
          label: 'EVENT PLANNER',
          date: 'OCT 10, 2025',
          description: 'Full Coverage Video (4 hours)',
          attachments: 1,
          comments: 2,
          members: ['user2', 'user3'],
        },
      ],
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        {
          id: 'card-3',
          title: 'Wedding Day - Emma & Liam',
          label: 'PRIYA SHARMA',
          date: 'OCT 5, 2025',
          description:
            'Full Edited Video (3 hours), Social Media Teasers (3 clips)',
          attachments: 4,
          comments: 5,
          members: ['user4'],
          image: '/images/prodCardImg.png',
        },
        {
          id: 'card-4',
          title: 'Product Launch - New Gadget',
          label: 'MARKETING TEAM',
          date: 'OCT 12, 2025',
          description: 'Promotional Video (2 min)',
          attachments: 3,
          comments: 1,
          members: ['user5'],
        },
      ],
    },
    completed: {
      id: 'completed',
      title: 'Completed',
      cards: [
        {
          id: 'card-5',
          title: 'Proposal Shoot - Michael & Lisa',
          label: 'MICHAEL JOHNSON',
          date: 'OCT 1, 2025',
          description: 'Highlight Reel (2 min), Full Edited Footage (45 min)',
          attachments: 6,
          comments: 10,
          members: ['user6'],
        },
        {
          id: 'card-6',
          title: "Birthday Party - Kid's Celebration",
          label: 'PARENT ORGANIZER',
          date: 'SEP 28, 2025',
          description: 'Fun Edit (1 hour)',
          attachments: 5,
          comments: 3,
          members: ['user7', 'user8'],
        },
      ],
    },
  },
  listOrder: ['pending', 'in-progress', 'completed'],
};

const Modal: React.FC<{ card: Card; onClose: () => void }> = ({
  card,
  onClose,
}) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission logic here
    setComment('');
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative flex flex-col md:flex-row gap-6'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'>
          <IoClose size={24} />
        </button>
        <div className='w-full md:w-2/3'>
          <div
            className={`text-white text-sm px-2 py-1 rounded mb-2 ${
              card.id === 'pending'
                ? 'bg-gray-400'
                : card.id === 'in-progress'
                ? 'bg-yellow-400'
                : 'bg-green-400'
            }`}>
            {card.id.toUpperCase()}
          </div>
          {card.image && (
            <img
              src={card.image}
              alt={card.title}
              className='w-full h-48 object-cover rounded-md mb-4'
            />
          )}
          <h2 className='text-xl font-bold text-black mb-2'>{card.title}</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
            <div>
              <p className='text-gray-500 text-sm'>Members</p>
              <div className='flex -space-x-2 mt-1'>
                {card.members.map((member, index) => (
                  <img
                    key={member}
                    src={index % 2 === 0 ? '/teampic1.png' : '/teampic2.png'}
                    alt={member}
                    className='w-8 h-8 rounded-full border-2 border-white'
                  />
                ))}
                <button className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500'>
                  +
                </button>
              </div>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Client</p>
              <span className='text-black'>{card.label}</span>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Due Date</p>
              <span className='text-black'>{card.date} 5:32 AM</span>
            </div>
          </div>
          <div className='mb-4'>
            <div className='flex justify-between items-center mb-2'>
              <p className='text-gray-500 text-sm'>Description</p>
              <button className='text-blue-500 text-sm'>Edit</button>
            </div>
            <p className='text-gray-700'>{card.description}</p>
          </div>
          <div>
            <p className='text-gray-500 text-sm'>Attachment</p>
            <div className='flex items-center gap-2 mt-1'>
              <div className='flex items-center gap-1 text-gray-500'>
                <GrAttachment />
                <span>{card.attachments}</span>
              </div>
              <button className='text-blue-500 text-sm'>Add</button>
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/3'>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <h3 className='text-gray-700 text-sm mb-2'>Comments & Activity</h3>
            <form
              onSubmit={handleCommentSubmit}
              className='mb-4'>
              <input
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Write a comment...'
                className='w-full p-2 border border-gray-300 rounded mb-2'
              />
              <div className='flex justify-end gap-2'>
                <button
                  type='button'
                  className='text-gray-500 text-sm'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-1 rounded'>
                  Save
                </button>
              </div>
            </form>
            <div className='space-y-2'>
              <div className='flex items-start gap-2'>
                <img
                  src='/teampic1.png'
                  alt='User'
                  className='w-8 h-8 rounded-full'
                />
                <div>
                  <p className='text-gray-700 text-sm'>
                    Sarah Johnson moved this card from PENDING to IN PROGRESS
                  </p>
                  <p className='text-gray-500 text-xs'>Nov 1, 2025, 12:59 PM</p>
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <img
                  src='/teampic2.png'
                  alt='User'
                  className='w-8 h-8 rounded-full'
                />
                <div>
                  <p className='text-gray-700 text-sm'>
                    Sarah Johnson added Priya Sharma to this card
                  </p>
                  <p className='text-gray-500 text-xs'>Nov 1, 2025, 12:59 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const [data, setData] = useState<InitialData>(initialData);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = data.lists[source.droppableId];
    const finish = data.lists[destination.droppableId];

    if (start === finish) {
      const newCards = Array.from(start.cards);
      const [removed] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, removed);

      setData({
        ...data,
        lists: {
          ...data.lists,
          [source.droppableId]: { ...start, cards: newCards },
        },
      });
    } else {
      const startCards = Array.from(start.cards);
      const [removed] = startCards.splice(source.index, 1);
      const finishCards = Array.from(finish.cards);
      finishCards.splice(destination.index, 0, removed);

      setData({
        ...data,
        lists: {
          ...data.lists,
          [source.droppableId]: { ...start, cards: startCards },
          [destination.droppableId]: { ...finish, cards: finishCards },
        },
      });
    }
  };

  const getTitleStyles = (title: any) => {
    switch (title.toLowerCase()) {
      case 'pending':
        return 'text-[#01B0E9] bg-[#F2FAFD]';
      case 'in progress':
        return 'text-[#FDBF2B] bg-[#FFFCF4]';
      case 'completed':
        return 'text-[#13CC95] bg-[#F3FCFA]';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-start bg-gray-100'>
      <Navbar />
      <div className='w-full max-w-[1500px] mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-10'>
        <div className='w-full'>
          <ProductionHeader />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='flex flex-row overflow-x-auto sm:gap-3 py-4'>
            {data.listOrder.map((listId) => {
              const list = data.lists[listId];
              return (
                <div
                  key={list.id}
                  className='bg-white rounded-lg p-3 min-w-[230px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px] flex-shrink-0 flex flex-col'>
                  <div className='flex justify-between items-center mb-3'>
                    <div className='flex flex-row justify-center items-center'>
                      <div
                        className={`w-10 h-10 flex flex-row justify-around items-center rounded-full mr-2 ${getTitleStyles(
                          list.title
                        )}`}>
                        <span className='text-[30px]'>+</span>
                      </div>
                      <h3 className='font-semibold text-lg text-black'>
                        {list.title}
                      </h3>
                    </div>
                    <button className='text-gray-500'>⋯</button>
                  </div>
                  <Droppable droppableId={list.id}>
                    {(provided: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='flex-grow space-y-3 min-h-[100px]'>
                        {list.cards.map((card, index) => (
                          <Draggable
                            key={card.id}
                            draggableId={card.id}
                            index={index}>
                            {(provided: any) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className='w-full bg-white rounded-lg shadow-md p-3 cursor-pointer'
                                onClick={() => setSelectedCard(card)}>
                                {card.image && (
                                  <img
                                    src={card.image}
                                    alt={card.title}
                                    className='w-full h-32 object-cover rounded-md mb-2'
                                  />
                                )}
                                <h4 className='font-bold text-base mb-1 text-black'>
                                  {card.title}
                                </h4>
                                <div className='flex items-center mb-1'>
                                  <span className='bg-[#E5F7FD] text-[#01B0E9] text-xs px-2 py-0.5 mr-2 rounded-2xl'>
                                    {card.label}
                                  </span>
                                  <span className='text-red-500 text-[12px] bg-[#FCF3F1] px-2 rounded-2xl'>
                                    {card.date}
                                  </span>
                                </div>
                                <p className='text-sm text-black mb-2'>
                                  {card.description}
                                </p>
                                <div className='flex justify-between items-center'>
                                  <div className='flex space-x-2 text-gray-500 text-sm'>
                                    <div className='flex flex-row justify-between items-center gap-1'>
                                      <GrAttachment />
                                      <span>{card.attachments}</span>
                                    </div>
                                    <span>💬 {card.comments}</span>
                                  </div>
                                  <div className='flex -space-x-2'>
                                    {card.members.map((member, index) => (
                                      <img
                                        key={member}
                                        src={
                                          index % 2 === 0
                                            ? '/teampic1.png'
                                            : '/teampic2.png'
                                        }
                                        alt={member}
                                        className='w-10 h-10 rounded-full border-2 border-white'
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <button className='w-full mt-3 text-center text-gray-500 py-2 border-t border-gray-200'>
                    + Add a card
                  </button>
                </div>
              );
            })}
            <div className='bg-white rounded-lg p-3 min-w-[230px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px] flex-shrink-0 flex items-center justify-center text-gray-500 font-medium'>
              + Add another list
            </div>
          </div>
        </DragDropContext>
      </div>
      {selectedCard && (
        <Modal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};

export default Page;
