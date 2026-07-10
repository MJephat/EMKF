// Listens to connectivity

import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { SyncService } from "../services/syncServices";

export default function useSync(onSyncComplete?: () => void) {
      useEffect(() => {
    const sync = new SyncService();

    const unsubscribe = NetInfo.addEventListener(
      (state) => {
        if(state.isConnected) {
           setTimeout(() => {
            sync.syncPending(onSyncComplete);
            }, 1000);
        }
      }
    );

    return unsubscribe;
  }, []);
}