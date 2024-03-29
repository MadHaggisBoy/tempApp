"use client";

import { cn } from "@/lib/utils";
import { Topic, MemberRole, Group } from "@prisma/client";
import { Lock, Trash } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";

interface TopicButtonProps {
    topic: Topic;
    group: Group;
    role?: MemberRole;
}

export const TopicButton = ({
    topic,
    group,
    role,
}: TopicButtonProps) => {
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();

    const onAction = (e:React.MouseEvent, action: ModalType) => {
        e.stopPropagation();
        onOpen(action, { topic, group });
    }

    return(
        <button
            onClick={() => {router.push(`/groups/${params?.groupId}/topics/${topic.id}`)}}
            className={cn(
                "group px-2 py-2 rounded-md items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition md-1 flex",
                params?.topicId == topic.id && "bg-zinc-700/20 dark:bg-zinc-700"
            )}
        >
            <p className={cn(
                "line-clamp-1 font-semibold text-sm text-zinc-400 dark:group-hover:text-zinc-300 transition",
                params?.topicId === topic.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>
                {topic.name}
            </p>
            {topic.name !== "general" && role !== MemberRole.MEMBER && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip
                        label="Delete"
                    >
                        <Trash onClick={(e) => onAction(e, "deleteTopic")}
                        className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"/>
                    </ActionTooltip>
                </div>
            )}
            {topic.name === "general" && (
                <Lock 
                    className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400"
                />
            )}
        </button>
    )
}