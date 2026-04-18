/** @format */

'use client';

import React, {
  useRef,
  useLayoutEffect,
  useState,
  memo,
  useEffect,
  useMemo,
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
import { colors } from '@/utils/colors';

import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
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
import { AiOutlineSearch as Search, AiOutlineClose as X, AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { TbZoomReset } from 'react-icons/tb';
import FilterModal from '../components/FilterModal';
import { getItemDate } from '@/utils/TableUtils';
import { Layout, MousePointer2, Plus, ListPlus, Kanban, TextSelect, ClipboardList } from 'lucide-react';

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
  color?: string;
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
      color: '#00A4DD',
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
          members: ['Sarah Johnson'],
          image: '/images/prodCardImg.png',
        },
      ],
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      color: '#FFC700',
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
          members: ['Mike Chen'],
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
          members: ['Mike Chen', 'Anna David'],
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
    onUpdateCard,
    columnColor,
  }: {
    card: Card;
    onClick?: () => void;
    menuCardId: string | null;
    setMenuCardId: React.Dispatch<React.SetStateAction<string | null>>;
    onUpdateCard?: (updated: Card) => void;
    columnColor?: string;
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({
        id: card.id,
        disabled: !!menuCardId && menuCardId === card.id,
        data: {
          type: 'Card',
          card,
          columnColor
        }
      });

    const style: any = {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      transition,
      zIndex: menuCardId === card.id ? 2000 : (isDragging ? 1000 : 1),
      position: menuCardId === card.id ? 'relative' : 'static',
    };
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [teamModal, setTeamModal] = useState(false);

    useEffect(() => {
      if (menuCardId !== card.id) {
        setTeamModal(false);
        setActiveButton(null);
      }
    }, [menuCardId, card.id]);

    const handleClick = (buttonName: any) => {
      setActiveButton(buttonName);
    };

    return (
      <div>
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          onClick={onClick}
          className={`group bg-white rounded-lg shadow-md p-3 overflow-visible transition-all duration-200 border cursor-grab active:cursor-grabbing ${isDragging
            ? 'opacity-40'
            : 'border-gray-200 hover:shadow-lg'
            } ${menuCardId === card.id ? 'ring-2 ring-[#01B0E9] ring-offset-2 !z-[2000]' : ''
            }`}
          style={{
            ...style,
            borderColor: isDragging ? columnColor : undefined,
            backgroundColor: isDragging ? `${columnColor}0D` : undefined,
            outlineColor: !isDragging ? `${columnColor}66` : undefined,
          }}
        >
          {/* Menu Content */}
          {/* Quick Edit Side Menu */}
          {menuCardId === card.id && (
            <div
              className='flex gap-2 text-left flex-col absolute left-[calc(100%+12px)] top-0 w-max z-[3000]'
              onClick={(e) => e.stopPropagation()}>
              {[
                { label: 'Open Card', action: onClick },
                { label: 'Change Members', action: () => { setActiveButton('Change Members'); setTeamModal(true); } },
                {
                  label: 'Change Cover',
                  action: () => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e: any) => {
                      const file = e.target.files[0];
                      if (file && onUpdateCard) {
                        onUpdateCard({ ...card, image: URL.createObjectURL(file) });
                        setMenuCardId(null);
                      }
                    };
                    input.click();
                  }
                },
                { label: 'Edit Dates', action: () => setActiveButton(activeButton === 'Edit Dates' ? null : 'Edit Dates') }
              ].map((btn, idx) => (
                <div key={idx} className="relative group/btn">
                  <button
                    className={`p-2 px-4 rounded-xl cursor-pointer w-max text-left text-[14px] font-semibold shadow-lg transition-all duration-200 bg-white border-2 ${activeButton === btn.label
                      ? 'text-[#01B0E9] border-[#01B0E9]'
                      : 'text-gray-800 border-transparent hover:border-gray-100'
                      }`}
                    onClick={() => {
                      btn.action?.();
                    }}>
                    {btn.label}
                  </button>
                  {btn.label === 'Edit Dates' && activeButton === 'Edit Dates' && (
                    <div className="absolute top-11 right-0 bg-white p-3 border border-gray-200 rounded-xl shadow-xl z-[4000] w-full" onClick={e => e.stopPropagation()}>
                      <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Select Date</p>
                      <input
                        type="date"
                        className="w-full border rounded-lg p-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#01B0E9]/20"
                        onChange={(e) => {
                          if (onUpdateCard && e.target.value) {
                            const formatted = new Date(e.target.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
                            onUpdateCard({ ...card, date: formatted });
                            setMenuCardId(null);
                          }
                        }}
                      />
                    </div>
                  )}
                  {btn.label === 'Change Members' && teamModal && (
                    <div
                      className="absolute top-11 right-0 z-[4000] h-[400px] w-80 "
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EditTeamModal
                        setTeamModal={setTeamModal}
                        currentMembers={card.members}
                        onUpdateMembers={(newMembers: string[]) => {
                          onUpdateCard && onUpdateCard({ ...card, members: newMembers });
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
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
            <span className='text-xs sm:text-sm rounded-full px-1 py-0.5' style={{ color: colors.primary, backgroundColor: `${colors.primary}26` }}>
              {card.label}
            </span>
            <span className='text-[#D66C55] text-xs sm:text-sm bg-[#D66C55]/15 rounded-full px-1  py-0.5'>
              {card.date}
            </span>
          </div>
          <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
            {card.description}
          </p>
          <div className='w-full flex items-center justify-between px-2 pb-1'>
            <div className='icons flex items-center gap-3'>
              <div className='flex items-center gap-1.5 text-gray-400'>
                <GrAttachment className='w-4 h-4' />
                <span className="text-xs font-medium">{card.attachments}</span>
              </div>
              <div className='flex items-center gap-1.5 text-gray-400'>
                <LiaComment className='w-5 h-5' />
                <span className="text-xs font-medium">{card.comments}</span>
              </div>
            </div>
            <div className='images flex items-center -space-x-2'>
              <Image
                src='/teampic1.png'
                alt='Team member 1'
                width={24}
                height={24}
                className='w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-100'
              />
              <Image
                src='/teampic2.png'
                alt='Team member 2'
                width={24}
                height={24}
                className='w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-100'
              />
            </div>
          </div>
          {menuCardId === card.id && (
            <button
              className='py-2.5 px-8 rounded-lg text-white font-bold text-sm shadow-xl absolute -bottom-[70px] left-0 hover:scale-105 active:scale-95 transition-all duration-200 z-[3000]'
              style={{ backgroundColor: '#01B0E9' }}
              onClick={(e) => { e.stopPropagation(); setMenuCardId(null); }}
            >
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
    onAddCard,
    onUpdateCard,
    onDeleteList,
    onUpdateColor,
  }: {
    list: List;
    onCardClick: (card: Card) => void;
    menuCardId: string | null;
    setMenuCardId: React.Dispatch<React.SetStateAction<string | null>>;
    onAddCard: (listId: string, card: Card) => void;
    onUpdateCard?: (listId: string, card: Card) => void;
    onDeleteList?: (listId: string) => void;
    onUpdateColor?: (listId: string, color: string) => void;
  }) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
      id: list.id,
      data: {
        type: 'Column',
        list,
      },
    });

    const style = {
      transition,
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(list.title);
    const [originalTitle, setOriginalTitle] = useState(list.title);
    const [titleError, setTitleError] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const cards = Array.isArray(list?.cards) ? list.cards : [];

    // Color picker state
    const color = list.color || '#13CC95';
    const [showColorPicker, setShowColorPicker] = useState(false);

    const beautifulColors = [
      '#00A4DD', // Blue
      '#FFC700', // Yellow
      '#13CC95', // Green
      '#FF5733', // Red
      '#9B59B6', // Purple
      '#E84393', // Pink
    ];

    // Add-card form state
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [newCardLabel, setNewCardLabel] = useState('');
    const [newCardDate, setNewCardDate] = useState('');
    const [newCardDesc, setNewCardDesc] = useState('');
    const [newCardTitleError, setNewCardTitleError] = useState(false);
    const [newCardImageFile, setNewCardImageFile] = useState<File | null>(null);
    const [newCardImageUrl, setNewCardImageUrl] = useState<string | undefined>(undefined);
    const addCardTitleRef = React.useRef<HTMLInputElement>(null);
    const addCardImageRef = React.useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      // revoke old URL to avoid memory leaks
      if (newCardImageUrl) URL.revokeObjectURL(newCardImageUrl);
      setNewCardImageFile(file);
      setNewCardImageUrl(URL.createObjectURL(file));
    };

    const removeImage = () => {
      if (newCardImageUrl) URL.revokeObjectURL(newCardImageUrl);
      setNewCardImageFile(null);
      setNewCardImageUrl(undefined);
      if (addCardImageRef.current) addCardImageRef.current.value = '';
    };

    const handleAddCard = () => {
      if (!newCardTitle.trim()) {
        setNewCardTitleError(true);
        addCardTitleRef.current?.focus();
        return;
      }
      const newCard: Card = {
        id: `card-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: newCardTitle.trim(),
        label: newCardLabel.trim() || 'NEW CLIENT',
        date: newCardDate
          ? new Date(newCardDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
          : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
        description: newCardDesc.trim() || 'No description provided.',
        attachments: 0,
        comments: 0,
        members: [],
        image: newCardImageUrl,
      };
      onAddCard(list.id, newCard);
      setNewCardTitle('');
      setNewCardLabel('');
      setNewCardDate('');
      setNewCardDesc('');
      setNewCardImageFile(null);
      setNewCardImageUrl(undefined);
      setNewCardTitleError(false);
      setIsAddingCard(false);
    };

    return (
      <div
        ref={setNodeRef}
        className={`group/list rounded-lg p-3 w-[90vw] sm:w-[300px] md:w-[370px] flex-shrink-0 relative flex flex-col shadow-sm border ${isDragging ? 'opacity-50' : 'border-gray-200 bg-gray-50'
          }`}
        style={{
          ...style,
          borderColor: isDragging ? color : undefined,
          backgroundColor: isDragging ? `${color}0D` : undefined,
        }}
      >
        <div
          className='flex justify-between items-center mb-3 cursor-grab hover:bg-gray-200/50 rounded-md p-1 -m-1'
          {...attributes}
          {...listeners}
        >
          <h3 className='font-semibold text-lg text-black flex items-center gap-6'>
            <div className="relative">
              <BiPlus
                size={20}
                className="p-2 rounded-full w-9 text-2xl h-9 cursor-pointer transition-colors duration-300"
                style={{ color, backgroundColor: `${color}1A` }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
              {showColorPicker && (
                <div
                  className="absolute top-10 left-0 bg-white p-2 rounded-md shadow-lg border border-gray-100 flex gap-2 z-[3000]"
                  onClick={e => e.stopPropagation()}
                >
                  {beautifulColors.map(c => (
                    <div
                      key={c}
                      className="w-5 h-5 rounded-full cursor-pointer hover:scale-125 transition-transform"
                      style={{ backgroundColor: c }}
                      onClick={() => { onUpdateColor?.(list.id, c); setShowColorPicker(false); }}
                    />
                  ))}
                </div>
              )}
            </div>
            {isEditing ? (
              <div className="flex flex-col gap-1">
                <input
                  ref={inputRef}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (e.target.value.trim()) setTitleError(false);
                  }}
                  onBlur={() => {
                    if (!title.trim()) {
                      setTitleError(true);
                      // Keep editing and refocus after blur
                      setTimeout(() => inputRef.current?.focus(), 0);
                      return;
                    }
                    setIsEditing(false);
                    setTitleError(false);
                    setOriginalTitle(title.trim());
                    list.title = title.trim();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (!title.trim()) {
                        setTitleError(true);
                        return;
                      }
                      setIsEditing(false);
                      setTitleError(false);
                      setOriginalTitle(title.trim());
                      list.title = title.trim();
                    } else if (e.key === 'Escape') {
                      setTitle(originalTitle);
                      setTitleError(false);
                      setIsEditing(false);
                    }
                  }}
                  autoFocus
                  className={`border px-2 py-1 rounded text-sm w-36 focus:outline-none transition-colors ${titleError
                    ? 'border-red-500 bg-red-50 focus:ring-1 focus:ring-red-400'
                    : 'border-blue-400 focus:ring-1 focus:ring-blue-300'
                    }`}
                />
                {titleError && (
                  <span className="text-red-500 text-xs font-medium animate-pulse">
                    ⚠ Title cannot be empty
                  </span>
                )}
              </div>
            ) : (
              <span
                onDoubleClick={() => {
                  setOriginalTitle(title);
                  setIsEditing(true);
                }}
                title="Double-click to edit"
                className="cursor-text hover:underline hover:decoration-dashed"
              >
                {title}
              </span>
            )}
          </h3>
          <div className='flex items-center gap-2'>
            <span className='text-gray-500 text-sm pointer-events-none'>{cards.length}</span>
            {confirmDelete ? (
              <div
                className="flex items-center gap-1 bg-red-50 border border-red-200 rounded-md px-2 py-0.5"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <span className="text-xs text-red-600 font-medium">Delete?</span>
                <button
                  className="text-xs text-white bg-red-500 hover:bg-red-600 px-1.5 py-0.5 rounded cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); onDeleteList?.(list.id); }}
                >Yes</button>
                <button
                  className="text-xs text-gray-600 hover:bg-gray-100 px-1.5 py-0.5 rounded cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setConfirmDelete(false); }}
                >No</button>
              </div>
            ) : (
              <button
                className="opacity-0 group-hover/list:opacity-100 transition-opacity p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 cursor-pointer"
                title="Delete list"
                onClick={(e) => { e.stopPropagation(); setConfirmDelete(true); }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <SortableContext
          items={cards.map((c) => c?.id).filter(Boolean)}
          strategy={verticalListSortingStrategy}>
          <div
            className={`flex-grow space-y-3 min-h-[200px] rounded-md p-2 bg-transparent`}>
            {cards.map(
              (card) =>
                card && (
                  <SortableCard
                    key={card.id}
                    card={card}
                    onClick={() => onCardClick(card)}
                    menuCardId={menuCardId}
                    setMenuCardId={setMenuCardId}
                    onUpdateCard={(updated) => onUpdateCard && onUpdateCard(list.id, updated)}
                  />
                )
            )}
            {cards.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 bg-white/40 border-2 border-dashed border-gray-200 rounded-xl space-y-3 transition-all duration-300 hover:border-[#01B0E9]/30 hover:bg-white/60 group/empty">
                <div className="p-3 bg-gray-50 rounded-full text-gray-400 group-hover/empty:text-[#01B0E9] group-hover/empty:bg-[#01B0E9]/5 transition-colors">
                  <ClipboardList size={24} strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">No cards yet</p>
                  <p className="text-xs text-gray-400 mt-1">Drag cards here or add new ones</p>
                </div>
              </div>
            )}
          </div>
        </SortableContext>

        {isAddingCard ? (
          <div
            className="mt-3 bg-white rounded-lg shadow-sm border border-blue-300 p-3 flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title - Required */}
            <div>
              <input
                ref={addCardTitleRef}
                type="text"
                value={newCardTitle}
                onChange={(e) => {
                  setNewCardTitle(e.target.value);
                  if (e.target.value.trim()) setNewCardTitleError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddCard();
                  if (e.key === 'Escape') {
                    setIsAddingCard(false);
                    setNewCardTitle('');
                    setNewCardTitleError(false);
                  }
                }}
                autoFocus
                placeholder="Card title (required)"
                className={`w-full border rounded-md px-2 py-1.5 text-sm font-semibold focus:outline-none transition-colors ${newCardTitleError
                  ? 'border-red-500 bg-red-50 focus:ring-1 focus:ring-red-400'
                  : 'border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-200'
                  }`}
              />
              {newCardTitleError && (
                <p className="text-red-500 text-xs mt-0.5">⚠ Title is required</p>
              )}
            </div>

            {/* Label / Client Name */}
            <input
              type="text"
              value={newCardLabel}
              onChange={(e) => setNewCardLabel(e.target.value)}
              placeholder="Client name (e.g. SARAH JOHNSON)"
              className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-colors"
            />

            {/* Date */}
            <input
              type="date"
              value={newCardDate}
              onChange={(e) => setNewCardDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-colors"
            />

            {/* Description */}
            <textarea
              value={newCardDesc}
              onChange={(e) => setNewCardDesc(e.target.value)}
              placeholder="Description (optional)"
              rows={2}
              className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm resize-none focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-colors"
            />
            {/* Image Upload */}
            <div>
              <p className="text-xs text-gray-500 mb-1 font-medium">Cover Image (optional)</p>
              {newCardImageUrl ? (
                <div className="relative rounded-md overflow-hidden">
                  <img
                    src={newCardImageUrl}
                    alt="Card cover preview"
                    className="w-full h-28 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-black/80 transition-colors cursor-pointer"
                    title="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => addCardImageRef.current?.click()}
                  className="w-full h-20 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-blue-400 hover:text-blue-400 transition-colors cursor-pointer text-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Upload cover image</span>
                </button>
              )}
              <input
                ref={addCardImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={handleAddCard}
                className="px-3 py-1.5 text-white text-sm font-medium rounded-md transition-colors cursor-pointer"
                style={{ backgroundColor: colors.primary }}
              >
                Add Card
              </button>
              <button
                onClick={() => {
                  setIsAddingCard(false);
                  setNewCardTitle('');
                  setNewCardLabel('');
                  setNewCardDate('');
                  setNewCardDesc('');
                  removeImage();
                  setNewCardTitleError(false);
                }}
                className="px-3 py-1.5 text-gray-500 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingCard(true)}
            className='w-full mt-3 text-center text-gray-500 py-2 border-t border-gray-200 hover:bg-gray-50 rounded-b-lg transition-colors'
          >
            + Add a card
          </button>
        )}
      </div>
    );
  }
);

// --- Main Page ---
const ProductionPage: React.FC = () => {
  const [data, setData] = useState<InitialData>(initialData);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [activeColumnColor, setActiveColumnColor] = useState<string | null>(null);
  const [modal, setModal] = useState<boolean | any>(false);

  // --- Multi-touch (Pinch Zoom) State ---
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStartDistRef = useRef<number>(0);
  const pinchStartScaleRef = useRef<number>(1);
  const pinchMidpointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollPosRef = useRef(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [menuCardId, setMenuCardId] = useState<string | null>(null);

  // --- Search & Filter State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState({
    status: [] as string[],
    selectedMembers: [] as { id: string, name: string }[],
    eventType: [] as string[],
    fromDate: "",
    toDate: "",
  });

  const [sortBy, setSortBy] = useState({ value: 'date', direction: 'asc' as 'asc' | 'desc' });

  // --- Canvas Zoom & Pan State ---
  const [targetScale, setTargetScale] = useState(1);
  const [scale, setScale] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const panXRef = useRef(0);
  const panYRef = useRef(0);
  const zoomContainerRef = useRef<HTMLDivElement | null>(null);
  const panStartRef = useRef({ x: 0, y: 0, startPanX: 0, startPanY: 0 });
  const targetScaleRef = useRef(1);
  const isSpaceDownRef = useRef(false);
  const [isSpaceDown, setIsSpaceDown] = useState(false);

  // Sync targetScaleRef with state
  useEffect(() => { targetScaleRef.current = targetScale; }, [targetScale]);

  // Smooth inertia: animate scale toward targetScale
  useEffect(() => {
    let frame: number;
    const animate = () => {
      setScale((prev) => {
        const diff = targetScaleRef.current - prev;
        if (Math.abs(diff) < 0.001) return targetScaleRef.current;
        return prev + diff * 0.12;
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Block browser zoom + handle Ctrl+Wheel canvas zoom (cursor-focused)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();

      const container = zoomContainerRef.current;
      if (!container) return;

      const zoomIntensity = 0.0005;
      const delta = -e.deltaY * zoomIntensity;
      const prevTarget = targetScaleRef.current;
      const newScale = Math.min(Math.max(0.2, prevTarget + delta), 2.5);
      if (Math.abs(newScale - prevTarget) < 0.0005) return;

      // Adjust pan so zoom stays focused on cursor position
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const cx = (mouseX - panXRef.current) / prevTarget;
      const cy = (mouseY - panYRef.current) / prevTarget;
      const newPanX = mouseX - cx * newScale;
      const newPanY = mouseY - cy * newScale;

      panXRef.current = newPanX;
      panYRef.current = newPanY;
      setPanX(newPanX);
      setPanY(newPanY);
      targetScaleRef.current = newScale;
      setTargetScale(newScale);
    };

    const preventGesture = (e: Event) => e.preventDefault();
    const preventKeyZoom = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ['=', '-', '+'].includes(e.key)) e.preventDefault();
    };

    document.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    document.addEventListener('gesturestart', preventGesture, { passive: false, capture: true });
    document.addEventListener('gesturechange', preventGesture, { passive: false, capture: true });
    document.addEventListener('keydown', preventKeyZoom, { passive: false, capture: true });
    return () => {
      document.removeEventListener('wheel', handleWheel, { capture: true } as EventListenerOptions);
      document.removeEventListener('gesturestart', preventGesture, { capture: true } as EventListenerOptions);
      document.removeEventListener('gesturechange', preventGesture, { capture: true } as EventListenerOptions);
      document.removeEventListener('keydown', preventKeyZoom, { capture: true } as EventListenerOptions);
    };
  }, []);

  // Spacebar hand tool (Figma-style)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        isSpaceDownRef.current = true;
        setIsSpaceDown(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpaceDownRef.current = false;
        setIsSpaceDown(false);
        setIsPanning(false);
      }
    };
    window.addEventListener('keydown', onKeyDown, { capture: true });
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown, { capture: true });
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // Pinch detection
    if (activePointersRef.current.size === 2) {
      const pts = Array.from(activePointersRef.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinchStartDistRef.current = dist;
      pinchStartScaleRef.current = targetScaleRef.current;

      const container = zoomContainerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        pinchMidpointRef.current = {
          x: (pts[0].x + pts[1].x) / 2 - rect.left,
          y: (pts[0].y + pts[1].y) / 2 - rect.top,
        };
      }
      setIsPanning(false); // Stop panning when pinching
    } else if ((isSpaceDownRef.current && e.button === 0) || e.button === 1 || (isTouchDevice && activePointersRef.current.size === 1)) {
      // Allow pan on touch devices even without space if it's the only pointer
      // However, we must be careful not to trigger pan when trying to drag a card.
      // For now, let's keep it restricted to space/middle-click OR single touch if we want.
      // Let's stick to the user's specific request for pinch-to-zoom.

      const isPanningButton = (isSpaceDownRef.current && e.button === 0) || e.button === 1;

      if (isPanningButton) {
        e.preventDefault();
        setIsPanning(true);
        panStartRef.current = {
          x: e.clientX,
          y: e.clientY,
          startPanX: panXRef.current,
          startPanY: panYRef.current,
        };
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointersRef.current.size === 2) {
      // Pinch to Zoom logic
      const pts = Array.from(activePointersRef.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);

      if (pinchStartDistRef.current > 10) {
        const zoomRatio = dist / pinchStartDistRef.current;
        const newScale = Math.min(Math.max(0.2, pinchStartScaleRef.current * zoomRatio), 2.5);

        // Use midpoint to keep zoom centered between fingers
        const midX = pinchMidpointRef.current.x;
        const midY = pinchMidpointRef.current.y;

        const prevScale = targetScaleRef.current;
        const cx = (midX - panXRef.current) / prevScale;
        const cy = (midY - panYRef.current) / prevScale;

        const newPanX = midX - cx * newScale;
        const newPanY = midY - cy * newScale;

        panXRef.current = newPanX;
        panYRef.current = newPanY;
        setPanX(newPanX);
        setPanY(newPanY);
        targetScaleRef.current = newScale;
        setTargetScale(newScale);
      }
      return;
    }

    if (!isPanning) return;
    e.preventDefault();
    const newPanX = panStartRef.current.startPanX + (e.clientX - panStartRef.current.x);
    const newPanY = panStartRef.current.startPanY + (e.clientY - panStartRef.current.y);
    panXRef.current = newPanX;
    panYRef.current = newPanY;
    setPanX(newPanX);
    setPanY(newPanY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    activePointersRef.current.delete(e.pointerId);

    if (activePointersRef.current.size < 2) {
      pinchStartDistRef.current = 0;
    }

    if (isPanning) {
      setIsPanning(false);
      try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch { }
    }
  };

  // -------------------------

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

  // --- Board Filtering Logic ---
  const filteredData = useMemo(() => {
    const result: InitialData = {
      lists: {},
      listOrder: data.listOrder,
    };

    data.listOrder.forEach(listId => {
      const list = data.lists[listId];

      // 1. Filter by column status if selected
      if (filters.status.length > 0 && !filters.status.map(s => s.toLowerCase()).includes(list.title.toLowerCase())) {
        result.lists[listId] = { ...list, cards: [] }; // Hide cards but keep column (as standard Kanban behavior)
        return;
      }

      const filteredCards = list.cards.filter(card => {
        // 2. Search filtering
        if (searchQuery.trim()) {
          const lower = searchQuery.toLowerCase();
          if (!card.title.toLowerCase().includes(lower) &&
            !card.label.toLowerCase().includes(lower) &&
            !card.description.toLowerCase().includes(lower)) return false;
        }

        // 3. Member filtering
        if (filters.selectedMembers.length > 0) {
          const names = filters.selectedMembers.map(m => m.name);
          if (!card.members.some(m => names.includes(m))) return false;
        }

        // 4. Event Type filtering
        if (filters.eventType.length > 0) {
          if (!filters.eventType.some(t => card.title.toLowerCase().includes(t.toLowerCase()))) return false;
        }

        // 5. Date Range Filtering
        if (filters.fromDate || filters.toDate) {
          const cardDate = new Date(card.date);
          if (isNaN(cardDate.getTime())) return true; // Keep if date is unparsable

          if (filters.fromDate) {
            const from = new Date(filters.fromDate);
            from.setHours(0, 0, 0, 0);
            if (cardDate < from) return false;
          }
          if (filters.toDate) {
            const to = new Date(filters.toDate);
            to.setHours(23, 59, 59, 999);
            if (cardDate > to) return false;
          }
        }

        return true;
      });

      // --- Add Sorting Logic ---
      filteredCards.sort((a, b) => {
        const { value, direction } = sortBy;
        let comparison = 0;

        if (value === 'date') {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          comparison = dateA - dateB;
        } else if (value === 'title' || value === 'label') {
          comparison = (a[value as 'title' | 'label'] || '').localeCompare(b[value as 'title' | 'label'] || '');
        }

        return direction === 'asc' ? comparison : -comparison;
      });

      result.lists[listId] = { ...list, cards: filteredCards };
    });

    return result;
  }, [data, searchQuery, filters]);

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

  const deleteList = (listId: string) => {
    setData((prevData) => {
      const newLists = { ...prevData.lists };
      delete newLists[listId];
      return {
        ...prevData,
        lists: newLists,
        listOrder: prevData.listOrder.filter((id) => id !== listId),
      };
    });
  };

  const handleDragStart = (event: DragEndEvent) => {
    const { active }: any = event;

    // Check if a list is being dragged
    if (data.listOrder.includes(active.id)) {
      return;
    }

    const sourceListId = Object.keys(data.lists).find((listId) =>
      data.lists[listId].cards.some((c) => c.id === active.id)
    );
    if (sourceListId) {
      const card = data.lists[sourceListId].cards.find(
        (c) => c.id === active.id
      );
      if (card) {
        setActiveCard(card);
        setActiveColumnColor(data.lists[sourceListId].color || '#13CC95');
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over }: any = event;
    setActiveCard(null);
    if (!over) return;
    if (active.id === over.id) return;

    // Handle column sort
    if (data.listOrder.includes(active.id)) {
      setData((prevData) => {
        const oldIndex = prevData.listOrder.indexOf(active.id);
        const newIndex = prevData.listOrder.indexOf(over.id);
        if (oldIndex === -1 || newIndex === -1) return prevData;
        return {
          ...prevData,
          listOrder: arrayMove(prevData.listOrder, oldIndex, newIndex)
        };
      });
      return;
    }

    let sourceListId: string | null = null;
    let destinationListId: string | null = null;

    for (const listId of data.listOrder) {
      if (data.lists[listId].cards.some((c) => c.id === active.id)) {
        sourceListId = listId;
        break;
      }
    }
    if (!sourceListId) return;

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
      if (movingCardIndex === -1) return prevData;

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

  const addCard = (listId: string, card: Card) => {
    setData((prev) => ({
      ...prev,
      lists: {
        ...prev.lists,
        [listId]: {
          ...prev.lists[listId],
          cards: [...prev.lists[listId].cards, card],
        },
      },
    }));
  };

  const updateCard = (listId: string, updatedCard: Card) => {
    setData((prev) => ({
      ...prev,
      lists: {
        ...prev.lists,
        [listId]: {
          ...prev.lists[listId],
          cards: prev.lists[listId].cards.map(c => c.id === updatedCard.id ? updatedCard : c),
        },
      },
    }));
  };

  const updateListColor = (listId: string, color: string) => {
    setData((prev) => ({
      ...prev,
      lists: {
        ...prev.lists,
        [listId]: {
          ...prev.lists[listId],
          color,
        },
      },
    }));
  };

  return (
    <div className='h-screen w-full flex flex-col bg-gray-100 overflow-hidden relative' style={{ touchAction: 'none', overscrollBehavior: 'none' }}>
      <Navbar />
      <div
        className={`w-full max-w-[1800px] mx-auto mt-2 sm:mt-4 md:mt-6 px-4 pt-2 sm:px-17 flex flex-col flex-1 h-full overflow-hidden ${modal ? 'blur-sm' : ''
          }`}
        style={{ touchAction: 'none', overscrollBehavior: 'none' }}>
        <ProductionHeader
          setOpenFilter={setOpenFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <ClientOnly>
          {/* Zoom Controls Overlay */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white p-2 rounded-full shadow-lg z-[2000] border border-gray-200">
            <button onClick={() => setTargetScale(s => Math.max(0.2, parseFloat((s - 0.1).toFixed(3))))} className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Zoom Out">
              <AiOutlineZoomOut size={20} className="text-gray-600" />
            </button>
            <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-center">
              {Math.round(targetScale * 100)}%
            </span>
            <button onClick={() => setTargetScale(s => Math.min(2.5, parseFloat((s + 0.1).toFixed(3))))} className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Zoom In">
              <AiOutlineZoomIn size={20} className="text-gray-600" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button onClick={() => {
              setTargetScale(1);
              targetScaleRef.current = 1;
              setPanX(0);
              setPanY(0);
              panXRef.current = 0;
              panYRef.current = 0;
            }} className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Reset Zoom & Position">
              <TbZoomReset size={20} className="text-gray-600" />
            </button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}>

            <div
              className={`w-full flex-1 overflow-hidden relative rounded-lg bg-gray-100/50`}
            >
              {/* Board Empty State - Moved outside panning container for true centering */}
              {filteredData.listOrder.length === 0 && (
                <div className="absolute inset-0 z-[1500] flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center max-w-sm text-center p-8 animate-in fade-in zoom-in duration-500">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-[#01B0E9]/10 blur-3xl rounded-full scale-150" />
                      <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
                        <Kanban size={64} strokeWidth={1} className="text-[#01B0E9]" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-gray-50">
                        <Plus size={20} strokeWidth={2.5} className="text-[#13CC95]" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 inter">Create your board</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                      Organize your production workflow by adding lists and cards. A fresh start for your next big project!
                    </p>
                    <button
                      onClick={addList}
                      className="pointer-events-auto flex items-center gap-2 px-6 py-3 bg-[#01B0E9] text-white rounded-full font-semibold shadow-lg shadow-[#01B0E9]/20 hover:bg-[#019cc7] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      <ListPlus size={20} />
                      Add your first list
                    </button>
                  </div>
                </div>
              )}

              {/* Outer Viewport – no scrollbars, Figma-style */}
              <div
                ref={zoomContainerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="flex-grow w-full overflow-hidden relative"
                style={{
                  touchAction: 'none',
                  userSelect: isPanning ? 'none' : 'auto',
                  cursor: isPanning ? 'grabbing' : isSpaceDown ? 'grab' : 'default',
                }}
              >
                {/* Inner canvas: translate for pan + scale for zoom */}
                <div
                  ref={scrollContainerRef}
                  className={`flex flex-nowrap items-start gap-5 lg:gap-7 lg:mx-0.5 py-6 origin-top-left${isPanning ? ' pointer-events-none' : ''}`}
                  style={{
                    transform: `translate(${panX}px, ${panY}px) scale(${scale})`,
                    transformOrigin: '0 0',
                    width: 'max-content',
                    minWidth: '100vw',
                    minHeight: '100vh',
                    willChange: 'transform',
                    paddingRight: '600px',
                    paddingBottom: '800px',
                  }}>
                  <SortableContext
                    items={filteredData.listOrder.filter((listId) => filteredData.lists[listId])}
                    strategy={rectSortingStrategy}>
                    {filteredData.listOrder
                      .filter((listId) => filteredData.lists[listId])
                      .map((listId) => (
                        <SortableList
                          key={listId}
                          list={filteredData.lists[listId]}
                          onCardClick={handleCardClick}
                          menuCardId={menuCardId}
                          setMenuCardId={setMenuCardId}
                          onAddCard={addCard}
                          onUpdateCard={updateCard}
                          onDeleteList={deleteList}
                          onUpdateColor={updateListColor}
                        />
                      ))}
                  </SortableContext>
                  {/* dimming overlay */}
                  {menuCardId && (
                    <div
                      className='absolute inset-[-50000px] bg-black/40 z-[1500]'
                      style={{ pointerEvents: 'auto' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuCardId(null);
                      }}
                    />
                  )}

                  <div
                    className={`${filteredData.listOrder.length === 0 ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'
                      } flex-shrink-0 bg-white rounded-lg p-4 w-[90vw] sm:w-[300px] md:w-[370px] flex flex-col max-h-20 items-center justify-center text-gray-500 font-medium hover:bg-gray-50 cursor-pointer border-2 border-dashed border-gray-200 transition-all duration-500`}
                    onClick={addList}>
                    <h3 className='w-full flex items-center gap-5 text-black pointer-events-none'>
                      <div className="p-2 rounded-full bg-[#13CC95]/10 text-[#13CC95]">
                        <Plus size={20} strokeWidth={2.5} />
                      </div>
                      Add another list
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <DragOverlay>
              {activeCard && (
                <div
                  className='bg-white rounded-lg shadow-2xl p-3 cursor-grabbing scale-105 transition-transform duration-200'
                >
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

      <FilterModal
        isOpen={openFilter}
        onClose={() => setOpenFilter(false)}
        isVisible={openFilter}
        setIsVisible={setOpenFilter}
        onApply={(newFilters) => setFilters(newFilters)}
      />

      {/* Remove previous global overlay from here */}

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
      <div className='pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 opacity-60'>
        <h1 className='text-sm text-[#919191] font-medium inter bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-100 shadow-sm'>
          Double Click the Card Title to Edit
        </h1>
      </div>
    </div>
  );
};

export default ProductionPage;
