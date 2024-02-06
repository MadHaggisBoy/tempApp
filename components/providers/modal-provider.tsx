"use client";

import { CreateGroupModal } from "../modals/create-group-modal";
import { useEffect, useState } from "react";
import { CreateTopicModal } from "../modals/create-topic-modal";
import { DeleteTopicModal } from "../modals/delete-topic-modal";
import { DeleteGroupModal } from "../modals/delete-group-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return(
        <>
            <CreateGroupModal />
            <CreateTopicModal />
            <DeleteTopicModal />
            <DeleteGroupModal />
        </>
    )
}