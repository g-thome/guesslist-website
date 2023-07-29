import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode | ReactNode[];
};

export function Popup({ visible, onClose, children }: Props) {
  return (
    <>
      {visible &&
        createPortal(
          <>
            <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 z-40" onClick={onClose}>
            </div>
            <div className="absoute top-0 right-0 bottom-0 left-0 flex justify-center items-center z-50">
              {children}
            </div>
          </>, document.body)
      }
    </>
  )
}
