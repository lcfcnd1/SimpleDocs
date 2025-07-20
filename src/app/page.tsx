'use client';

import { useState, useEffect } from 'react';
import type { ApiDocs, Service } from '@/types/api-docs';
import { Sidebar } from '@/components/api-explorer/Sidebar';
import { MainContent } from '@/components/api-explorer/MainContent';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { MobileHeader } from '@/components/api-explorer/MobileHeader';

type DocSource = 'api-docs.json' | 'api-docs-example.json';

export default function Home() {
  const [apiDocs, setApiDocs] = useState<ApiDocs | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [docSource, setDocSource] = useState<DocSource>('api-docs.json');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchDocs() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/${docSource}`);
        if (!response.ok) {
          if (docSource === 'api-docs.json') {
            setDocSource('api-docs-example.json'); // Fallback to example
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return;
        }
        const data = await response.json();
        setApiDocs(data);
      } catch (e: any) {
        setError(
          'Failed to load API documentation. Please ensure `public/api-docs.json` or `public/api-docs-example.json` exists and is correctly formatted.'
        );
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchDocs();
  }, [docSource]);

  useEffect(() => {
    if (apiDocs && window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [apiDocs]);

  const handleSourceChange = (useExample: boolean) => {
    setDocSource(useExample ? 'api-docs-example.json' : 'api-docs.json');
  };

  const filteredServices = apiDocs?.services.filter((service) => {
      const name = service.name || (service as any).nombre || '';
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  ) ?? [];

  const sidebarContent = (
    <Sidebar
        projectName={apiDocs?.projectName || ''}
        version={apiDocs?.version || ''}
        services={filteredServices}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        useExample={docSource === 'api-docs-example.json'}
        onSourceChange={handleSourceChange}
        showExampleToggle={apiDocs?.showExampleToggle}
        onLinkClick={() => setMobileSidebarOpen(false)}
      />
  );

  const renderContent = () => {
    if (loading) {
      return <LoadingState />;
    }
    if (error) {
      return (
        <div className="flex-1 p-8">
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      );
    }
    if (apiDocs) {
      return (
        <>
          <div className="hidden md:block">
            {sidebarContent}
          </div>
          <div className="flex flex-col flex-1">
            <MobileHeader 
              projectName={apiDocs.projectName}
              onMenuClick={() => setMobileSidebarOpen(true)}
            />
            <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
              <SheetContent side="left" className="p-0 w-72">
                 <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                {sidebarContent}
              </SheetContent>
            </Sheet>
            <MainContent services={filteredServices} />
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-secondary/50 font-body">
      {renderContent()}
    </div>
  );
}

function LoadingState() {
  return (
    <>
      <aside className="hidden md:block w-72 flex-shrink-0 border-r border-border bg-background p-6">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/4 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
        </div>
      </aside>
      <main className="flex-1 p-10">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Skeleton className="h-6 w-3/4 mb-12" />
        <div className="space-y-8">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </main>
    </>
  );
}
