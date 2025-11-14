import React from "react";
import Button from "../ui/Button";

export default function ConfirmDialog({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
     
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
        aria-hidden="true"
      />

     
      <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 z-10 w-full max-w-sm shadow-lg">
        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {description}
        </p>

      
        <div className="mt-5 flex justify-end gap-3">
          
       
          <button
            onClick={onCancel}
            className="
              px-4 py-2 rounded-md
              border border-gray-300
              text-gray-700 
              dark:text-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-800
              hover:bg-gray-100 
              dark:hover:bg-gray-700
              transition
            "
          >
            Cancel
          </button>

         
          <button
            onClick={onConfirm}
            className="
              px-4 py-2 rounded-md text-white
              bg-red-600 hover:bg-red-700
              transition
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
