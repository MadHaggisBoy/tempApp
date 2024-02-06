import { Topic, Group } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createGroup" | "createTopic" | "leaveGroup" | "deleteGroup" | "deleteTopic" | "editGroup" | "invite" | "members";

interface ModalData {
    group?: Group;
    topic? : Topic;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false})
}));
