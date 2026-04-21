/** @format */

import { InitialData } from './types';

export const initialData: InitialData = {
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
