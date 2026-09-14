import { useState } from "react";
import {
  Bell,
  ChevronRight,
  
  Lock,
  MessageSquare,
  Moon,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Sun,
  User,
  Volume2,
  LogOut,
  Eye,
  Gamepad2,
  Check,
} from "lucide-react";
import NavBar from "@/components/NavBar";

type Tab =
  | "general"
  | "privacy"
  | "notifications"
  | "chat"
  | "security";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    theme: "dark",
    language: "en",
    soundEffects: true,
    musicVolume: 80,
    effectsVolume: 70,

    profileVisibility: "public",
    onlineStatus: true,
    allowFriendRequests: true,
    allowGameInvites: "friends",
    showRecentActivity: true,

    emailNotifications: true,
    pushNotifications: true,
    notifyOnFriendRequest: true,
    notifyOnGameInvite: true,
    notifyOnTournament: true,
    notifyOnAchievement: true,

    allowDirectMessages: "friends",
    chatNotifications: true,
    showTypingIndicator: true,
    messagePreview: true,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    // Connect your API call here
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const tabs = [
    {
      id: "general" as Tab,
      label: "General",
      description: "Appearance & gameplay",
      icon: SlidersHorizontal,
    },
    {
      id: "privacy" as Tab,
      label: "Privacy",
      description: "Control your visibility",
      icon: Shield,
    },
    {
      id: "notifications" as Tab,
      label: "Notifications",
      description: "Stay in the loop",
      icon: Bell,
    },
    {
      id: "chat" as Tab,
      label: "Chat",
      description: "Messages & communication",
      icon: MessageSquare,
    },
    {
      id: "security" as Tab,
      label: "Security",
      description: "Protect your account",
      icon: Lock,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f14] bg-900 text-white">
      <NavBar showSignUps = {true} />
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      {/* Main */}
      <main className="relative mx-auto w-full max-w-7xl px-4 pb-32 pt-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <span>Account</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-300">Settings</span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                  <SlidersHorizontal className="h-5 w-5 text-blue-400" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Settings
                  </h1>
                  <p className="text-sm text-gray-500">
                    Customize your SparPlay experience
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                saved
                  ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
                  : "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500"
              }`}
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4" />
                  Saved
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>

        {/* Mobile categories */}
        <div className="mb-5 overflow-x-auto pb-1 lg:hidden">
          <div className="flex min-w-max gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "border border-white/5 bg-white/[0.03] text-gray-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
          {/* Sidebar */}
          <aside className="hidden h-fit lg:block">
            <div className="rounded-2xl border border-white/[0.06] bg-[#11161d]/80 p-3 backdrop-blur-xl">
              <div className="mb-3 px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-600">
                Preferences
              </div>

              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${
                        active
                          ? "bg-blue-600/10 text-white ring-1 ring-blue-500/20"
                          : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          active
                            ? "bg-blue-500/15 text-blue-400"
                            : "bg-white/[0.04] text-gray-500 group-hover:text-gray-300"
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold">
                          {tab.label}
                        </p>
                        <p className="truncate text-[11px] text-gray-600">
                          {tab.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-gray-500 transition hover:bg-red-500/5 hover:text-red-400">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04]">
                    <LogOut className="h-[18px] w-[18px]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sign Out</p>
                    <p className="text-[11px] text-gray-600">
                      Leave this session
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="min-w-0">
            {activeTab === "general" && (
              <div className="space-y-5">
                <SectionHeader
                  icon={Gamepad2}
                  title="General"
                  description="Make SparPlay feel the way you like to play."
                />

                <SettingsCard
                  icon={Sparkles}
                  title="Appearance"
                  description="Choose how SparPlay looks on your device."
                >
                  <SettingRow
                    label="Theme"
                    description="Select your preferred appearance."
                  >
                    <div className="flex rounded-xl border border-white/[0.06] bg-black/20 p-1">
                      <ThemeButton
                        active={settings.theme === "light"}
                        icon={Sun}
                        label="Light"
                        onClick={() => updateSetting("theme", "light")}
                      />

                      <ThemeButton
                        active={settings.theme === "dark"}
                        icon={Moon}
                        label="Dark"
                        onClick={() => updateSetting("theme", "dark")}
                      />
                    </div>
                  </SettingRow>

                  <Divider />

                  <SettingRow
                    label="Language"
                    description="Choose the language used across SparPlay."
                  >
                    <select
                      value={settings.language}
                      onChange={(e) =>
                        updateSetting("language", e.target.value)
                      }
                      className="w-full rounded-xl border border-white/[0.08] bg-[#0b0f14] px-4 py-2.5 text-sm text-gray-200 outline-none transition focus:border-blue-500/50 sm:w-44"
                    >
                      <option value="en">English</option>
                      <option value="fr">French</option>
                    </select>
                  </SettingRow>
                </SettingsCard>

                <SettingsCard
                  icon={Volume2}
                  title="Game Audio"
                  description="Control music and sound effects during games."
                >
                  <SettingToggle
                    label="Sound Effects"
                    description="Play sounds for cards, turns and game events."
                    enabled={settings.soundEffects}
                    onChange={() =>
                      updateSetting(
                        "soundEffects",
                        !settings.soundEffects
                      )
                    }
                  />

                  <Divider />

                  <VolumeSetting
                    label="Music Volume"
                    value={settings.musicVolume}
                    onChange={(value) =>
                      updateSetting("musicVolume", value)
                    }
                  />

                  <Divider />

                  <VolumeSetting
                    label="Effects Volume"
                    value={settings.effectsVolume}
                    onChange={(value) =>
                      updateSetting("effectsVolume", value)
                    }
                  />
                </SettingsCard>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-5">
                <SectionHeader
                  icon={Shield}
                  title="Privacy"
                  description="Control what other SparPlay players can see."
                />

                <SettingsCard
                  icon={Eye}
                  title="Visibility"
                  description="Choose how visible your profile and activity are."
                >
                  <SettingRow
                    label="Profile Visibility"
                    description="Who can view your SparPlay profile."
                  >
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) =>
                        updateSetting(
                          "profileVisibility",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/[0.08] bg-[#0b0f14] px-4 py-2.5 text-sm sm:w-44"
                    >
                      <option value="public">Everyone</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </SettingRow>

                  <Divider />

                  <SettingToggle
                    label="Online Status"
                    description="Let friends see when you're online."
                    enabled={settings.onlineStatus}
                    onChange={() =>
                      updateSetting(
                        "onlineStatus",
                        !settings.onlineStatus
                      )
                    }
                  />

                  <Divider />

                  <SettingToggle
                    label="Recent Activity"
                    description="Show your recent games and activity on your profile."
                    enabled={settings.showRecentActivity}
                    onChange={() =>
                      updateSetting(
                        "showRecentActivity",
                        !settings.showRecentActivity
                      )
                    }
                  />
                </SettingsCard>

                <SettingsCard
                  icon={User}
                  title="Social"
                  description="Manage who can interact with you."
                >
                  <SettingToggle
                    label="Friend Requests"
                    description="Allow other players to send you friend requests."
                    enabled={settings.allowFriendRequests}
                    onChange={() =>
                      updateSetting(
                        "allowFriendRequests",
                        !settings.allowFriendRequests
                      )
                    }
                  />

                  <Divider />

                  <SettingRow
                    label="Game Invites"
                    description="Choose who can invite you to games."
                  >
                    <select
                      value={settings.allowGameInvites}
                      onChange={(e) =>
                        updateSetting(
                          "allowGameInvites",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/[0.08] bg-[#0b0f14] px-4 py-2.5 text-sm sm:w-44"
                    >
                      <option value="everyone">Everyone</option>
                      <option value="friends">Friends Only</option>
                      <option value="none">No One</option>
                    </select>
                  </SettingRow>
                </SettingsCard>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-5">
                <SectionHeader
                  icon={Bell}
                  title="Notifications"
                  description="Choose what you want SparPlay to notify you about."
                />

                <SettingsCard
                  icon={Bell}
                  title="Notification Channels"
                  description="Control how SparPlay keeps you updated."
                >
                  <SettingToggle
                    label="Push Notifications"
                    description="Receive notifications on your device."
                    enabled={settings.pushNotifications}
                    onChange={() =>
                      updateSetting(
                        "pushNotifications",
                        !settings.pushNotifications
                      )
                    }
                  />

                  <Divider />

                  <SettingToggle
                    label="Email Notifications"
                    description="Receive important updates by email."
                    enabled={settings.emailNotifications}
                    onChange={() =>
                      updateSetting(
                        "emailNotifications",
                        !settings.emailNotifications
                      )
                    }
                  />
                </SettingsCard>

                <SettingsCard
                  icon={Sparkles}
                  title="What should we notify you about?"
                  description="Pick the events you don't want to miss."
                >
                  <SettingToggle
                    label="Friend Requests"
                    description="When someone sends you a friend request."
                    enabled={settings.notifyOnFriendRequest}
                    onChange={() =>
                      updateSetting(
                        "notifyOnFriendRequest",
                        !settings.notifyOnFriendRequest
                      )
                    }
                  />

                  <Divider />

                  <SettingToggle
                    label="Game Invites"
                    description="When another player challenges you."
                    enabled={settings.notifyOnGameInvite}
                    onChange={() =>
                      updateSetting(
                        "notifyOnGameInvite",
                        !settings.notifyOnGameInvite
                      )
                    }
                  />

                  <Divider />

                  <SettingToggle
                    label="Tournament Updates"
                    description="Important tournament activity and reminders."
                    enabled={settings.notifyOnTournament}
                    onChange={() =>
                      updateSetting(
                        "notifyOnTournament",
                        !settings.notifyOnTournament
                      )
                    }
                  />

                  <Divider />

                  <SettingToggle
                    label="Achievements"
                    description="When you unlock a new achievement."
                    enabled={settings.notifyOnAchievement}
                    onChange={() =>
                      updateSetting(
                        "notifyOnAchievement",
                        !settings.notifyOnAchievement
                      )
                    }
                  />
                </SettingsCard>
              </div>
            )}

            {activeTab === "chat" && (
              <div className="space-y-5">
                <SectionHeader
                  icon={MessageSquare}
                  title="Chat"
                  description="Customize your messaging experience."
                />

                <SettingsCard
                  icon={MessageSquare}
                  title="Messaging"
                  description="Control who can contact you."
                >
                  <SettingRow
                    label="Direct Messages"
                    description="Who can send you direct messages."
                  >
                    <select
                      value={settings.allowDirectMessages}
                      onChange={(e) =>
                        updateSetting(
                          "allowDirectMessages",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/[0.08] bg-[#0b0f14] px-4 py-2.5 text-sm sm:w-44"
                    >
                      <option value="everyone">Everyone</option>
                      <option value="friends">Friends Only</option>
                      <option value="none">No One</option>
                    </select>
                  </SettingRow>

                  <Divider />

                  <SettingToggle
                    label="Chat Notifications"
                    description="Get notified when you receive a new message."
                    enabled={settings.chatNotifications}
                    onChange={() =>
                      updateSetting(
                        "chatNotifications",
                        !settings.chatNotifications
                      )
                    }
                  />

                  <Divider />

                  <SettingToggle
                    label="Typing Indicator"
                    description="Let players know when you're typing."
                    enabled={settings.showTypingIndicator}
                    onChange={() =>
                      updateSetting(
                        "showTypingIndicator",
                        !settings.showTypingIndicator
                      )
                    }
                  />

                  <Divider />

                  <SettingToggle
                    label="Message Preview"
                    description="Show a preview of messages in notifications."
                    enabled={settings.messagePreview}
                    onChange={() =>
                      updateSetting(
                        "messagePreview",
                        !settings.messagePreview
                      )
                    }
                  />
                </SettingsCard>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-5">
                <SectionHeader
                  icon={Lock}
                  title="Security"
                  description="Keep your SparPlay account protected."
                />

                <SettingsCard
                  icon={Lock}
                  title="Account Security"
                  description="Manage your login and account protection."
                >
                  <ActionRow
                    title="Change Password"
                    description="Update your account password."
                    action="Change"
                  />

                  <Divider />

                  <ActionRow
                    title="Two-Factor Authentication"
                    description="Add another layer of protection to your account."
                    action="Set Up"
                  />

                  <Divider />

                  <ActionRow
                    title="Active Sessions"
                    description="View devices currently signed into your account."
                    action="View"
                  />
                </SettingsCard>

                <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.03] p-5">
                  <h3 className="font-semibold text-red-400">
                    Danger Zone
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    These actions can affect your account permanently.
                  </p>

                  <button className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Mobile save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.06] bg-[#0b0f14]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <button
          onClick={handleSave}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20"
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" />
              Changes Saved
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------- */

const SectionHeader = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => {
  return (
    <div className="mb-2 flex items-start gap-3">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-gray-400">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const SettingsCard = ({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: any;
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#11161d]/80 backdrop-blur-xl">
      <div className="flex items-start gap-3 border-b border-white/[0.05] px-5 py-4 sm:px-6">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
          <Icon className="h-[18px] w-[18px]" />
        </div>

        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="mt-0.5 text-xs text-gray-500">{description}</p>
        </div>
      </div>

      <div className="px-5 sm:px-6">{children}</div>
    </div>
  );
};

const SettingRow = ({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-200">{label}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </p>
      </div>

      <div className="shrink-0">{children}</div>
    </div>
  );
};

const SettingToggle = ({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-5 py-5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-200">{label}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={enabled}
        className={`relative h-7 w-12 shrink-0 rounded-full p-1 transition-all duration-200 ${
          enabled
            ? "bg-blue-600 shadow-lg shadow-blue-600/20"
            : "bg-gray-700"
        }`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

const VolumeSetting = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <div className="py-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-300">{label}</span>

        <span className="rounded-md bg-white/[0.04] px-2 py-1 text-xs font-medium text-gray-400">
          {value}%
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-700 accent-blue-500"
      />
    </div>
  );
};

const ThemeButton = ({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: any;
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
        active
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-500 hover:text-gray-300"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
};

const ActionRow = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <div>
        <p className="text-sm font-medium text-gray-200">{title}</p>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>

      <button className="shrink-0 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/[0.06] hover:text-white">
        {action}
      </button>
    </div>
  );
};

const Divider = () => (
  <div className="border-t border-white/[0.05]" />
);

export default SettingsPage;