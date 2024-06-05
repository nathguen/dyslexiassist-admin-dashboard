import { Table } from "@radix-ui/themes";
import { DashboardUserRows } from "./DashboardUserRows";

export default async function DashboardPage() {
  return (
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

      <DashboardUserRows />
    </Table.Root>
  );
}
