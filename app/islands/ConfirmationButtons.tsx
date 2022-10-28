import type { VNode } from "preact";
import { useState } from "preact/hooks";
import Alert from "@/components/Alert.tsx";

type ButtonColorVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "outline-danger";

interface ConfirmationButtonsProps {
  buttonContainerClasses?: string;
  bypassConfirmation?: boolean;
  cancelText?: string;
  confirmationText?: string;
  buttonSize?: "" | "btn-large" | "btn-small";
  confirmationButtonColor?: ButtonColorVariant;
  confirmationButtonText?: string;
  confirmationAlertMessage?: string;
  rightButtons: VNode;
  onConfirm: () => unknown;
}

export default function ConfirmationButtons({
  buttonContainerClasses = "mt-3",
  bypassConfirmation = false,
  confirmationAlertMessage = "Are you sure you want to cancel? You will lose any unsaved changes.",
  cancelText = "Keep Changes",
  confirmationText = "Discard Changes",
  confirmationButtonText = "CANCEL",
  buttonSize = "",
  confirmationButtonColor = "warning",
  rightButtons,
  onConfirm,
}: ConfirmationButtonsProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  return isConfirming ? (
    <>
      <Alert
        margin={false}
        className="mt-4"
        message={confirmationAlertMessage}
      />
      <div class="flex justify-end mt-4 gap-3">
        <button
          onClick={() => {
            setIsConfirming(false);
          }}
          type="button"
          class={`btn ${buttonSize} btn-outline-light`}
        >
          {cancelText}
        </button>
        <button
          onClick={() => {
            setIsConfirming(false);
            onConfirm();
          }}
          type="button"
          class={`btn ${buttonSize} btn-${confirmationButtonColor}`}
        >
          {confirmationText}
        </button>
      </div>
    </>
  ) : (
    <div class={`flex justify-end ${buttonContainerClasses} gap-3`}>
      <button
        onClick={() => {
          if (bypassConfirmation) {
            onConfirm();
          } else {
            setIsConfirming(true);
          }
        }}
        type="button"
        class={`btn ${buttonSize} btn-${confirmationButtonColor}`}
      >
        {confirmationButtonText}
      </button>
      {rightButtons}
    </div>
  );
}
