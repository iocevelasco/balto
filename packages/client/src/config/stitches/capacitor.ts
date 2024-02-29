const pwaCameraStyle = {
  // Both of theses must have a zIndex higher than "9990"
  // Or they'll not show up when a radix dialog is open at the same time
  // Please note that we CANNOT override any substyles of pwa-elements as they are all
  // contained inside shadowRoot DOM, and therefore have isolations on their css styles
  "pwa-camera-modal": {
    zIndex: 9991,
  },
  "pwa-camera-modal-instance": {
    zIndex: 9992,
  },
};

export { pwaCameraStyle };
