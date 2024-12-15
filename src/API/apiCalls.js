const API = 'http://localhost:3000/chatMe/v1/users/';

export async function SignUpUser(formData) {
  console.log(formData);
  try {
    const response = await fetch(`${API}createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: formData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    } else {
      const data = await response.json();
      return { success: true, message: data.message };
    }
  } catch (err) {
    throw new Error('Failed to create account ' + err.message);
  }
}

export async function LogInUsers(formData) {
  try {
    const response = await fetch(`${API}logInUser`, {
      method: 'POST',
      credentials: 'include', // inorder to recive or sent the code
      headers: {
        'Content-Type': 'application/json', // Ensures the server understands JSON
      },
      body: JSON.stringify({ data: formData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    const data = await response.json();

    return { success: true, message: data.message };
  } catch (err) {
    throw new Error('Failed to Log in ' + err.message);
  }
}

export async function uploadAvatar(uploadFiles, userData) {
  try {
    const Id = `${userData.firstName}-${userData.id}`;
    const formData = new FormData();
    formData.append('avatar', uploadFiles);

    const response = await fetch(`${API}uploadAvatar/${Id}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return console.log('Failed to upload Image ' + errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Failed to upload Image ' + err.message);
  }
}

export async function AuthUser(pin) {
  try {
    const response = await fetch(`${API}AuthUser`, {
      method: 'POST',
      credentials: 'include', // inorder to recive or sent the code
      headers: {
        'Content-Type': 'application/json', // Ensures the server understands JSON
      },
      body: JSON.stringify({ data: pin }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    const data = await response.json();

    return { success: true, message: data.message };
  } catch (err) {
    throw new Error('Failed to authenticate user ' + err.message);
  }
}

export async function AutoLogIn() {
  try {
    const response = await fetch(
      `${API}autoLogin
`,
      {
        method: 'GET',
        credentials: 'include', // inorder to recive or sent the code
        headers: {
          'Content-Type': 'application/json', // Ensures the server understands JSON
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    const data = await response.json();

    return { success: true, message: data.message };
  } catch (err) {
    throw new Error('Failed to authenticate user ' + err.message);
  }
}

export async function GetUserData() {
  try {
    const response = await fetch(
      `${API}getUserData
`,
      {
        method: 'GET',
        credentials: 'include', // inorder to recive or sent the code
        headers: {
          'Content-Type': 'application/json', // Ensures the server understands JSON
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    const data = await response.json();

    return { success: true, message: data.message };
  } catch (err) {
    throw new Error('Failed to get User Data ' + err.message);
  }
}

export async function GetUserLogOut() {
  try {
    const response = await fetch(
      `${API}userLogOut
`,
      {
        method: 'GET',
        credentials: 'include', // inorder to recive or sent the code
        headers: {
          'Content-Type': 'application/json', // Ensures the server understands JSON
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    const data = await response.json();

    return { success: true, message: data.message };
  } catch (err) {
    throw new Error('Failed to get User Data ' + err.message);
  }
}

// Reset password
export async function FindUserAccount({ email }) {
  try {
    const response = await fetch(
      `${API}findAccountresetPassword
`,
      {
        method: 'POST',
        credentials: 'include', // inorder to recive or sent the code
        headers: {
          'Content-Type': 'application/json', // Ensures the server understands JSON
        },
        body: JSON.stringify(email),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    const data = await response.json();

    return { success: true, message: data.message };
  } catch (err) {
    throw new Error('Failed to get User Data ' + err.message);
  }
}

export async function ResetUserPassword({ form }) {
  try {
    const response = await fetch(
      `${API}resetPassword
`,
      {
        method: 'POST',
        credentials: 'include', // inorder to recive or sent the code
        headers: {
          'Content-Type': 'application/json', // Ensures the server understands JSON
        },
        body: JSON.stringify(form),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    const data = await response.json();

    return { success: true, message: data.message };
  } catch (err) {
    throw new Error('Failed to get User Data ' + err.message);
  }
}

export async function UpdateUserPassword({ form }) {
  try {
    const response = await fetch(
      `${API}updatePassword
`,
      {
        method: 'POST',
        credentials: 'include', // inorder to recive or sent the code
        headers: {
          'Content-Type': 'application/json', // Ensures the server understands JSON
        },
        body: JSON.stringify(form),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    const data = await response.json();

    return { success: true, message: data.message };
  } catch (err) {
    throw new Error('Failed to get User Data ' + err.message);
  }
}
