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
  closestCorners,
  rectIntersection,
  pointerWithin,
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
import Navbar from '@/app/components/layouts/Navbar';
import ProductionHeader from '@/app/components/layouts/productionHeader';
import PreWeddingModal from '@/app/components/forms/WeddingModal';
import { BiPencil, BiPlus } from 'react-icons/bi';
import { GrAttachment } from 'react-icons/gr';
import { LiaComment } from 'react-icons/lia';
import Image from 'next/image';
import { FaPenClip } from 'react-icons/fa6';
import EditTeamModal from '@/app/components/ui/EditTeam';
import { AiOutlineSearch as Search, AiOutlineClose as X, AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { TbZoomReset } from 'react-icons/tb';
import FilterModal from '@/app/components/forms/FilterModal';
import { getItemDate } from '@/utils/TableUtils';
import { Layout, MousePointer2, Plus, ListPlus, Kanban, TextSelect, ClipboardList } from 'lucide-react';

import { Card, List, InitialData } from './types';
import { initialData } from './data';
import SortableCard from '@/app/components/productionComp/SortableCard';
import SortableList from '@/app/components/productionComp/SortableList';
import ClientOnly from '@/app/components/productionComp/ClientOnly';

// --- Custom Modifiers ---
const snapCenterToCursor = ({ transform, activeNodeRect, initialCursorOffset }: any) => {
  if (!activeNodeRect || !initialCursorOffset) return transform;
  return {
    ...transform,
    x: transform.x + initialCursorOffset.x - activeNodeRect.width / 2,
    y: transform.y + initialCursorOffset.y - activeNodeRect.height / 2,
  };
};

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
  const [sortActive, setSortActive] = useState(false);

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


    if (activePointersRef.current.size === 2) {

      setMenuCardId(null);
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

      const isPanningButton = (isSpaceDownRef.current && e.button === 0) || e.button === 1;

      if (isPanningButton) {
        e.preventDefault();
        setMenuCardId(null);
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

        if (filters.eventType.length > 0) {
          if (!filters.eventType.some(t => card.title.toLowerCase().includes(t.toLowerCase()))) return false;
        }


        if (filters.fromDate || filters.toDate) {
          const cardDate = new Date(card.date);
          if (isNaN(cardDate.getTime())) return true;
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


      if (sortActive) {
        filteredCards.sort((a, b) => {
          const { value, direction } = sortBy;
          let comparison = 0;

          if (value === 'date') {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            const aValid = !isNaN(dateA);
            const bValid = !isNaN(dateB);
            if (!aValid && !bValid) comparison = 0;
            else if (!aValid) comparison = 1;
            else if (!bValid) comparison = -1;
            else comparison = dateA - dateB;
          } else if (value === 'title' || value === 'label') {
            comparison = (a[value as 'title' | 'label'] || '').localeCompare(b[value as 'title' | 'label'] || '');
          }

          return direction === 'asc' ? comparison : -comparison;
        });
      }

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
    setMenuCardId(null); // Clear any active quick-edit menu when dragging starts

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

    // Reset sort when user manually reorders
    setSortActive(false);

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
          setSortActive={setSortActive}
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
            collisionDetection={pointerWithin}
            measuring={{
              droppable: {
                strategy: 1, // MeasuringStrategy.Always
              },
            }}
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
                    <h2 className="text-2xl font-medium text-gray-900 mb-3 inter">Create your board</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                      Organize your production workflow by adding lists and cards. A fresh start for your next big project!
                    </p>
                    <button
                      onClick={addList}
                      className="pointer-events-auto flex items-center gap-2 px-6 py-3 bg-[#01B0E9] text-white rounded-full font-medium shadow-lg shadow-[#01B0E9]/20 hover:bg-[#019cc7] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
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

            <DragOverlay dropAnimation={null} modifiers={[snapCenterToCursor]}>
              {activeCard && (
                <div
                  className='bg-white rounded-lg shadow-2xl p-3 cursor-grabbing transition-transform duration-200 overflow-visible'
                  style={{
                    transform: `scale(${Math.max(scale, 0.6) * 1.05})`,
                    transformOrigin: 'center center',
                    width: typeof window !== 'undefined' && window.innerWidth < 640 ? 'calc(90vw - 24px)' : (window.innerWidth < 768 ? '276px' : '346px'),
                    borderColor: activeColumnColor ? activeColumnColor : undefined,
                    borderWidth: '1px',
                    boxSizing: 'border-box'
                  }}
                >
                  {activeCard.image && (
                    <img
                      src={activeCard.image}
                      alt={activeCard.title}
                      className='w-full h-32 object-cover rounded-md mb-2'
                    />
                  )}
                  <h4 className='font-medium text-base mb-1 text-black truncate'>
                    {activeCard.title}
                  </h4>
                  <div className='flex items-center justify-between my-2 w-full'>
                    <span className='text-xs sm:text-sm rounded-full px-1 py-0.5' style={{ color: colors.primary, backgroundColor: `${colors.primary}26` }}>
                      {activeCard.label}
                    </span>
                    <span className='text-[#D66C55] text-xs sm:text-sm bg-[#D66C55]/15 rounded-full px-1  py-0.5'>
                      {activeCard.date}
                    </span>
                  </div>
                  <p className='text-sm text-gray-600 mb-2 line-clamp-2'>
                    {activeCard.description}
                  </p>
                  <div className='w-full flex items-center justify-between px-2 pb-1'>
                    <div className='icons flex items-center gap-3'>
                      <div className='flex items-center gap-1.5 text-gray-400'>
                        <GrAttachment className='w-4 h-4' />
                        <span className="text-xs font-medium">{activeCard.attachments}</span>
                      </div>
                      <div className='flex items-center gap-1.5 text-gray-400'>
                        <LiaComment className='w-5 h-5' />
                        <span className="text-xs font-medium">{activeCard.comments}</span>
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




