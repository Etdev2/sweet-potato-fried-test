import { Icon, type IconName } from "./icons";

interface NavItem {
  readonly label: string;
  readonly icon: IconName;
  readonly current?: true;
  readonly badge?: "credential-count";
}

const NAV_GROUPS: readonly { readonly title: string; readonly items: readonly NavItem[] }[] = [
  {
    title: "Operate",
    items: [
      { label: "Dashboard", icon: "dashboard" },
      { label: "Quick Start", icon: "bolt" },
    ],
  },
  {
    title: "Gateway",
    items: [
      { label: "AI Providers", icon: "nodes" },
      { label: "Auth Files", icon: "shield", badge: "credential-count" },
      { label: "OAuth Login", icon: "user" },
    ],
  },
  {
    title: "Observe",
    items: [
      { label: "Quota Management", icon: "gauge", current: true },
      { label: "Logs Viewer", icon: "list" },
    ],
  },
  {
    title: "Control",
    items: [
      { label: "Config Panel", icon: "sliders" },
      { label: "Plugins", icon: "plug" },
      { label: "Plugin Store", icon: "store" },
      { label: "Management Center Info", icon: "server" },
    ],
  },
];

interface SidebarProps {
  // Null while no document is loaded.
  readonly credentialCount: number | null;
  readonly collapsed: boolean;
  readonly onToggle: () => void;
}

export function Sidebar({ credentialCount, collapsed, onToggle }: SidebarProps) {
  return (
    <aside className="sidebar" data-collapsed={collapsed}>
      <div className="brand">
        <span className="brand-mark" aria-hidden="true" />
        <span className="brand-text">
          <strong>CPAMC</strong>
          <small>CLI Proxy API Console</small>
        </span>
      </div>
      <nav aria-label="Console sections">
        {NAV_GROUPS.map((group) => (
          <section key={group.title} className="nav-group" aria-label={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.items.map((item) => (
                // Only Quota Management exists in this build. The other
                // entries show where it sits in the console and go nowhere.
                <li key={item.label}>
                  {item.current === true ? (
                    <a className="nav-item" href="#quota" aria-current="page" title={item.label}>
                      <Icon name={item.icon} />
                      <span className="nav-label">{item.label}</span>
                    </a>
                  ) : (
                    <span className="nav-item" aria-disabled="true" title={`${item.label} is not part of this build`}>
                      <Icon name={item.icon} />
                      <span className="nav-label">{item.label}</span>
                      {item.badge === "credential-count" && credentialCount !== null ? (
                        <span className="badge">{credentialCount}</span>
                      ) : null}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
      <button
        type="button"
        className="sidebar-toggle"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!collapsed}
        onClick={onToggle}
      >
        <Icon name="chevron" />
      </button>
    </aside>
  );
}
