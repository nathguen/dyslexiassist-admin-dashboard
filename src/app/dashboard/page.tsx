import { Table } from "@radix-ui/themes";
import clsx from "clsx";
import { DashboardUserRows } from "./DashboardUserRows";
import { getUsers } from "./users";

export default async function DashboardPage() {
  const data = await getUsers();

  return (
    <main className="flex flex-col justify-between min-h-dvh">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Approved</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Updated At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <DashboardUserRows users={data.users} />
      </Table.Root>

      <h2
        className={clsx("text-center pb-4", {
          "text-green-800": data.message.toLowerCase().includes("success"),
          "text-red-500": !data.message.toLowerCase().includes("success"),
        })}
      >
        {data.message}
      </h2>
    </main>
  );
}
