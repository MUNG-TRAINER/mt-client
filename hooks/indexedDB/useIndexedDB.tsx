"use client";

import {addNotification} from "@/util/indexedDB/addDB";
import {editAlertState} from "@/util/indexedDB/editDB";
import {getAlertDB, getNoticeDB} from "@/util/indexedDB/getDB";
import {removeNotiData} from "@/util/indexedDB/removeDB";

export default function useIndexedDB() {
  return {
    addNotification,
    getNoticeDB,
    getAlertDB,
    editAlertState,
    removeNotiData,
  };
}
