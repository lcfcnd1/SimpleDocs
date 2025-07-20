import type { Endpoint } from '@/types/api-docs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { HttpMethodBadge } from './HttpMethodBadge';
import { CodeBlock } from './CodeBlock';
import { Separator } from '../ui/separator';

interface EndpointDetailsProps {
  endpoint: Endpoint;
}

export function EndpointDetails({ endpoint }: EndpointDetailsProps) {
  const method = (endpoint as any).metodo || endpoint.method;
  const route = (endpoint as any).ruta || endpoint.route;
  const summary = (endpoint as any).resumen || endpoint.summary;
  const description = (endpoint as any).descripcion || endpoint.description;
  const parameters = (endpoint as any).parametros || endpoint.parameters;
  const successResponse = (endpoint as any).respuesta_exitosa || endpoint.successResponse;
  const errorResponse = (endpoint as any).respuesta_error || endpoint.errorResponse;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 bg-secondary/50 p-4">
        <HttpMethodBadge method={method} />
        <CardTitle className="text-base font-medium font-mono tracking-tight break-all">
          {route}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="font-semibold text-lg mb-2">{summary}</p>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        {parameters.length > 0 && (
          <>
            <h3 className="text-md font-semibold mb-2">Parameters</h3>
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Name</TableHead>
                    <TableHead className="w-[100px]">Location</TableHead>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parameters.map((param: any) => {
                    const paramName = param.name || param.nombre;
                    const paramIn = param.in || param.ubicacion;
                    const paramType = param.type || param.tipo;
                    const paramRequired = param.required || param.requerido;
                    const paramDescription = param.description || param.descripcion;
                    
                    return (
                      <TableRow key={paramName}>
                        <TableCell className="font-mono">
                          {paramName}
                          {paramRequired && <span className="text-red-500">*</span>}
                        </TableCell>
                        <TableCell>
                          <span className="bg-muted px-2 py-1 rounded-md text-xs">{paramIn}</span>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{paramType}</TableCell>
                        <TableCell>{paramDescription}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        <Separator className="my-6" />

        <div>
          <h3 className="text-md font-semibold mb-4">Example Responses</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CodeBlock
              title={`Success (${successResponse.code || successResponse.codigo})`}
              code={successResponse.body || successResponse.cuerpo}
            />
            <CodeBlock
              title={`Error (${errorResponse.code || errorResponse.codigo})`}
              code={errorResponse.body || errorResponse.cuerpo}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
