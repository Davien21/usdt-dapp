import Emitter from "../services/emitter";

const toast = {
  error: (message) => {
    Emitter.emit("TOAST", { type: "error", message });
  },
  success: (message) => {
    Emitter.emit("TOAST", { type: "success", message });
  },
};

export default toast;
