"use client";
import React, { useState } from "react";
import Card from "./Card";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { title } from "process";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";

const MeetingTypeCard = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isJoiningMeeting" | "isScheduleMeeting" | "isInstantmeeting" | undefined
  >(undefined);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [calldetails, setcalldetails] = useState<Call>();
  const { toast } = useToast();
  const createMeeting = async () => {
    console.log("first");
    if (!user || !client) return;
    try {
      if (!values.dateTime) {
        toast({
          title: "Please Select Date and Time",
        });
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");
      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      setcalldetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to create meeting",
      });
    }
  };
  return (
    <section className="grid grid-col-1 gap-5 md:grid-col-2 xl:grid-cols-4">
      <Card
        heading={"New Meeting"}
        subHeading={"Start an instant meeting"}
        icon={"/icons/add-meeting.svg"}
        onclick={() => setMeetingState("isInstantmeeting")}
        className="bg-orange-1"
      />
      <Card
        heading={"Schedule Meeting"}
        subHeading={"Plan Your meeting"}
        icon={"/icons/schedule.svg"}
        onclick={() => setMeetingState("isScheduleMeeting")}
        className="bg-blue-1"
      />
      <Card
        heading={"View Recordings"}
        subHeading={"Check Out Your Recordings"}
        icon={"/icons/recordings.svg"}
        onclick={() => setMeetingState("isJoiningMeeting")}
        className="bg-purple-1"
      />
      <Card
        heading={"Join Meeting"}
        subHeading={"via invitation link"}
        icon={"/icons/join-meeting.svg"}
        onclick={() => router.push("/recordings")}
        className="bg-yellow-1"
      />
      <MeetingModal
        isopen={meetingState == "isInstantmeeting"}
        onclose={() => setMeetingState(undefined)}
        title={"Start an intant meeting"}
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeCard;
