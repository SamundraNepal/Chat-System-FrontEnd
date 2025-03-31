const API = 'http://localhost:3000/chatMe/v1/users/';
const AudioAPI = 'http://localhost:3000/tarang/v1/post/';
const SearchAPI = `http://localhost:3000/tarang/v1/search/`;

export async function SignUpUser(formData) {
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
    console.log('Failed to authenticate user ' + err.message);
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

export async function UpdateProfilePicture(form) {
  try {
    const formData = new FormData();
    formData.append('avatar', form);

    const response = await fetch(
      `${API}updateProfilePicture
`,
      {
        method: 'POST',
        credentials: 'include', // inorder to recive or sent the code
        body: formData,
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

export async function UpdateBackGroundPicture(form) {
  try {
    const formData = new FormData();
    formData.append('avatar', form);

    const response = await fetch(
      `${API}updateBackGroundImagePicture
`,
      {
        method: 'POST',
        credentials: 'include', // inorder to recive or sent the code
        body: formData,
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

export async function UpdateUserBio(formData) {
  try {
    const response = await fetch(`${API}updateUserBio`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response) {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }

    const data = await response.json();
    return { success: true, message: data.message };
  } catch (err) {
    throw new Error('Failed to update user bio ' + err.message);
  }
}

//Audio API

export async function UploadAudio(audioData) {
  try {
    const formData = new FormData();
    formData.append('audio', audioData);

    const response = await fetch(`${AudioAPI}/uploadAudio`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: `Failed to upload audio: ${err.message}`,
    };
  }
}

export async function GetAudioData() {
  try {
    const response = await fetch(`${AudioAPI}/getPosts`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to upload audio: ${err.message}`,
    };
  }
}

export async function GetFindFriendPost(userID) {
  try {
    const response = await fetch(`${AudioAPI}/getFindFriendPosts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ userID }),
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to upload audio: ${err.message}`,
    };
  }
}

//media uploads
export async function MediaUpload(audioData, mediaData) {
  try {
    const formData = new FormData();
    if (audioData) {
      formData.append('audio', audioData);
    }

    mediaData.forEach((element) => {
      if (element.type.startsWith('image/')) {
        formData.append('images', element);
      } else if (element.type.startsWith('video/')) {
        formData.append('videos', element);
      }
    });

    const response = await fetch(`${AudioAPI}uploadMedaiFiles`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (err) {
    return {
      success: false,
      message: `Failed to upload audio: ${err.message}`,
    };
  }
}

//searching
export async function FindFriends(searchData) {
  try {
    const response = await fetch(`${SearchAPI}findFriends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ searchData }),
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to find friends: ${err.message}`,
    };
  }
}

//send frn request
export async function AddFriend(frnId) {
  try {
    const response = await fetch(`${API}sendFrnReq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ frnId }),
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to Add friend: ${err.message}`,
    };
  }
}

//Cancel friend request
export async function CancelFriend(frnId) {
  try {
    const response = await fetch(`${API}cancelFrnReq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ frnId }),
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to Cancel friend reuqest: ${err.message}`,
    };
  }
}

export async function ReceivedFriend() {
  try {
    const response = await fetch(`${API}getFrnReq`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to get friend reuqest: ${err.message}`,
    };
  }
}

export async function GetUserNotifications() {
  try {
    const response = await fetch(
      `${API}getNotifications
`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to get user notifications: ${err.message}`,
    };
  }
}

export async function AcceptFriend(id) {
  try {
    const response = await fetch(`${API}acceptFrnReq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to accept the friend reuqest: ${err.message}`,
    };
  }
}

export async function ReadUserNotifications() {
  try {
    const response = await fetch(
      `${API}readNotifications
`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to read user notifications: ${err.message}`,
    };
  }
}

//interaction.

//like post

export async function LikePost(tragetUserId, postId) {
  try {
    const response = await fetch(`${AudioAPI}/likedPost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ tragetUserId, postId }),
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to Like the post: ${err.message}`,
    };
  }
}

// get the master feed
export async function GetMasterFeed() {
  try {
    const response = await fetch(
      `${AudioAPI}getFeed
`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to user master feed: ${err.message}`,
    };
  }
}

export async function GetReqPost(content_id) {
  try {
    const response = await fetch(`${AudioAPI}reqpost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ content_id }),
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed get req post the post: ${err.message}`,
    };
  }
}

//Comment

export async function PostComment(post_id, post_userID, audioBlob) {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('post_id', post_id);
    formData.append('post_userID', post_userID);

    const response = await fetch(`${AudioAPI}postcomment`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed get req post the post: ${err.message}`,
    };
  }
}

