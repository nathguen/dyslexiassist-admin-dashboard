import { Table } from "@radix-ui/themes";
import moment from "moment";
import { IsApprovedCell } from "./IsApprovedCell";
import { getUsers } from "./users";

export async function DashboardUserRows() {
  const data = await getUsers();

  return (
    <Table.Body>
      {data.users.map((user) => (
        <Table.Row key={user.id}>
          <Table.Cell>{user.firstName}</Table.Cell>
          <Table.Cell>{user.lastName}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.role}</Table.Cell>
          <IsApprovedCell user={user} />
          <Table.Cell>{moment(user.updatedAt).fromNow()}</Table.Cell>
          <Table.Cell>{moment(user.updatedAt).fromNow()}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
}
