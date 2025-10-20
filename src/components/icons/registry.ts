import {
  AlertCircle,
  Calendar,
  Check,
  ChevronRight,
  Home,
  Info,
  type LucideIcon,
  Mail,
  Phone,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";

export const iconRegistry = {
  // Navigation & Layout
  home: Home,
  user: User,
  settings: Settings,
  search: Search,
  chevronRight: ChevronRight,

  // UI States
  x: X,
  check: Check,
  alertCircle: AlertCircle,
  info: Info,

  // Communication
  mail: Mail,
  phone: Phone,
  calendar: Calendar,
} as const;

export type IconName = keyof typeof iconRegistry;
export type IconComponent = LucideIcon;
