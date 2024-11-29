const API = 'http://localhost:3000/chatMe/v1/users/';

export async function SignUpUser({ formData }) {
  try {
    const response = await fetch(`${API}/createUser`, {
      method: 'POST',
      body: JSON.stringify({ data: formData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return console.log('Invalid input ' + errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to create account ' + err.message);
  }
}

export async function LogInUsers() {
  try {
    const response = await fetch(`${API}/logInUser`);

    if (!response.ok) {
      const errorData = await response.json();
      return console.log('User does not exits ' + errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to Log in ' + err.message);
  }
}
