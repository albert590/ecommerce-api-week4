const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3000";


export async function forgotPassword(email: string) {
  const response = await fetch(
    `${API_URL}/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to send reset link"
    );
  }


  return data;
}