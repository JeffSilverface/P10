export type MockClient = {
  id: string;
  name: string;
};

export const MOCK_CLIENTS: MockClient[] = [
  { id: "11111111-1111-4111-8111-111111111111", name: "Alice Martin" },
  { id: "22222222-2222-4222-8222-222222222222", name: "Bruno Perrin" },
  { id: "33333333-3333-4333-8333-333333333333", name: "Chloé Nguyen" },
];

export const SUPPORT_ID = "99999999-9999-4999-8999-999999999999";

export function getClientName(clientId: string): string {
  return (
    MOCK_CLIENTS.find((client) => client.id === clientId)?.name ?? clientId
  );
}
