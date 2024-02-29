import "stream-chat-react/dist/css/index.css";
import type { CSS } from ".";

const toastUICustomStyles: CSS = {
  ".tui-image-editor-align-wrap": {
    alignItems: "center",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
  },
  ".tui-image-editor-controls": {
    display: "none",
  },
  ".tui-image-editor-header": {
    display: "none",
  },
  ".tui-image-editor-help-menu.top": {
    display: "none",
  },
  ".tui-image-editor-main-container": {
    backgroundColor: "transparent !important",
  },
  ".tui-image-editor-submenu": {
    display: "none",
  },
};

export { toastUICustomStyles };
