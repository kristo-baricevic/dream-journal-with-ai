'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import EntryCard from './EntryCard';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { JournalEntry } from '@prisma/client';

type DreamCatcherProps = {
    entries: JournalEntry[]; 
  };

const DreamCatcher: React.FC<DreamCatcherProps> = ({ entries = [] }) => {

  return (
    <div className="flex flex-wrap justify-center p-2 gap-2">
        {entries.map((entry) => (
            <Link href={`/journal/${entry.id}`} key={entry.id}>
                <div>
                    <EntryCard key={entry.id} entry={entry} href={`/journal/${entry.id}`} />
                </div>
            </Link>
        ))}
    </div>
  );
};

export default DreamCatcher;

