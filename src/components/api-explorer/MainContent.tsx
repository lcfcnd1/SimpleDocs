'use client';

import type { Service } from '@/types/api-docs';
import { EndpointDetails } from './EndpointDetails';
import { Hash } from 'lucide-react';
import { toast } from 'sonner';

interface MainContentProps {
  services: Service[];
}

export function MainContent({ services }: MainContentProps) {
  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copied to clipboard!');
    });
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex-1 p-4 md:p-10">
      {services.map((service) => {
        const serviceName = service.name || (service as any).nombre;
        if (!serviceName) return null;

        return (
          <section key={service.id} id={service.id} className="mb-12 scroll-mt-24 md:mb-16">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary break-words">
                {serviceName}
              </h2>
              <button
                onClick={() => handleCopyLink(service.id)}
                className="opacity-50 hover:opacity-100 transition-opacity"
                aria-label={`Copy link to ${serviceName} section`}
              >
                <Hash className="h-6 w-6 flex-shrink-0" />
              </button>
            </div>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">{service.description}</p>
            <div className="space-y-6 md:space-y-8">
              {service.endpoints.map((endpoint) => {
                const endpointKey = (endpoint as any).ruta || endpoint.route;
                return (
                  <EndpointDetails
                    key={`${endpoint.method}-${endpointKey}`}
                    endpoint={endpoint}
                  />
                )
              })}
            </div>
          </section>
        )
      })}
    </main>
  );
}
