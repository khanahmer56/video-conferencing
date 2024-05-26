import React from "react";
interface meetingtype {
  params: { id: string };
}

const page = ({ params }: meetingtype) => {
  return <div>page{params.id}</div>;
};

export default page;
