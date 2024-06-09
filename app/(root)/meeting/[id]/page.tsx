"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
interface meetingtype {
  params: { id: string };
}

const page = ({ params }: meetingtype) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsstupcomplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(params?.id);
  if (!isLoaded || isCallLoading) return <Loader />;
  return (
    <main>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsstupcomplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default page;
