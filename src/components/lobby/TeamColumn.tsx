import { ERootEndpoints, ETeamIdentifiers } from "@/constants/enums";
import { PropsWithChildren, useState } from "react";

type Props = PropsWithChildren<{
  ident: string;
}>;

export default function TeamColumn({ ident }: Props) {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  async function onEnterTeam() {
    setIsButtonVisible(false); //need to complete
    const updatedUser = await fetch(ERootEndpoints.AssignTeam, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, teamIdentifier: ident }),
    });
  }

  return (
    <div className="h-[600px] w-[100px] border flex flex-col justify-between">
      {isButtonVisible && (
        <button
          onClick={() => {
            onEnterTeam();
          }}
        >
          Enter Team
        </button>
      )}
      <div>sfs</div>
    </div>
  );
}
