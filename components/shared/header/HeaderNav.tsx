"use client";
import {BellIcon} from "@/components/icons/bells";
import {Hamburger3Icon} from "@/components/icons/hamburger";
import Link from "next/link";
import {useDrawer} from "@/stores/drawerState";
import {usePathname, useRouter} from "next/navigation";
import {ChevronLeftIcon} from "@/components/icons/chevron";
import HeaderAlert from "./headerAlert/HeaderAlert";
import {useEffect, useState} from "react";
import useIndexedDB from "@/hooks/indexedDB/useIndexedDB";
import {IAlertTypes} from "@/util/indexedDB/initDB";
import {NOTI_BROARDCAST} from "@/util/variables";

const notAllowBackBtn: {[key: string]: boolean} = {
  "/": true,
  "/login": true,
  "/join": true,
};

export default function HeaderNav() {
  const [alert, setAlert] = useState(false);
  const [state, setState] = useState<boolean>(false);
  const {getAlertDB, editAlertState} = useIndexedDB();
  const {onToggle} = useDrawer();
  const path = usePathname();
  const router = useRouter();

  const handleAlertClick = async () => {
    setAlert((prev) => !prev);
    await editAlertState(false);
    setState(false);
  };
  useEffect(() => {
    const alertState = async () => {
      const dbState: IAlertTypes = await getAlertDB(1);
      setState(dbState?.state);
    };
    alertState();
  }, [getAlertDB, state]);

  useEffect(() => {
    const notiBroadCast = new BroadcastChannel(NOTI_BROARDCAST);
    notiBroadCast.onmessage = (e) => {
      setState(e.data.alert);
    };
    return () => notiBroadCast.close();
  }, [state]);
  return (
    <>
      {!notAllowBackBtn[path] && (
        <li className="flex justify-center items-center">
          <button onClick={() => router.back()}>
            <ChevronLeftIcon className="size-6 text-(--mt-white)" />
          </button>
        </li>
      )}
      <li>
        <Link href={"/"}>
          <h3 className="font-dohyeon text-(--mt-white)">MUNG&apos;s COOL</h3>
        </Link>
      </li>
      <li className="ml-auto hover:bg-blue-400 rounded-full p-2 relative">
        <button onClick={handleAlertClick}>
          <i>
            <BellIcon className="size-6 text-white" />
          </i>
        </button>
        {state && (
          <span className="absolute top-0 right-0 block size-2 bg-red-500 rounded-full" />
        )}
      </li>
      <li>
        <button onClick={onToggle}>
          <i>
            <Hamburger3Icon className="size-6 text-white" />
          </i>
        </button>
      </li>
      <HeaderAlert state={alert} />
    </>
  );
}
