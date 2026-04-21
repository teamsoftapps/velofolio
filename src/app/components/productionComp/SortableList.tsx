/** @format */

'use client';

import React, { useState, memo } from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { BiPlus } from 'react-icons/bi';
import { ClipboardList } from 'lucide-react';
import { colors } from '@/utils/colors';
import SortableCard from './SortableCard';
import { Card, List } from '../../production/types';

interface SortableListProps {
  list: List;
  onCardClick: (card: Card) => void;
  menuCardId: string | null;
  setMenuCardId: React.Dispatch<React.SetStateAction<string | null>>;
  onAddCard: (listId: string, card: Card) => void;
  onUpdateCard?: (listId: string, card: Card) => void;
  onDeleteList?: (listId: string) => void;
  onUpdateColor?: (listId: string, color: string) => void;
}

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
  }: SortableListProps) => {
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
        className={`group/list rounded-lg p-3 w-[90vw] sm:w-[300px] md:w-[370px] flex-shrink-0 relative flex flex-col  border ${isDragging ? 'opacity-50' : 'border-gray-200 bg-gray-50'
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
          <h3 className='font-medium text-lg text-black flex items-center gap-6'>
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
                className={`w-full border rounded-md px-2 py-1.5 text-sm font-medium focus:outline-none transition-colors ${newCardTitleError
                  ? 'border-red-500 bg-red-50 focus:ring-1 focus:ring-red-400'
                  : 'border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-200'
                  }`}
              />
              {newCardTitleError && (
                <p className="text-red-500 text-xs mt-0.5">⚠ Title is required</p>
              )}
            </div>

            <input
              type="text"
              value={newCardLabel}
              onChange={(e) => setNewCardLabel(e.target.value)}
              placeholder="Client name (e.g. SARAH JOHNSON)"
              className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-colors"
            />

            <input
              type="date"
              value={newCardDate}
              onChange={(e) => setNewCardDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-colors"
            />

            <textarea
              value={newCardDesc}
              onChange={(e) => setNewCardDesc(e.target.value)}
              placeholder="Description (optional)"
              rows={2}
              className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm resize-none focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-colors"
            />
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

SortableList.displayName = 'SortableList';

export default SortableList;
