import React, { useState } from "react";
import Modal from "../../../components/Modal";

interface CreateTournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTournamentModal: React.FC<CreateTournamentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [format, setFormat] = useState<"single" | "double" | "round-robin">(
    "single"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle tournament creation
    console.log({
      name,
      startDate,
      endDate,
      maxPlayers,
      entryFee,
      prizePool,
      format,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Tournament">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Tournament Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              End Date
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Max Players
            </label>
            <input
              type="number"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="single">Single Elimination</option>
              <option value="double">Double Elimination</option>
              <option value="round-robin">Round Robin</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Entry Fee
            </label>
            <input
              type="number"
              value={entryFee}
              onChange={(e) => setEntryFee(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Prize Pool
            </label>
            <input
              type="number"
              value={prizePool}
              onChange={(e) => setPrizePool(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2"
        >
          Create Tournament
        </button>
      </form>
    </Modal>
  );
};

export default CreateTournamentModal;
