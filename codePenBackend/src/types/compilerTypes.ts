


export interface fullCodeType {
    html: string;
    css: string;
    javascript: string;
  };
declare global {
    namespace Express {
      interface Request {
        _id?: string;
      }
    }
  }