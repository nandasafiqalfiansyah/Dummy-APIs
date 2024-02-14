import React from "react";
import CardDefault from "./card";
import usePayloadData from "../card/datacars";
function MainCard() {
  const payloadData = usePayloadData();

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
        {payloadData.map((item) => (
          <div key={item.id} className="w-full p-4">
            <CardDefault
              title={item.title}
              description={item.description}
              link={`/descard?id=${item.id}`}
              rate={item.rate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainCard;
