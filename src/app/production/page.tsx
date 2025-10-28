/** @format */

'use client';

import React, {
  useRef,
  useLayoutEffect,
  useState,
  memo,
  useEffect,
} from 'react';
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
  TouchSensor
  

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
import { BiPencil, BiPlus } from 'react-icons/bi';
import { GrAttachment } from 'react-icons/gr';
import { LiaComment } from 'react-icons/lia';
import Image from 'next/image';
import { FaPenClip } from 'react-icons/fa6';
import EditTeamModal from '../components/EditTeam';
import {AiOutlineSearch as Search, AiOutlineClose as X} from 'react-icons/ai';
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
      ],
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        {
          id: 'card-2',
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
      ],
    },
    completed: {
      id: 'completed',
      title: 'Completed',
      cards: [
        {
          id: 'card-3',
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

// --- ClientOnly Component ---
const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className='w-full h-[200px] bg-gray-100 animate-pulse' />;
  }

  return <>{children}</>;
};

// --- Sortable Card ---

const SortableCard = memo(
  ({
    card,
    onClick,
    menuCardId,
    setMenuCardId,
  }: {
    card: Card;
    onClick?: () => void;
    menuCardId: string | null;
    setMenuCardId: React.Dispatch<React.SetStateAction<string | null>>;
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: card.id });

    const style:any = {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      transition,
      zIndex: menuCardId === card.id ? 1000 : 1, // Elevate active card above overlay
      position: menuCardId === card.id ? 'relative' : 'static', // Isolate active card
    };
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [teamModal, setTeamModal] = useState(false);

    const handleClick = (buttonName: any) => {
      setActiveButton(buttonName);
    };

    return (
      <div>
        <div
          style={style}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          onClick={onClick}
          className={`group bg-white rounded-lg shadow-md p-3 overflow-visible hover:outline-1 hover:outline-[#01B0E9]/70 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all duration-200 border border-gray-200 ${
            menuCardId === card.id ? 'z-[1000]' : ''
          }`}>
          {/* Menu Content */}
          {menuCardId === card.id && (
            <div
              className='flex gap-1 text-left flex-col z-100000 mb-3   fixed sm:absolute   right-10 w-[200px] h-[190px] top-36 bg-white sm:bg-transparent sm:-right-[250px] sm:top-20 sm:w-[250px] shadow-md rounded-md p-2  '
              onClick={(e) => e.stopPropagation()}>
              <button
                className={`p-2 rounded-md cursor-pointer w-28 text-left ${
                  activeButton === 'Open Card'
                    ? 'bg-[#00A4DD]  text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                onClick={onClick}>
                Open Card
              </button>

              <button
                className={`p-2 rounded-md cursor-pointer w-full text-left relative ${
                  activeButton === 'Change Members'
                    ? 'bg-[#00A4DD]  text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                onClick={() => {
                   setActiveButton('Change Members')
                    setTeamModal(true)
                    
                    }}>
                Change Members
              </button>
              {teamModal && (
                <div
    className="absolute top-24 sm:top-24 -left-2 sm:left-0 ml-2 z-[2000]  h-[400px] w-54 sm:w-80"
    onClick={(e) => e.stopPropagation()}
  >
    
      <EditTeamModal setTeamModal={setTeamModal} />

  </div>
              )}

              <button
                className={`p-2 rounded-md cursor-pointer w-32 text-left ${
                  activeButton === 'Change Cover'
                    ? 'bg-[#00A4DD]  text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                onClick={() => handleClick('Change Cover')}>
                Change Cover
              </button>

              <button
                className={`p-2 rounded-md cursor-pointer w-24 text-left ${
                  activeButton === 'Edit Dates'
                    ? 'bg-[#00A4DD]  text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                onClick={() => handleClick('Edit Dates')}>
                Edit Dates
              </button>
            </div>
          )}

          {/* Card Content */}
          <div className='w-full relative'>
            {card.image && (
              <img
                src={card.image}
                alt={card.title}
                className='w-full h-32 object-cover rounded-md mb-2'
              />
            )}
            <BiPencil
              className='absolute top-1 right-2 w-7 h-7 text-black/75 rounded-full p-1 bg-white opacity-25 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                console.log('Edit pencil clicked for', card.title);
                setTeamModal(false);
                setMenuCardId(card.id);
                setActiveButton(null);

              }}
            />
          </div>
          <h4 className='font-bold text-base mb-1 text-black truncate'>
            {card.title}
          </h4>
          <div className='flex items-center justify-between my-2 w-full'>
            <span className='text-[#01B0E9] text-xs sm:text-sm bg-[#01B0E9]/15 rounded-full px-1 py-0.5'>
              {card.label}
            </span>
            <span className='text-[#D66C55] text-xs sm:text-sm bg-[#D66C55]/15 rounded-full px-1  py-0.5'>
              {card.date}
            </span>
          </div>
          <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
            {card.description}
          </p>
          <div className='w-full flex items-center justify-between px-2'>
            <div className='icons w-full flex items-center gap-2'>
              <h3 className='flex items-center gap-2 text-gray-500'>
                <GrAttachment className='w-6 h-6 text-gray-500' />
                {card.attachments}
              </h3>
              <h3 className='flex items-center gap-2 text-gray-500'>
                <LiaComment className='w-6 h-6 text-gray-500' />
                {card.comments}
              </h3>
            </div>
            <div className='images flex items-center relative'>
              <Image
                src='/teampic1.png'
                alt='Team member 1'
                width={30}
                height={30}
                className='w-8 h-8 rounded-full absolute right-5'
              />
              <Image
                src='/teampic2.png'
                alt='Team member 2'
                width={30}
                height={30}
                className='w-8 h-8 rounded-full right-0'
              />
            </div>
          </div>
          {menuCardId === card.id && (
            <button className='bg-[#01B0E9] p-2 rounded-md text-white w-36 absolute -bottom-14 left-0'>
              Save
            </button>
          )}
        </div>
      </div>
    );
  }
);
// --- Sortable List ---
const SortableList = memo(
  ({
    list,
    onCardClick,
    menuCardId,
    setMenuCardId,
  }: {
    list: List;
    onCardClick: (card: Card) => void;
    menuCardId: string | null;
    setMenuCardId: React.Dispatch<React.SetStateAction<string | null>>;
  }) => {
    const { setNodeRef, isOver } = useDroppable({ id: list.id });

    const cards = Array.isArray(list?.cards) ? list.cards : [];

    return (
      <div
        ref={setNodeRef}
        className={`rounded-lg p-3  w-[90vw] sm:w-[300px] md:w-[370px] flex-shrink-0 relative flex flex-col shadow-sm border ${
          isOver ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
        }`}>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='font-semibold text-lg text-black flex items-center gap-6'>
            <BiPlus
              size={20}
              className={`${
                list.title === 'Pending'
                  ? 'text-[#00A4DD] bg-[#01B0E91A]'
                  : list.title === 'In Progress'
                  ? 'text-[#FFC700] bg-[#FFC7001A]'
                  : 'text-[#13CC95] bg-[#13CC95]/5'
              } p-2 rounded-full w-9 text-2xl h-9`}
            />
            {list.title}
          </h3>
          <span className='text-gray-500 text-sm'>{cards.length}</span>
        </div>

        <SortableContext
          items={cards.map((c) => c?.id).filter(Boolean)}
          strategy={verticalListSortingStrategy}>
          <div
            className={`flex-grow space-y-3 min-h-[200px] rounded-md p-2 ${
              isOver ? 'bg-blue-100' : 'bg-gray-50'
            }`}>
            {cards.map(
              (card) =>
                card && (
                  <>
                    <SortableCard
                      key={card.id}
                      card={card}
                      onClick={() => onCardClick(card)}
                      menuCardId={menuCardId}
                      setMenuCardId={setMenuCardId}
                    />
                  </>
                )
            )}
          </div>
        </SortableContext>

        <button className='w-full mt-3 text-center text-gray-500 py-2 border-t border-gray-200 hover:bg-gray-50 rounded-b-lg transition-colors'>
          + Add a card
        </button>
      </div>
    );
  }
);

