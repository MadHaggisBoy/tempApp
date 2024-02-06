import { Group, Member, Profile } from "@prisma/client"

export type GroupWithMembersWithProfiles = Group & {
    members: (Member & { profile: Profile })[];
}