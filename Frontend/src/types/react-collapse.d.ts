declare module "react-collapse" {
  export interface CollapseProps {
    isOpened: boolean;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export const Collapse: React.FC<CollapseProps>;
}
