/* eslint @typescript-eslint/consistent-indexed-object-style: off */

export type OpenApiDefiniton = {
  openapi: string;
  info: {
    title: string;
    version: string;
  };
  paths: {
    [path: string]: {
      [method: string]: Method;
    };
  };
  components: {
    schemas: {
      [name: string]: JSONSchema<any>;
    };
  };
};

type Method = {
  operationId: string;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses: {
    [status: string]: Response;
  };
};

type Parameter = {
  name: string;
  in: 'path' | 'query';
  required: boolean;
  schema: JSONSchema<any>;
};

type RequestBody = {
  content: {
    'application/json': {
      schema: JSONSchema<any>;
    };
  };
};

type Response = {
  content?: {
    'application/json': {
      schema: JSONSchema<any>;
    };
  };
};

export type JSONSchema<T> = T extends string
  ? StringSchema
  : T extends number
  ? NumberSchema
  : T extends boolean
  ? BooleanSchema
  : T extends (infer U)[]
  ? {
      type: 'array';
      items: JSONSchema<U>;
      nullable?: boolean;
    }
  : T extends Record<string, any>
  ? {
      type: 'object';
      required?: Extract<keyof T, string>[];
      properties: {
        [K in keyof T]: JSONSchema<T[K]>;
      };
      additionalProperties?: boolean;
      nullable?: boolean;
    }
  : never;

type StringSchema = {
  type: 'string';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  default?: string;
  enum?: string[];
  nullable?: boolean;
};

type NumberSchema = {
  type: 'number' | 'integer';
  maximum?: number;
  minimum?: number;
  default?: number;
  nullable?: boolean;
};

type BooleanSchema = {
  type: 'boolean';
  default?: boolean;
  nullable?: boolean;
};
