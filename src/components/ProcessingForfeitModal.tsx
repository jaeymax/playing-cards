import React from "react";
import Modal from "./Modal";

interface ProcessingForfeitModalProps {
  isOpen: boolean;
}

const ProcessingForfeitModal: React.FC<ProcessingForfeitModalProps> = ({
  isOpen,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="">
      <div className="flex flex-col items-center space-y-6 py-8">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="text-center space-y-2">
          <p className="text-lg font-bold text-blue-400">
            Processing Forfeit...
          </p>
          <p className="text-sm text-gray-400">
            Please wait while we process your action
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ProcessingForfeitModal;
