import {
  Cpu,
  Gamepad2,
  Laptop,
  Monitor,
  MonitorSmartphone,
  HardDrive,
  Keyboard,
  Headphones,
  Wrench,
  Package,
} from "lucide-react";

// Maps the `icon` string from data/categories.js to an actual component.
// Named imports (not `import * as Icons`) let Vite drop every icon we don't use.
const ICONS = { Cpu, Gamepad2, Laptop, Monitor, MonitorSmartphone, HardDrive, Keyboard, Headphones, Wrench };

export default function CategoryIcon({ name, className }) {
  const Icon = ICONS[name] ?? Package;
  return <Icon className={className} aria-hidden="true" />;
}
