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
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

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
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${calldetails?.id}`;
  console.log(meetingState);
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
        onclick={() => router.push("/recordings")}
        className="bg-purple-1"
      />
      <Card
        heading={"Join Meeting"}
        subHeading={"via invitation link"}
        icon={"/icons/join-meeting.svg"}
        onclick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-1"
      />
      {!calldetails ? (
        <MeetingModal
          isopen={meetingState == "isScheduleMeeting"}
          onclose={() => setMeetingState(undefined)}
          title={"Start an intant meeting"}
          handleClick={createMeeting}
        >
          {" "}
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-2 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isopen={meetingState == "isScheduleMeeting"}
          onclose={() => setMeetingState(undefined)}
          title={"Meeting Created"}
          className="text-center"
          buttonText="Copy Meeting Link"
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
        />
      )}
      <MeetingModal
        isopen={meetingState == "isInstantmeeting"}
        onclose={() => setMeetingState(undefined)}
        title={"Start an intant meeting"}
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModal
        isopen={meetingState === "isJoiningMeeting"}
        onclose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeCard;
