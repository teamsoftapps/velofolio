
// 'use client';

// import React, { useRef, useLayoutEffect, useState, memo, useEffect } from 'react';
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
//   DragOverlay,
//   useDroppable,
// } from '@dnd-kit/core';
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   sortableKeyboardCoordinates,
//   useSortable,
//   arrayMove,
// } from '@dnd-kit/sortable';
// import Navbar from '@/app/components/Navbar';
// import ProductionHeader from '@/app/components/productionHeader';
// import PreWeddingModal from '../components/WeddingModal';

// // --- Types ---
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
//   lists: { [key: string]: List };
//   listOrder: string[];
// }

// // --- Initial Data ---
// const initialData: InitialData = {
//   lists: {
//     pending: {
//       id: 'pending',
//       title: 'Pending',
//       cards: [
//         {
//           id: '1',
//           title: 'Pre-Wedding Shoot - Sarah & John',
//           label: 'SARAH JOHNSON',
//           date: 'OCT 7, 2025',
//           description: 'Highlight Reel (3 min), Full Edited Footage (2 hours)...',
//           attachments: 2,
//           comments: 4,
//           members: ['user1'],
//           image: '/images/prodCardImg.png',
//         },
//       ],
//     },
//     'in-progress': {
//       id: 'in-progress',
//       title: 'In Progress',
//       cards: [
//         {
//           id: '2',
//           title: 'Wedding Day - Emma & Liam',
//           label: 'PRIYA SHARMA',
//           date: 'OCT 5, 2025',
//           description: 'Full Edited Video (3 hours), Social Media Teasers (3 clips)',
//           attachments: 4,
//           comments: 5,
//           members: ['user4'],
//           image: '/images/prodCardImg.png',
//         },
//       ],
//     },
//     completed: {
//       id: 'completed',
//       title: 'Completed',
//       cards: [
//         {
//           id: '3',
//           title: 'Proposal Shoot - Michael & Lisa',
//           label: 'MICHAEL JOHNSON',
//           date: 'OCT 1, 2025',
//           description: 'Highlight Reel (2 min), Full Edited Footage (45 min)',
//           attachments: 6,
//           comments: 10,
//           members: ['user6'],
//         },
//       ],
//     },
//   },
//   listOrder: ['pending', 'in-progress', 'completed'],
// };

// // --- Sortable Card ---
// const SortableCard = memo(({ card }: { card: Card }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });

//   const style = {
//     transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="bg-white rounded-lg shadow-md p-3 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all duration-200 border border-gray-200"
//     >
//       {card.image && (
//         <img src={card.image} alt={card.title} className="w-full h-32 object-cover rounded-md mb-2" />
//       )}
//       <h4 className="font-bold text-base mb-1 text-black truncate">{card.title}</h4>
//       <p className="text-sm text-gray-600 mb-2 line-clamp-2">{card.description}</p>
//     </div>
//   );
// });

// // --- Sortable List ---
// const SortableList = memo(({ list }: { list: List }) => {
//   const { setNodeRef, isOver } = useDroppable({ id: list.id });

//   return (
//     <div
//       ref={setNodeRef}
//       className={`bg-white rounded-lg p-3 w-[90vw] sm:w-[300px] md:w-[320px] flex-shrink-0 flex flex-col shadow-sm border ${
//         isOver ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
//       }`}
//     >
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="font-semibold text-lg text-black">{list.title}</h3>
//         <span className="text-gray-500 text-sm">{list.cards.length}</span>
//       </div>

//       <SortableContext items={list.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
//         <div
//           className={`flex-grow space-y-3 min-h-[200px] rounded-md p-2 ${
//             isOver ? 'bg-blue-100' : 'bg-gray-50'
//           }`}
//         >
//           {list.cards.map((card) => (
//             <SortableCard key={card.id} card={card} />
//           ))}
//         </div>
//       </SortableContext>

//       <button className="w-full mt-3 text-center text-gray-500 py-2 border-t border-gray-200 hover:bg-gray-50 rounded-b-lg transition-colors">
//         + Add a card
//       </button>
//     </div>
//   );
// });

// // --- Main Page ---
// const ProductionPage: React.FC = () => {
//   const [data, setData] = useState<InitialData>(initialData);
//   const [activeCard, setActiveCard] = useState<Card | null>(null);
//   const scrollContainerRef = useRef<HTMLDivElement | null>(null);
//   const scrollPosRef = useRef(0);

//   useLayoutEffect(() => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollLeft = scrollPosRef.current;
//     }
//   }, []);