// --- Main Page ---
const ProductionPage: React.FC = () => {
  const [data, setData] = useState<InitialData>(initialData);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [modal, setModal] = useState<boolean | any>(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollPosRef = useRef(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [menuCardId, setMenuCardId] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPosRef.current;
    }
  }, []);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: isTouchDevice
        ? { delay: 200, tolerance: 5 }
        : { distance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addList = () => {
    const newListId = `list-${Date.now()}-${Math.random()}`;
    setData((prevData) => ({
      ...prevData,
      lists: {
        ...prevData.lists,
        [newListId]: {
          id: newListId,
          title: `New List ${prevData.listOrder.length + 1}`,
          cards: [],
        },
      },
      listOrder: [...prevData.listOrder, newListId],
    }));
  };

  const handleDragStart = (event: DragEndEvent) => {
    const { active } = event;
    const sourceListId = Object.keys(data.lists).find((listId) =>
      data.lists[listId].cards.some((c) => c.id === active.id)
    );
    if (sourceListId) {
      const card = data.lists[sourceListId].cards.find(
        (c) => c.id === active.id
      );
      if (card) setActiveCard(card);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over }: any = event;
    if (active?.id === over?.id) return;
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
    if (!sourceListId) {
      console.error('Source list not found for active ID:', active.id);
      return;
    }

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
    if (!destinationListId) {
      console.error('Destination list not found for over ID:', over.id);
      return;
    }

    setData((prevData) => {
      const sourceCards = [...prevData.lists[sourceListId!].cards];
      const destinationCards = [...prevData.lists[destinationListId!].cards];
      const movingCardIndex = sourceCards.findIndex((c) => c.id === active.id);
      if (movingCardIndex === -1) {
        console.error('Moving card not found:', active.id);
        return prevData;
      }
      const movingCard = sourceCards.splice(movingCardIndex, 1)[0];

      if (sourceListId === destinationListId) {
        const cards = [...prevData.lists[sourceListId].cards];
        const oldIndex = cards.findIndex((c) => c.id === active.id);
        const newIndex = cards.findIndex((c) => c.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return prevData;

        const newCards = arrayMove(cards, oldIndex, newIndex);

        return {
          ...prevData,
          lists: {
            ...prevData.lists,
            [sourceListId]: {
              ...prevData.lists[sourceListId],
              cards: newCards,
            },
          },
        };
      } else {
        const overIndex =
          over.id === destinationListId
            ? destinationCards.length
            : destinationCards.findIndex((c) => c.id === over.id);
        destinationCards.splice(
          overIndex >= 0 ? overIndex : destinationCards.length,
          0,
          movingCard
        );

        return {
          ...prevData,
          lists: {
            ...prevData.lists,
            [sourceListId]: {
              ...prevData.lists[sourceListId],
              cards: sourceCards,
            },
            [destinationListId]: {
              ...prevData.lists[destinationListId],
              cards: destinationCards,
            },
          },
        };
      }
    });
  };

  const handleCardClick = (card: Card) => setModal(true);

  return (
    <div className='min-h-screen w-full flex flex-col bg-gray-100 overflow-hidden relative'>
      <Navbar />
      <div
        className={`w-full max-w-[1600px] mx-auto mt-4 sm:mt-6 md:mt-8 px-4 ${
          modal ? 'blur-sm' : ''
        }`}>
        <ProductionHeader />
        <ClientOnly>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}>
            <div
              ref={scrollContainerRef}
              className={`flex  sm:flex-row gap-5 lg:gap-7 lg:mx-0.5 py-6 overflow-x-auto sm:overflow-y-hidden ${menuCardId?"h-[650px] ":""}  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent`}
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'auto',
                overscrollBehaviorX: 'contain',
                touchAction: 'pan-x pan-y',
              }}>
              <SortableContext
                items={data.listOrder.filter((listId) => data.lists[listId])}
                strategy={verticalListSortingStrategy}>
                {data.listOrder
                  .filter((listId) => data.lists[listId])
                  .map((listId) => (
                    <SortableList
                      key={listId}
                      list={data.lists[listId]}
                      onCardClick={handleCardClick}
                      menuCardId={menuCardId}
                      setMenuCardId={setMenuCardId}
                    />
                  ))}
              </SortableContext>

              <div
                className='flex-shrink-0 bg-white rounded-lg p-4 w-[90vw] sm:w-[300px] md:w-[370px] flex flex-col max-h-20 items-center justify-center text-gray-500 font-medium hover:bg-gray-50 cursor-pointer border-2 border-dashed border-gray-200'
                onClick={addList}>
                <h3 className='w-full flex items-center gap-5 text-black'>
                  <BiPlus
                    size={20}
                    className='text-[#13CC95] bg-[#13CC95]/5 p-2 rounded-full w-9 text-2xl h-9'
                  />
                  Add another list
                </h3>
              </div>
            </div>

            <DragOverlay>
              {activeCard && (
                <div className='bg-white rounded-lg shadow-md p-3 cursor-grabbing border border-gray-200 opacity-90'>
                  {activeCard.image && (
                    <img
                      src={activeCard.image}
                      alt={activeCard.title}
                      className='w-full h-32 object-cover rounded-md mb-2'
                    />
                  )}
                  <h4 className='font-bold text-base mb-1 text-black truncate'>
                    {activeCard.title}
                  </h4>
                  <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
                    {activeCard.description}
                  </p>
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </ClientOnly>
      </div>

      {menuCardId && (
        <div
          className='fixed inset-0 bg-black/30  bg-opacity-30 z-1'
          onClick={() => {
            setMenuCardId(null);
          }}
        />
      )}

      {modal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <PreWeddingModal
            setModal={setModal}
            Modal={modal}
          />
          <div
            className='fixed inset-0 bg-black opacity-30'
            onClick={() => setModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductionPage;
