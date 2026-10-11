export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export async function submitContact(data: ContactPayload): Promise<void> {
  void data;
  await new Promise((r) => setTimeout(r, 1000));
}