// const [isTouchDevice, setIsTouchDevice] = useState(false);

// useEffect(() => {
//   setIsTouchDevice(
//     typeof window !== 'undefined' &&
//     ('ontouchstart' in window || navigator.maxTouchPoints > 0)
//   );
// }, []);


// const sensors = useSensors(
//   useSensor(PointerSensor, { 
//     activationConstraint: isTouchDevice
//       ? { delay: 200, tolerance: 5 }
//       : { distance: 5 }
//   }),
//   useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
// );


//   // --- Handle drag start ---
//   const handleDragStart = (event: DragEndEvent) => {
//     const { active } = event;
//     const sourceListId = Object.keys(data.lists).find((listId) =>
//       data.lists[listId].cards.some((c) => c.id === active.id)
//     );
//     if (sourceListId) {
//       const card = data.lists[sourceListId].cards.find((c) => c.id === active.id);
//       if (card) setActiveCard(card);
//     }
//   };

//   // --- Handle drag end ---
//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over }:any = event;
//     setActiveCard(null);

//     if (!over) return;

//     let sourceListId: string | null = null;
//     let destinationListId: any | null = null;

//     // Find source list
//     for (const listId of data.listOrder) {
//       if (data.lists[listId].cards.some((c) => c.id === active.id)) {
//         sourceListId = listId;
//         break;
//       }
//     }

//     if (!sourceListId) return;

//     // Determine destination list
//     if (data.listOrder.includes(over.id)) {
//       // Dropped directly on a list
//       destinationListId = over.id;
//     } else {
//       // Dropped on a card, find its parent list
//       for (const listId of data.listOrder) {
//         if (data.lists[listId].cards.some((c) => c.id === over.id)) {
//           destinationListId = listId;
//           break;
//         }
//       }
//     }

//     if (!destinationListId) return;

//     setData((prevData) => {
//       const sourceCards = [...prevData.lists[sourceListId].cards];
//       const destinationCards = [...prevData.lists[destinationListId].cards];
//       const movingCardIndex = sourceCards.findIndex((c) => c.id === active.id);
//       const movingCard = sourceCards.splice(movingCardIndex, 1)[0];

//       if (sourceListId === destinationListId) {
//         // Reorder within the same list
//         const overIndex = over.id === destinationListId ? destinationCards.length : destinationCards.findIndex((c) => c.id === over.id);
//         const newCards = arrayMove(sourceCards, movingCardIndex, overIndex >= 0 ? overIndex : destinationCards.length);
//         return {
//           ...prevData,
//           lists: {
//             ...prevData.lists,
//             [sourceListId]: { ...prevData.lists[sourceListId], cards: newCards },
//           },
//         };
//       } else {
//         // Move to a different list
//         const overIndex = over.id === destinationListId ? destinationCards.length : destinationCards.findIndex((c) => c.id === over.id);
//         destinationCards.splice(overIndex >= 0 ? overIndex : destinationCards.length, 0, movingCard);

//         return {
//           ...prevData,
//           lists: {
//             ...prevData.lists,
//             [sourceListId]: { ...prevData.lists[sourceListId], cards: sourceCards },
//             [destinationListId]: { ...prevData.lists[destinationListId], cards: destinationCards },
//           },
//         };
//       }
//     });
//   };
// const [Modal, setModal] = useState(false);
//   return (
//     <div className={`min-h-screen w-full flex flex-col bg-gray-100 overflow-hidden ${Modal ? 'blur-sm pointer-events-none select-none' : ''}`}>
//       <Navbar />
//       <div className="w-full max-w-[1600px] mx-auto mt-4 sm:mt-6 md:mt-8 px-4">
//         <ProductionHeader />

//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragStart={handleDragStart}
//           onDragEnd={handleDragEnd}
//         >
//           <div
//             ref={scrollContainerRef}
//             className="flex flex-col sm:flex-row gap-4 py-6 overflow-x-auto sm:overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
//             style={{
//               WebkitOverflowScrolling: 'touch',
//               scrollBehavior: 'auto',
//               overscrollBehaviorX: 'contain',
//               touchAction: 'pan-x pan-y', // Changed to allow scrolling and dragging
//             }}
//           >
//             <SortableContext items={data.listOrder} strategy={verticalListSortingStrategy}>
//           {data.listOrder.map((listId) => {
//   const list = data.lists[listId];
//   if (!list) return null; // skip undefined lists
//   return <SortableList key={listId} list={list} />;
// })}

//             </SortableContext>

