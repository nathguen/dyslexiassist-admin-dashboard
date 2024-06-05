"use client";

import { User } from "@prisma/client";
import { Switch, Table } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";

export function IsApprovedCell({ user }: { user: User }) {
  const [checked, setChecked] = useState(user.isApproved);

  const handleSwitchClick = async (id: string) => {
    // call api to update user approval status
    const isApproved = !checked;

    try {
      await axios.put("/api/user", { id, isApproved });
      setChecked(isApproved);
    } catch (error) {
      alert("Failed to update user approval status");
    }
  };

  return (
    <Table.Cell>
      <Switch
        defaultChecked={checked}
        onClick={() => handleSwitchClick(user.id)}
      />
    </Table.Cell>
  );
}
