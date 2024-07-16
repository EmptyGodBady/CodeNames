import { ERootEndpoints, ETeamIdentifiers } from "@/constants/enums";
import { PropsWithChildren, useState } from "react";

type Props = PropsWithChildren<{
  ident: string;
}>;

export default function TeamColumn({ ident }: Props) {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  async function onEnterTeam() {
    const name = localStorage.getItem("name");
    setIsButtonVisible(false); //need to complete
    await fetch(ERootEndpoints.User, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, teamIdentifier: ident }),
    });
    try {
      const users = await fetch(ERootEndpoints.User, {
        method: "GET",
      });
      console.log(await users.json());
    } catch (error) {
      console.error(error);
    }
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