//             <div className="flex-shrink-0">
//               <div className="bg-white rounded-lg p-3 w-[90vw] sm:w-[300px] md:w-[320px] flex items-center justify-center text-gray-500 font-medium hover:bg-gray-50 cursor-pointer border-2 border-dashed border-gray-200">
//                 + Add another list
//               </div>
//             </div>
//           </div>

//           <DragOverlay>
//             {activeCard ? (
//               <div className="bg-white rounded-lg shadow-md p-3 cursor-grabbing border border-gray-200 opacity-90 " 
//                 >
//                 {activeCard.image && (
//                   <img
//                     src={activeCard.image}
//                     alt={activeCard.title}
//                     className="w-full h-32 object-cover rounded-md mb-2"
//                     onClick={(e)=>{
//                 e.stopPropagation();
//                 setModal(true);
//               }
//             }
//                   />
//                 )}
//                 <h4 className="font-bold text-base mb-1 text-black truncate">{activeCard.title}</h4>
//                 <p className="text-sm text-gray-600 mb-2 line-clamp-2">{activeCard.description}</p>
//               </div>
//             ) : null}
//           </DragOverlay>
//         </DndContext>
//       </div>
//       <>
//       {Modal &&(
//         <PreWeddingModal/>
//       )}
      
//       </>
//     </div>
//   );
// };

// export default ProductionPage;
'use client';

import React, { useRef, useLayoutEffect, useState, memo, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import Navbar from '@/app/components/Navbar';
import ProductionHeader from '@/app/components/productionHeader';
import PreWeddingModal from '../components/WeddingModal';

// --- Types ---
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
  lists: { [key: string]: List };
  listOrder: string[];
}

// --- Initial Data ---
const initialData: InitialData = {
  lists: {
    pending: {
      id: 'pending',
      title: 'Pending',
      cards: [
        {
          id: '1',
          title: 'Pre-Wedding Shoot - Sarah & John',
          label: 'SARAH JOHNSON',
          date: 'OCT 7, 2025',
          description: 'Highlight Reel (3 min), Full Edited Footage (2 hours)...',
          attachments: 2,
          comments: 4,
          members: ['user1'],
          image: '/images/prodCardImg.png',
        },
      ],
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        {
          id: '2',
          title: 'Wedding Day - Emma & Liam',
          label: 'PRIYA SHARMA',
          date: 'OCT 5, 2025',
          description: 'Full Edited Video (3 hours), Social Media Teasers (3 clips)',
          attachments: 4,
          comments: 5,
          members: ['user4'],
          image: '/images/prodCardImg.png',
        },
      ],
    },
    completed: {
      id: 'completed',
      title: 'Completed',
      cards: [
        {
          id: '3',
          title: 'Proposal Shoot - Michael & Lisa',
          label: 'MICHAEL JOHNSON',
          date: 'OCT 1, 2025',
          description: 'Highlight Reel (2 min), Full Edited Footage (45 min)',
          attachments: 6,
          comments: 10,
          members: ['user6'],
        },
      ],
    },
  },
  listOrder: ['pending', 'in-progress', 'completed'],
};

// --- Sortable Card ---
const SortableCard = memo(({ card, onClick }: { card: Card; onClick?: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-3 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all duration-200 border border-gray-200"
    >
      {card.image && <img src={card.image} alt={card.title} className="w-full h-32 object-cover rounded-md mb-2" />}
      <h4 className="font-bold text-base mb-1 text-black truncate">{card.title}</h4>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{card.description}</p>
    </div>
  );
});