export async function DeleteCommentAPI(
  comment_id,
  post_id,
  senderID,
  receiverID,
) {
  try {
    const response = await fetch(`${AudioAPI}deleteComment`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post_id, comment_id, senderID, receiverID }),
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed get req post the post: ${err.message}`,
    };
  }
}

// comments interaction

export async function CommentsInteractions(
  comment_id,
  post_id,
  comment_user_id,
) {
  try {
    const response = await fetch(`${AudioAPI}likeComment`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post_id, comment_id, comment_user_id }),
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed get interact with the comment: ${err.message}`,
    };
  }
}

export async function CommentsInteractionsReply(
  comment_id,
  post_id,
  comment_user_id,
  audioBlob,
) {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('comment_id', comment_id);
    formData.append('comment_user_id', comment_user_id);
    formData.append('post_id', post_id);

    const response = await fetch(`${AudioAPI}replyComment`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed get interact with the comment: ${err.message}`,
    };
  }
}

export async function CommentsInteractionsReplyLikes(
  comment_id,
  post_id,
  comment_user_id,
  parent_id,
) {
  try {
    const response = await fetch(`${AudioAPI}commentReplyLikes`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id,
        comment_id,
        comment_user_id,
        parent_id,
      }),
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed get interact with the comment: ${err.message}`,
    };
  }
}

export async function CommentsInteractionsCommentReplyDelete(
  post_id,
  comment_id,
  receiverID,
  parentID,
  replyID,
) {
  try {
    const response = await fetch(`${AudioAPI}commentReplyDelete`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id,
        comment_id,
        receiverID,
        parentID,
        replyID,
      }),
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed get interact with the comment: ${err.message}`,
    };
  }
}

export async function CommentsInteractionsReplyReply(
  parentID,
  commentID,
  postID,
  receiverID,
  senderID,
  audioBlob,
) {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('comment_id', commentID);
    formData.append('sender', senderID);
    formData.append('receiver', receiverID);
    formData.append('post_id', postID);
    formData.append('parentID', parentID);

    const response = await fetch(`${AudioAPI}commetsreplyreply`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed get interact with the comment: ${err.message}`,
    };
  }
}

//handles the chat post by the user
export async function SendChats(receiverID, audioBlob) {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('receiverID', receiverID);

    const response = await fetch(`${API}createChats`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed send the chat: ${err.message}`,
    };
  }
}

export async function GetChats() {
  try {
    const response = await fetch(`${API}getChats`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to get the chats: ${err.message}`,
    };
  }
}

//handles the chat post by the user
export async function CreateMediaChats(receiverID, media) {
  try {

    const formData = new FormData();
    if (media.type.startsWith('image/')) {
      formData.append('images', media);
    } else {
      formData.append('videos', media);
    }
    formData.append('receiverID', receiverID);

    const response = await fetch(`${API}createChatsMedai`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed send the chat: ${err.message}`,
    };
  }
}

export async function ReadChats(senderID) {
  try {
    const response = await fetch(
      `${API}readChats
`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',

        body: JSON.stringify({ senderID }),
      },
    );

    if (!response.ok) {
      const errorReport = await response.json();
      return { success: false, message: errorReport.message };
    }
    const result = await response.json();
    return { success: true, data: result.message };
  } catch (err) {
    return {
      success: false,
      message: `Failed to read the chats: ${err.message}`,
    };
  }
}
