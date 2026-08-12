declare module "react-inner-image-zoom" {
  import { Component } from "react";

  export interface InnerImageZoomProps {
    src: string;
    zoomSrc?: string;
    zoomType?: "hover" | "click" | "always";
    zoomScale?: number;
    [key: string]: any;
  }

  export class InnerImageZoom extends Component<InnerImageZoomProps> {}
  export default InnerImageZoom;
}
