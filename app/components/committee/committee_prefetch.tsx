"use client";

import { CommitteeMember, CommitteeYear } from "@/@types/schema.ds";
import { useEffect } from "react";

interface CommitteePrefetchProps {
    committeeMembers: CommitteeYear;
}

/**
 * Preloads committee member images in the background.
 * Mounted on the homepage.
 */
export default function CommitteePrefetch({ committeeMembers }: CommitteePrefetchProps) {
    useEffect(() => {
        // Small delay to not compete with homepage resources
        const timeout = setTimeout(() => {
            Object.values(committeeMembers).forEach((committees) => {
                Object.values(committees).forEach((members) => {
                    (members as CommitteeMember[]).forEach((member) => {
                        if (member.image) {
                            const img = new window.Image();
                            img.src = member.image;
                        }
                    });
                });
            });
        }, 2000);

        return () => clearTimeout(timeout);
    }, [committeeMembers]);

    return null;
}
