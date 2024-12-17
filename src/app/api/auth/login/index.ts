import users from "@/data/mocks/users";
import { UserLogin } from "@/lib/zod/user.zod";

function generateAuthToken() {
  return Math.random().toString(36).substring(2);
}

export async function login(data: UserLogin) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(data);

  const user = users.find(
    (user: { email: string }) => user.email === data.email

    // && user.password === data.password
  );

  if (!user)
    return [
      500,
      { authToken: null, user: null, error: "Invalid credentials" },
    ] as const;

  const authToken = generateAuthToken();

  // Check for multiple account types
  if (user.accounts && user.accounts.length > 1) {
    return [300, { authToken, user: user, accounts: user.accounts }] as const; // status 300 to indicate account selection needed
  }

  return [
    200,
    { authToken, user: user, selectedAccount: user.accounts[0] },
  ] as const;
}

export async function loginWithAccountSelection(
  data: UserLogin,
  selectedAccountType: string
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = users.find(
    (user) => user.email === data.email

    // && user.password === data.password
  );

  if (!user)
    return [
      500,
      { authToken: null, user: null, error: "Invalid credentials" },
    ] as const;

  const selectedAccount = user.accounts.find(
    (account) => account === selectedAccountType
  );

  if (!selectedAccount)
    return [
      400,
      { authToken: null, user: null, error: "Account type not found" },
    ] as const;

  const authToken = generateAuthToken();
  return [200, { authToken, user, selectedAccount }] as const;
}
