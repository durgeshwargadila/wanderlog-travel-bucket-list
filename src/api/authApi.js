const USERS_KEY = 'wanderlog_mock_auth_users';

// Helper to get registered users from localStorage database
function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : { 'eve.holt@reqres.in': 'cityslicka' };
  } catch (e) {
    return { 'eve.holt@reqres.in': 'cityslicka' };
  }
}

// Helper to save registered users to localStorage database
function saveRegisteredUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save user database:', e);
  }
}

/**
 * Log in a user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{token: string}>}
 */
export async function loginUser(email, password) {
  // Simulate 500ms network latency to test spinners and skeleton loaders
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users = getRegisteredUsers();
  const normalizedEmail = email.toLowerCase().trim();

  if (users[normalizedEmail]) {
    // Return a base64 encoded token representation
    return { token: `mock_token_${btoa(normalizedEmail)}` };
  }

  throw new Error('user not found');
}

/**
 * Register a new user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{id: number, token: string}>}
 */
export async function registerUser(email, password) {
  // Simulate 500ms network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users = getRegisteredUsers();
  const normalizedEmail = email.toLowerCase().trim();

  if (users[normalizedEmail] && normalizedEmail !== 'eve.holt@reqres.in') {
    throw new Error('Note: Email already registered.');
  }

  // Save new user info
  users[normalizedEmail] = password;
  saveRegisteredUsers(users);

  return {
    id: Math.floor(Math.random() * 10000) + 1,
    token: `mock_token_${btoa(normalizedEmail)}`
  };
}

