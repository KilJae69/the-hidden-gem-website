"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label: string;
  pendingLabel: string;
  pendingState?: boolean;
  dirtyState?: boolean;
  
};

export default function SubmitButton({
  label,
  pendingLabel,
  pendingState,
  dirtyState,
  
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const pendingStatus = pendingState || pending;

  return (
    <button
      className="min-w-full bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pendingStatus }
      type="submit"
    >
      {pendingStatus ? pendingLabel : label}
    
    </button>
  );
}
