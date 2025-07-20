import { Badge } from "@/components/ui/badge";
import type { Endpoint } from "@/types/api-docs";

interface HttpMethodBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

const methodClasses: Record<HttpMethodBadgeProps['method'], string> = {
    GET: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
    POST: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700",
    PUT: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700",
    DELETE: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
};

export function HttpMethodBadge({ method }: HttpMethodBadgeProps) {
  return (
    <div
      className={`w-20 text-center text-sm font-semibold py-1 rounded-md border ${methodClasses[method]}`}
    >
      {method}
    </div>
  );
}
