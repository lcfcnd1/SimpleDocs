'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileHeaderProps {
  projectName: string;
  onMenuClick: () => void;
}

export function MobileHeader({ projectName, onMenuClick }: MobileHeaderProps) {
  return (
    <header className="md:hidden sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Button
        variant="outline"
        size="icon"
        className="shrink-0"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
      <h1 className="flex-1 text-lg font-semibold truncate text-primary">
        {projectName}
      </h1>
    </header>
  );
}