// --- Sortable List ---
const SortableList = memo(({ list, onCardClick }: { list: List; onCardClick: (card: Card) => void }) => {
  const { setNodeRef, isOver } = useDroppable({ id: list.id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-white rounded-lg p-3 w-[90vw] sm:w-[300px] md:w-[320px] flex-shrink-0 flex flex-col shadow-sm border ${
        isOver ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg text-black">{list.title}</h3>
        <span className="text-gray-500 text-sm">{list.cards.length}</span>
      </div>

      <SortableContext items={list.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div
          className={`flex-grow space-y-3 min-h-[200px] rounded-md p-2 ${isOver ? 'bg-blue-100' : 'bg-gray-50'}`}
        >
          {list.cards.map((card) => (
            <SortableCard key={card.id} card={card} onClick={() => onCardClick(card)} />
          ))}
        </div>
      </SortableContext>

      <button className="w-full mt-3 text-center text-gray-500 py-2 border-t border-gray-200 hover:bg-gray-50 rounded-b-lg transition-colors">
        + Add a card
      </button>
    </div>
  );
});

// --- Main Page ---
const ProductionPage: React.FC = () => {
  const [data, setData] = useState<InitialData>(initialData);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [Modal, setModal] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollPosRef = useRef(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPosRef.current;
    }
  }, []);

  useEffect(() => {
    setIsTouchDevice(
      typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    );
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: isTouchDevice ? { delay: 200, tolerance: 5 } : { distance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragEndEvent) => {
    const { active } = event;
    const sourceListId = Object.keys(data.lists).find((listId) =>
      data.lists[listId].cards.some((c) => c.id === active.id)
    );
    if (sourceListId) {
      const card = data.lists[sourceListId].cards.find((c) => c.id === active.id);
      if (card) setActiveCard(card);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over }: any = event;
    setActiveCard(null);
    if (!over) return;

    let sourceListId: string | null = null;
    let destinationListId: string | null = null;

    for (const listId of data.listOrder) {
      if (data.lists[listId].cards.some((c) => c.id === active.id)) {
        sourceListId = listId;
        break;
      }
    }
    if (!sourceListId) return;

    // Determine destination
    if (data.listOrder.includes(over.id)) {
      destinationListId = over.id;
    } else {
      for (const listId of data.listOrder) {
        if (data.lists[listId].cards.some((c) => c.id === over.id)) {
          destinationListId = listId;
          break;
        }
      }
    }
    if (!destinationListId) return;

    setData((prevData) => {
      const sourceCards = [...prevData.lists[sourceListId!].cards];
      const destinationCards = [...prevData.lists[destinationListId!].cards];
      const movingCardIndex = sourceCards.findIndex((c) => c.id === active.id);
      const movingCard = sourceCards.splice(movingCardIndex, 1)[0];

      if (sourceListId === destinationListId) {
        const overIndex =
          over.id === destinationListId
            ? destinationCards.length
            : destinationCards.findIndex((c) => c.id === over.id);
        const newCards = arrayMove(sourceCards, movingCardIndex, overIndex >= 0 ? overIndex : destinationCards.length);
        return {
          ...prevData,
          lists: {
            ...prevData.lists,
            [sourceListId]: { ...prevData.lists[sourceListId], cards: newCards },
          },
        };
      } else {
        const overIndex =
          over.id === destinationListId
            ? destinationCards.length
            : destinationCards.findIndex((c) => c.id === over.id);
        destinationCards.splice(overIndex >= 0 ? overIndex : destinationCards.length, 0, movingCard);

        return {
          ...prevData,
          lists: {
            ...prevData.lists,
            [sourceListId]: { ...prevData.lists[sourceListId], cards: sourceCards },
            [destinationListId]: { ...prevData.lists[destinationListId], cards: destinationCards },
          },
        };
      }
    });
  };

  const handleCardClick = (card: Card) => setModal(true);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 overflow-hidden relative">
      <Navbar />
      <div className={`w-full max-w-[1600px] mx-auto mt-4 sm:mt-6 md:mt-8 px-4 ${Modal ? 'blur-sm pointer-events-none select-none' : ''}`}>
        <ProductionHeader />

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div
            ref={scrollContainerRef}
            className="flex flex-col sm:flex-row gap-4 py-6 overflow-x-auto sm:overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'auto',
              overscrollBehaviorX: 'contain',
              touchAction: 'pan-x pan-y',
            }}
          >
            <SortableContext items={data.listOrder} strategy={verticalListSortingStrategy}>
              {data.listOrder.map((listId) => {
                const list = data.lists[listId];
                if (!list) return null;
                return <SortableList key={listId} list={list} onCardClick={handleCardClick} />;
              })}
            </SortableContext>

            <div className="flex-shrink-0">
              <div className="bg-white rounded-lg p-3 w-[90vw] sm:w-[300px] md:w-[320px] flex items-center justify-center text-gray-500 font-medium hover:bg-gray-50 cursor-pointer border-2 border-dashed border-gray-200">
                + Add another list
              </div>
            </div>
          </div>

          <DragOverlay>
            {activeCard && (
              <div className="bg-white rounded-lg shadow-md p-3 cursor-grabbing border border-gray-200 opacity-90">
                {activeCard.image && (
                  <img src={activeCard.image} alt={activeCard.title} className="w-full h-32 object-cover rounded-md mb-2" />
                )}
                <h4 className="font-bold text-base mb-1 text-black truncate">{activeCard.title}</h4>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{activeCard.description}</p>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      {Modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <PreWeddingModal  setModal={setModal} Modal={Modal}/>
          <div
            className="fixed inset-0 bg-black opacity-30"
            onClick={() => setModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductionPage;
