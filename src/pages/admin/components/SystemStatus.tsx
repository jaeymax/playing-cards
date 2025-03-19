import React from "react";

const SystemStatus: React.FC = () => {
  const metrics = {
    serverLoad: 42,
    memory: 68,
    activeGames: 156,
    queuedPlayers: 23,
    uptime: "99.9%",
    responseTime: "120ms",
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">System Status</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Server Load</span>
              <span className="text-sm text-gray-300">
                {metrics.serverLoad}%
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${metrics.serverLoad}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Memory Usage</span>
              <span className="text-sm text-gray-300">{metrics.memory}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${metrics.memory}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-750 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Active Games</div>
            <div className="text-xl font-semibold">{metrics.activeGames}</div>
          </div>
          <div className="bg-gray-750 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Queued Players</div>
            <div className="text-xl font-semibold">{metrics.queuedPlayers}</div>
          </div>
          <div className="bg-gray-750 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Uptime</div>
            <div className="text-xl font-semibold">{metrics.uptime}</div>
          </div>
          <div className="bg-gray-750 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Response Time</div>
            <div className="text-xl font-semibold">{metrics.responseTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
