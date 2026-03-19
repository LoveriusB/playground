export const screens = [
  {
    name: "Front Store Display",
    location: "Brussels · Main Entrance",
    playlist: "Spring Campaign Loop",
    type: "Retail",
    resolution: "1920×1080",
    orientation: "Landscape",
    status: "Online",
    health: 96,
    sync: "12 sec ago",
  },
  {
    name: "Menu Board A",
    location: "Brussels · Bar Area",
    playlist: "Food & Drinks Menu",
    type: "Hospitality",
    resolution: "3840×2160",
    orientation: "Landscape",
    status: "Online",
    health: 91,
    sync: "28 sec ago",
  },
  {
    name: "Event Hall Totem",
    location: "Namur · Hall 2",
    playlist: "Event Sponsor Rotation",
    type: "Event",
    resolution: "1080×1920",
    orientation: "Portrait",
    status: "Warning",
    health: 63,
    sync: "8 min ago",
  },
  {
    name: "Office Lobby Screen",
    location: "Liège · HQ Reception",
    playlist: "Internal Comms & News",
    type: "Corporate",
    resolution: "1920×1080",
    orientation: "Landscape",
    status: "Online",
    health: 88,
    sync: "41 sec ago",
  },
];

export const playlists = [
  { name: "Spring Campaign Loop", assets: 8, duration: "03:42", screens: 12, category: "Retail", status: "Published" },
  {
    name: "Food & Drinks Menu",
    assets: 14,
    duration: "05:12",
    screens: 6,
    category: "Hospitality",
    status: "Published",
  },
  { name: "Event Sponsor Rotation", assets: 11, duration: "04:40", screens: 4, category: "Event", status: "Draft" },
  {
    name: "Internal Comms & News",
    assets: 7,
    duration: "02:58",
    screens: 9,
    category: "Corporate",
    status: "Published",
  },
];

export const media = [
  { name: "promo-video.mp4", kind: "Video", size: "48 MB", duration: "00:32", tag: "Campaign" },
  { name: "new-menu.jpg", kind: "Image", size: "4.2 MB", duration: "8 sec", tag: "Menu" },
  { name: "event-teaser.mp4", kind: "Video", size: "72 MB", duration: "00:48", tag: "Event" },
  { name: "happy-hour.png", kind: "Image", size: "3.8 MB", duration: "10 sec", tag: "Promo" },
  { name: "office-news-01.jpg", kind: "Image", size: "5.1 MB", duration: "12 sec", tag: "Internal" },
  { name: "brand-loop.mp4", kind: "Video", size: "96 MB", duration: "01:05", tag: "Brand" },
];

export const schedules = [
  {
    title: "Breakfast content",
    playlist: "Morning Specials",
    time: "06:00 → 10:30",
    target: "Drive-Thru Board",
    days: "Mon · Tue · Wed · Thu · Fri",
  },
  {
    title: "Lunch promo push",
    playlist: "Food & Drinks Menu",
    time: "11:30 → 14:00",
    target: "Menu Board A + B",
    days: "Every day",
  },
  {
    title: "Evening campaign",
    playlist: "Spring Campaign Loop",
    time: "17:00 → 22:00",
    target: "Retail network",
    days: "Thu · Fri · Sat",
  },
];

export const employees = [
  {
    name: "Sarah Martin",
    email: "sarah.martin@clientco.be",
    role: "Admin",
    scope: "All screens",
    status: "Active",
    permissions: ["Manage screens", "Publish playlists", "Invite users"],
  },
  {
    name: "Lucas Bernard",
    email: "lucas.bernard@clientco.be",
    role: "Content Manager",
    scope: "Retail network",
    status: "Active",
    permissions: ["Upload media", "Edit playlists", "Schedule content"],
  },
  {
    name: "Emma Dubois",
    email: "emma.dubois@clientco.be",
    role: "Viewer",
    scope: "HQ lobby screens",
    status: "Pending",
    permissions: ["View dashboards", "View analytics"],
  },
  {
    name: "Thomas Leroy",
    email: "thomas.leroy@clientco.be",
    role: "Operator",
    scope: "Hospitality screens",
    status: "Active",
    permissions: ["Manage screens", "Restart players"],
  },
];

export const roleCards = [
  {
    title: "Admin",
    desc: "Full workspace access including invitations, permissions, screens, playlists, and settings.",
  },
  {
    title: "Content Manager",
    desc: "Can manage media, playlists, and scheduling without controlling workspace security settings.",
  },
  { title: "Operator", desc: "Focused on day-to-day screen operations, player status, and deployment health." },
  { title: "Viewer", desc: "Read-only access for monitoring screens, reports, and content assignments." },
];
