'use client';

import Link from 'next/link';
import EntryCard from './EntryCard';
import { JournalEntry } from '@prisma/client';

type DreamCatcherProps = {
  entries: JournalEntry[];
  onDeleteEntry: (id: string) => void;
};

const DreamCatcher: React.FC<DreamCatcherProps> = ({ entries, onDeleteEntry }) => {
  return (
    <div className="flex flex-wrap justify-center p-2 gap-2">
      {entries.map((entry) => (
        <Link href={`/journal/${entry.id}`} key={entry.id}>
          <div>
            <EntryCard entry={entry} onDelete={onDeleteEntry} href={`/journal/${entry.id}`} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DreamCatcher;
