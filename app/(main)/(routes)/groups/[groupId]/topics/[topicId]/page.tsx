import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
//import { ChatHeader } from "@/components/chat/chat-header";
//import { ChatInput } from "@/components/chat/chat-input";
//import { ChatMessages } from "@/components/chat/chat-messages";
//import { MediaRoom } from "@/components/media-room";//maybe..................................................................................
import { db } from "@/lib/db";

interface TopicPageProps {
  params: {
    groupId: string;
    topicId: string;
  }
}

const TopicPage = async ({
  params
}: TopicPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const topic = await db.topic.findUnique({
    where: {
      id: params.topicId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      groupId: params.groupId,
      profileId: profile.id,
    }
  });

  if (!topic || !member) {
    redirect("/");
  }

  return ( 
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      {topic.name} is this topic
    </div>
   );
}
 
export default TopicPage;