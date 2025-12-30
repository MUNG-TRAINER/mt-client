"use client";
import {BellIcon} from "@/components/icons/bells";
import {Hamburger3Icon} from "@/components/icons/hamburger";
import Link from "next/link";
import {useDrawer} from "@/stores/drawerState";
import {usePathname, useRouter} from "next/navigation";
import {ChevronLeftIcon} from "@/components/icons/chevron";
import HeaderAlert from "./headerAlert/HeaderAlert";
import {MouseEvent, useEffect, useState} from "react";
import useIndexedDB from "@/hooks/indexedDB/useIndexedDB";
import {IAlertTypes} from "@/util/indexedDB/initDB";
import {NOTI_BROADCAST} from "@/util/variables";
import {useAlertState} from "@/stores/alert/alertState";

const notAllowBackBtn: {[key: string]: boolean} = {
  "/": true,
  "/login": true,
  "/join": true,
};

export default function HeaderNav() {
  const [state, setState] = useState<boolean>(false);
  const {getAlertDB, editAlertState} = useIndexedDB();
  const {onToggle} = useDrawer();
  const path = usePathname();
  const router = useRouter();
  const {alertState, setAlertState} = useAlertState();
  const handleAlertClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAlertState();
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
    const notiBroadCast = new BroadcastChannel(NOTI_BROADCAST);
    notiBroadCast.onmessage = (e) => {
      setState(e.data.alert);
    };
    return () => notiBroadCast.close();
  }, []);
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
        <button onClick={(e) => handleAlertClick(e)}>
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
      <HeaderAlert state={alertState} />
    </>
  );
}
