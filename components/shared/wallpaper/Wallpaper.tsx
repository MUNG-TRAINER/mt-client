import {ReactNode} from "react";
import Drawer from "../drawer/Drawer";

export default function Wallpaper({children}: {children: ReactNode}) {
  return (
    <div className="h-dvh">
      <Drawer />
      {children}
    </div>
  );
}
