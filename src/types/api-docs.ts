
export interface ResponseExample {
  code: number;
  body: Record<string, any>;
}

export interface Parameter {
  name: string;
  type: string;
  in: 'path' | 'query' | 'body';
  required: boolean;
  description: string;
}

export interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  route: string;
  summary: string;
  description: string;
  parameters: Parameter[];
  successResponse: ResponseExample;
  errorResponse: ResponseExample;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  endpoints: Endpoint[];
}

export interface ApiDocs {
  projectName: string;
  version: string;
  services: Service[];
  showExampleToggle?: boolean;
}
