import type { Service } from '@/types/api-docs';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '../ThemeToggle';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Heart } from 'lucide-react';

interface SidebarProps {
  projectName: string;
  version: string;
  services: Service[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  useExample: boolean;
  onSourceChange: (useExample: boolean) => void;
  showExampleToggle?: boolean;
  onLinkClick?: () => void;
}

export function Sidebar({ projectName, version, services, searchTerm, onSearchChange, useExample, onSourceChange, showExampleToggle, onLinkClick }: SidebarProps) {
  return (
    <aside className="w-full h-full flex-shrink-0 bg-background flex flex-col">
      <div className="flex-grow p-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-primary">{projectName}</h1>
          <p className="text-sm text-muted-foreground">{version}</p>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <Separator className="mb-6" />

        <nav>
          <h2 className="text-base font-semibold mb-3">Services</h2>
          <ul>
            {services.map((service) => {
              const serviceName = service.name || (service as any).nombre;
              if (!serviceName) return null;
              return (
                <li key={service.id}>
                  <a
                    href={`#${service.id}`}
                    onClick={onLinkClick}
                    className="block py-2 px-3 rounded-md text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors duration-150"
                  >
                    {serviceName}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <div className="p-6">
        <Separator className="my-4" />
        {showExampleToggle && (
          <div className="flex items-center space-x-2 mb-4">
            <Switch 
              id="doc-source-switch" 
              checked={useExample}
              onCheckedChange={onSourceChange}
            />
            <Label htmlFor="doc-source-switch">Show Example</Label>
          </div>
        )}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <footer className="text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <a href="https://github.com/lcfcnd1" target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:underline">
                lcfcnd
              </a>
              - With Love <Heart className="inline-block h-3 w-3 text-red-500" />
            </div>
            <div>
              Using <a href="https://studio.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:underline">
                Firebase Studio
              </a>
            </div>
          </footer>
        </div>
      </div>
    </aside>
  );
}
