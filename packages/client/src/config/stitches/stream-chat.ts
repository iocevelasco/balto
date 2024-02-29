import "stream-chat-react/dist/css/index.css";
import tw from "twin.macro";
import type { CSS } from ".";

const streamChatCustomStyles: CSS = {
  ".carousel-root": {
    ".carousel": {
      ".slide": {
        ".str-chat__modal-image__wrapper": {
          alignItems: "center",
          display: "flex",
          height: "100% !important",
          justifyContent: "center",
        },
        img: {
          width: "auto !important",
        },
      },
      ".slider-wrapper": {
        height: "100% !important",
        "ul.slider": {
          height: "100% !important",
        },
      },
      height: "100% !important",
    },
    height: "100% !important",
  },
  ".str-chat": {
    ".str-chat__container": {
      ".str-chat__input-flat": {
        ".rfu-file-upload-button": {
          svg: {
            fill: "none !important",
            opacity: "1 !important",
          },
          top: "calc(100% - 33px)",
        },
        ".str-chat__fileupload-wrapper:nth-of-type(1)": {
          ".rfu-file-upload-button, .str-chat__tooltip": {
            right: "23px !important",
          },
        },
        ".str-chat__fileupload-wrapper:nth-of-type(2)": {
          ".rfu-file-upload-button, .str-chat__tooltip": {
            right: "55px !important",
          },
        },
        ".str-chat__textarea>textarea": {
          ...tw`
                text-base
                shadow-sm
                focus:(ring-blue-400 border-blue-400)
                block
                w-full
                rounded-md`,
          background: "$white",
          border: "1px solid $gray300",
          minHeight: "auto !important",
          padding: "$xsmall $small",
        },
        padding: "0 !important",
      },
      ".str-chat__list": {
        ".str-chat__reverse-infinite-scroll": {
          paddingTop: "0px !important",
        },
        paddingLeft: "$small",
      },
      flexDirection: "column !important",
    },
    ".str-chat__date-separator": {
      padding: "$small !important",
    },
    ".str-chat__emojisearch__item": {
      ".str-chat__emoji-item--entity": {
        fontSize: "1.4rem !important",
        marginRight: "0.75rem !important",
      },

      ".str-chat__emoji-item--name > span": {
        fontSize: "1rem !important",
      },
    },
    ".str-chat__message--me": {
      ".str-chat__message-text-inner": {
        "* > a": {
          color: "$white !important",
        },
        backgroundColor: "$blue400 !important",
        border: "1px solid $blue400 !important",
        color: "$white !important",
      },
    },
    ".str-chat__message-attachment-card--content": {
      backgroundColor: "$white !important",
    },
    ".str-chat__message-attachment-card--title": {
      color: "$blue400",
    },
    ".str-chat__message-text-inner": {
      "* > a": {
        color: "$blue400 !important",
      },
      backgroundColor: "$neutral200 !important",
      border: "1px solid $neutral200 !important",
    },
    height: "100% !important",
  },
};

export { streamChatCustomStyles };
