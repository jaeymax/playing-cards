import React from "react";

interface Report {
  id: number;
  reportedUser: string;
  reportedBy: string;
  reason: string;
  timestamp: Date;
  status: "pending" | "resolved" | "dismissed";
  evidence: string;
}

const ReportsView: React.FC = () => {
  const reports: Report[] = [
    {
      id: 1,
      reportedUser: "User456",
      reportedBy: "User789",
      reason: "Inappropriate behavior",
      timestamp: new Date("2024-01-20T15:30:00"),
      status: "pending",
      evidence: "Chat logs and screenshot attached",
    },
    {
      id: 2,
      reportedUser: "Player123",
      reportedBy: "GameMaster",
      reason: "Suspected cheating in tournament",
      timestamp: new Date("2024-01-20T14:15:00"),
      status: "pending",
      evidence: "Game replay and unusual pattern analysis",
    },
    {
      id: 3,
      reportedUser: "CardShark55",
      reportedBy: "TournamentAdmin",
      reason: "Disconnect abuse",
      timestamp: new Date("2024-01-19T22:45:00"),
      status: "resolved",
      evidence: "Multiple game disconnections at crucial moments",
    },
    {
      id: 4,
      reportedUser: "GoldPlayer",
      reportedBy: "Moderator1",
      reason: "Offensive language",
      timestamp: new Date("2024-01-19T20:30:00"),
      status: "dismissed",
      evidence: "Chat history provided",
    },
    {
      id: 5,
      reportedUser: "ProGamer42",
      reportedBy: "User567",
      reason: "Harassment in chat",
      timestamp: new Date("2024-01-19T18:20:00"),
      status: "pending",
      evidence: "Screenshots of chat messages",
    },
    {
      id: 6,
      reportedUser: "NewPlayer99",
      reportedBy: "VeteranUser",
      reason: "Suspicious win rate",
      timestamp: new Date("2024-01-19T16:45:00"),
      status: "pending",
      evidence: "Player statistics and match history",
    },
    {
      id: 7,
      reportedUser: "TopPlayer1",
      reportedBy: "SystemFlag",
      reason: "Automated behavior detection",
      timestamp: new Date("2024-01-19T15:10:00"),
      status: "resolved",
      evidence: "System logs and pattern analysis",
    },
    {
      id: 8,
      reportedUser: "CardMaster",
      reportedBy: "SecurityBot",
      reason: "Multiple account usage",
      timestamp: new Date("2024-01-19T14:30:00"),
      status: "pending",
      evidence: "IP logs and account connections",
    },
    {
      id: 9,
      reportedUser: "Tournament123",
      reportedBy: "EventMod",
      reason: "Tournament rule violation",
      timestamp: new Date("2024-01-19T13:15:00"),
      status: "resolved",
      evidence: "Match footage and referee statement",
    },
    {
      id: 10,
      reportedUser: "ChatUser77",
      reportedBy: "CommunityMod",
      reason: "Spam in global chat",
      timestamp: new Date("2024-01-19T12:00:00"),
      status: "dismissed",
      evidence: "Chat logs from multiple channels",
    },
  ];

  const handleReport = (id: number, action: "resolve" | "dismiss") => {
    console.log(`Report ${id} ${action}d`);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="border-b border-gray-700 p-4">
        <h2 className="text-lg font-bold">User Reports</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {reports.map((report) => (
          <div key={report.id} className="p-4 hover:bg-gray-750">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">
                  <span className="text-red-400">{report.reportedUser}</span>
                  <span className="text-gray-400"> reported by </span>
                  <span className="text-blue-400">{report.reportedBy}</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">{report.reason}</p>
                <p className="text-xs text-gray-500 mt-1">{report.evidence}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    report.status === "pending"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : report.status === "resolved"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-gray-500/10 text-gray-400"
                  }`}
                >
                  {report.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleReport(report.id, "resolve")}
                className="px-3 py-1 bg-green-500/10 text-green-400 rounded hover:bg-green-500/20"
              >
                Resolve
              </button>
              <button
                onClick={() => handleReport(report.id, "dismiss")}
                className="px-3 py-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsView;
