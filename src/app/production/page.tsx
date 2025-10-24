/** @format */

'use client';

import React, { useState, useCallback, memo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GrAttachment } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import Navbar from '@/app/components/Navbar'; // Adjust path based on your project structure
import ProductionHeader from '@/app/components/productionHeader'; // Adjust path

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

const initialData: InitialData = {
  lists: {
    pending: {
      id: 'pending',
      title: 'Pending',
      cards: [
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
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
          id: '550e8400-e29b-41d4-a716-446655440002',
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
          id: '550e8400-e29b-41d4-a716-446655440003',
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
          id: '550e8400-e29b-41d4-a716-446655440004',
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
          id: '550e8400-e29b-41d4-a716-446655440005',
          title: 'Proposal Shoot - Michael & Lisa',
          label: 'MICHAEL JOHNSON',
          date: 'OCT 1, 2025',
          description: 'Highlight Reel (2 min), Full Edited Footage (45 min)',
          attachments: 6,
          comments: 10,
          members: ['user6'],
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440006',
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

// Modal Component
const Modal: React.FC<{ card: Card; listId: string; onClose: () => void }> = ({
  card,
  listId,
  onClose,
}) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission logic here
    setComment('');
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
      onClick={onClose}>
      <div
        className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative flex flex-col md:flex-row gap-6'
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'>
          <IoClose size={24} />
        </button>
        <div className='w-full md:w-2/3'>
          <div
            className={`text-white text-sm px-2 py-1 rounded mb-2 ${
              listId === 'pending'
                ? 'bg-gray-400'
                : listId === 'in-progress'
                ? 'bg-yellow-400'
                : 'bg-green-400'
            }`}>
            {listId.toUpperCase()}
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

// Sortable List Component
const SortableList = memo(
  ({
    list,
    onCardClick,
  }: {
    list: List;
    onCardClick: (card: Card, listId: string) => void;
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: list.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.8 : 1,
    };

    const getTitleStyles = (title: string) => {
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
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className='bg-white rounded-lg p-3 w-[280px] sm:w-[300px] md:w-[320px] flex-shrink-0 flex flex-col shadow-sm border border-gray-200'>
        <div className='flex justify-between items-center mb-3'>
          <div className='flex items-center'>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full mr-2 ${getTitleStyles(
                list.title
              )}`}>
              <span className='text-lg font-bold'>{list.cards.length}</span>
            </div>
            <h3 className='font-semibold text-lg text-black'>{list.title}</h3>
          </div>
          <button className='text-gray-500 hover:text-gray-700'>⋯</button>
        </div>
        <SortableContext
          items={list.cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}>
          <div className='flex-grow space-y-3 min-h-[200px] bg-gray-50 rounded-md p-2'>
            {list.cards.map((card) => (
              <SortableCard
                key={card.id}
                card={card}
                listId={list.id}
                onCardClick={onCardClick}
              />
            ))}
          </div>
        </SortableContext>
        <button className='w-full mt-3 text-center text-gray-500 py-2 border-t border-gray-200 hover:bg-gray-50 rounded-b-lg transition-colors'>
          + Add a card
        </button>
      </div>
    );
  }
);

// Sortable Card Component
const SortableCard = memo(
  ({
    card,
    listId,
    onCardClick,
  }: {
    card: Card;
    listId: string;
    onCardClick: (card: Card, listId: string) => void;
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: card.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.8 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`bg-white rounded-lg shadow-md p-3 cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-transparent ${
          isDragging
            ? 'shadow-xl scale-105 z-50 border-blue-300 bg-blue-50'
            : 'hover:border-gray-200'
        }`}
        onClick={(e) => {
          if (!isDragging) {
            onCardClick(card, listId);
          }
        }}>
        {card.image && (
          <img
            src={card.image}
            alt={card.title}
            className='w-full h-32 object-cover rounded-md mb-2'
          />
        )}
        <h4 className='font-bold text-base mb-1 text-black truncate'>
          {card.title}
        </h4>
        <div className='flex items-center mb-1 flex-wrap gap-1'>
          <span className='bg-[#E5F7FD] text-[#01B0E9] text-xs px-2 py-0.5 rounded-2xl'>
            {card.label}
          </span>
          <span className='text-red-500 text-[12px] bg-[#FCF3F1] px-2 py-0.5 rounded-2xl'>
            {card.date}
          </span>
        </div>
        <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
          {card.description}
        </p>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-2 text-gray-500 text-sm'>
            <div className='flex items-center gap-1'>
              <GrAttachment />
              <span>{card.attachments}</span>
            </div>
            <span>💬 {card.comments}</span>
          </div>
          <div className='flex -space-x-2'>
            {card.members.slice(0, 3).map((member) => (
              <img
                key={member}
                src='/teampic1.png'
                alt={member}
                className='w-6 h-6 rounded-full border-2 border-white'
              />
            ))}
            {card.members.length > 3 && (
              <div className='w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-600'>
                +{card.members.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

// Drag Overlay Component
const DragOverlayCard = memo(({ card }: { card: Card }) => (
  <div className='bg-white rounded-lg shadow-xl p-3 w-[280px] border-2 border-blue-300 '>
    <h4 className='font-bold text-base mb-1 text-black truncate'>
      {card.title}
    </h4>
    <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
      {card.description}
    </p>
    <div className='flex justify-between items-center'>
      <span className='text-gray-500 text-sm'>Dragging...</span>
      <div className='flex -space-x-1'>
        {card.members.slice(0, 2).map((_, i) => (
          <img
            key={i}
            src='/teampic1.png'
            alt='member'
            className='w-5 h-5 rounded-full border-2 border-white'
          />
        ))}
      </div>
    </div>
  </div>
));

const ProductionPage: React.FC = () => {
  const [data, setData] = useState<InitialData>(initialData);
  const [selectedCard, setSelectedCard] = useState<{
    card: Card;
    listId: string;
  } | null>(null);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;

      if (!over) {
        setActiveCard(null);
        return;
      }

      const sourceListId = Object.keys(data.lists).find((listId) =>
        data.lists[listId].cards.some((card) => card.id === active.id)
      );
      if (!sourceListId) {
        setActiveCard(null);
        return;
      }

      // Determine destination list ID
      let destListId: string | undefined;
      if (data.listOrder.includes(over.id)) {
        // Dropped directly on a list
        destListId = over.id;
      } else {
        // Dropped on a card, find its parent list
        destListId = Object.keys(data.lists).find((listId) =>
          data.lists[listId].cards.some((card) => card.id === over.id)
        );
      }

      if (!destListId) {
        setActiveCard(null);
        return;
      }

      const sourceList = data.lists[sourceListId];
      const destList = data.lists[destListId];

      if (sourceListId === destListId) {
        // Reorder within the same list
        const oldIndex = sourceList.cards.findIndex(
          (card) => card.id === active.id
        );
        const newIndex =
          over.id === destListId
            ? sourceList.cards.length
            : sourceList.cards.findIndex((card) => card.id === over.id);
        if (newIndex === -1) return; // Invalid drop
        const newCards = arrayMove(sourceList.cards, oldIndex, newIndex);

        setData((prev) => ({
          ...prev,
          lists: {
            ...prev.lists,
            [sourceListId]: { ...sourceList, cards: newCards },
          },
        }));
      } else {
        // Move to a different list
        const sourceCards = [...sourceList.cards];
        const destCards = [...destList.cards];
        const sourceIndex = sourceCards.findIndex(
          (card) => card.id === active.id
        );
        const [movedCard] = sourceCards.splice(sourceIndex, 1);
        const destIndex =
          over.id === destListId
            ? destCards.length
            : destCards.findIndex((card) => card.id === over.id);
        const finalDestIndex = destIndex >= 0 ? destIndex : destCards.length;
        destCards.splice(finalDestIndex, 0, movedCard);

        setData((prev) => ({
          ...prev,
          lists: {
            ...prev.lists,
            [sourceListId]: { ...sourceList, cards: sourceCards },
            [destListId]: { ...destList, cards: destCards },
          },
        }));
      }

      setActiveCard(null);
    },
    [data]
  );

  const handleDragStart = useCallback(
    (event: any) => {
      const { active } = event;
      const sourceListId = Object.keys(data.lists).find((listId) =>
        data.lists[listId].cards.some((card) => card.id === active.id)
      );
      const card = data.lists[sourceListId!].cards.find(
        (c) => c.id === active.id
      );
      setActiveCard(card || null);
    },
    [data]
  );

  const handleCardClick = useCallback((card: Card, listId: string) => {
    setSelectedCard({ card, listId });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCard(null);
  }, []);

  return (
    <div className='min-h-screen w-full flex flex-col bg-gray-100'>
      <Navbar />
      <div className='w-full max-w-[1600px] mx-auto mt-6 md:mt-8 lg:mt-10 px-4'>
        <ProductionHeader />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}>
          <div className='flex flex-row gap-4 py-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent snap-x snap-mandatory'>
            {data.listOrder.map((listId) => (
              <SortableContext
                key={listId}
                items={[listId, ...data.lists[listId].cards.map((c) => c.id)]}>
                <SortableList
                  list={data.lists[listId]}
                  onCardClick={handleCardClick}
                />
              </SortableContext>
            ))}
            <div className='snap-start flex-shrink-0'>
              <div className='bg-white rounded-lg p-3 w-[280px] sm:w-[300px] md:w-[320px] flex items-center justify-center text-gray-500 font-medium hover:bg-gray-50 cursor-pointer border-2 border-dashed border-gray-300'>
                + Add another list
              </div>
            </div>
          </div>
          <DragOverlay dropAnimation={null}>
            {activeCard ? <DragOverlayCard card={activeCard} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
      {selectedCard && (
        <Modal
          card={selectedCard.card}
          listId={selectedCard.listId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductionPage;
