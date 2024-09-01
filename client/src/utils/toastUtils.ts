import toast from "react-hot-toast";

interface IShowToastProps {
  message: string | undefined;
  type: "success" | "error";
}

export const showToast = ({ message = '', type }: IShowToastProps) => {
  toast[type](message, {
    position: "bottom-center",
    duration: 5000,
    style: {
      background: type === "success" ? "green" : "red",
      color: "white",
      width: "fit-content",
    },
  });
};
