/** @format */

'use client';

import React, { useState, useEffect, memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { BiPencil } from 'react-icons/bi';
import { GrAttachment } from 'react-icons/gr';
import { LiaComment } from 'react-icons/lia';
import Image from 'next/image';
import { colors } from '@/utils/colors';
import EditTeamModal from '../EditTeam';
import { Card } from '../../production/types';

interface SortableCardProps {
  card: Card;
  onClick?: () => void;
  menuCardId: string | null;
  setMenuCardId: React.Dispatch<React.SetStateAction<string | null>>;
  onUpdateCard?: (updated: Card) => void;
  columnColor?: string;
}

const SortableCard = memo(
  ({
    card,
    onClick,
    menuCardId,
    setMenuCardId,
    onUpdateCard,
    columnColor,
  }: SortableCardProps) => {
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

    return (
      <div>
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          onClick={onClick}
          className={`group bg-white rounded-lg p-3 overflow-visible transition-all duration-200 border cursor-grab active:cursor-grabbing ${isDragging
            ? 'opacity-40'
            : 'border-gray-200'
            } ${menuCardId === card.id ? 'ring-2 ring-[#01B0E9] ring-offset-2 !z-[2000]' : ''
            }`}
          style={{
            ...style,
            borderColor: isDragging ? columnColor : undefined,
            backgroundColor: isDragging ? `${columnColor}0D` : undefined,
            outlineColor: !isDragging ? `${columnColor}66` : undefined,
          }}
        >
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
                    className={`p-2 px-4 rounded-xl cursor-pointer w-max text-left text-[14px] font-medium shadow-lg transition-all duration-200 bg-white border-2 ${activeButton === btn.label
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
                      <p className="text-[10px] uppercase font-medium text-gray-400 mb-2">Select Date</p>
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
                setMenuCardId(card.id);
                setActiveButton(null);
              }}
            />
          </div>
          <h4 className='font-medium text-base mb-1 text-black truncate'>
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
              className='py-2.5 px-8 rounded-lg text-white font-medium text-sm shadow-xl absolute -bottom-[70px] left-0 hover:scale-105 active:scale-95 transition-all duration-200 z-[3000]'
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

SortableCard.displayName = 'SortableCard';

export default SortableCard;
