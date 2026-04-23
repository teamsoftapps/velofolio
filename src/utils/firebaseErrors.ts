/**
 * Converts Firebase error codes into user-friendly messages.
 */
export const getFriendlyErrorMessage = (error: any): string => {
  const code = error?.code || error?.message || "";
  
  // Handle string errors (if they are already strings)
  if (typeof error === 'string') {
    if (error.includes('auth/user-not-found')) return "No account found with this email.";
    if (error.includes('auth/wrong-password')) return "Incorrect password. Please try again.";
    if (error.includes('auth/email-already-in-use')) return "This email is already registered.";
    if (error.includes('auth/invalid-email')) return "Please enter a valid email address.";
    if (error.includes('auth/weak-password')) return "Password should be at least 6 characters.";
    if (error.includes('auth/network-request-failed')) return "Network error. Please check your connection.";
    if (error.includes('auth/too-many-requests')) return "Too many failed attempts. Please try again later.";
    if (error.includes('auth/user-disabled')) return "This account has been disabled.";
    if (error.includes('auth/operation-not-allowed')) return "This sign-in method is not enabled.";
    if (error.includes('auth/invalid-credential')) return "Invalid credentials. Please check your email and password.";
    if (error.includes('auth/unauthorized-domain')) return "This domain is not authorized for sign-in. Please add it to your Firebase console.";
    return error;
  }

  // Handle Firebase Error objects
  switch (code) {
    case 'auth/user-not-found':
      return "No account found with this email.";
    case 'auth/wrong-password':
      return "Incorrect password. Please try again.";
    case 'auth/email-already-in-use':
      return "This email is already registered.";
    case 'auth/invalid-email':
      return "Please enter a valid email address.";
    case 'auth/weak-password':
      return "Password should be at least 6 characters.";
    case 'auth/network-request-failed':
      return "Network error. Please check your connection.";
    case 'auth/too-many-requests':
      return "Too many failed attempts. Please try again later.";
    case 'auth/user-disabled':
      return "This account has been disabled.";
    case 'auth/operation-not-allowed':
      return "This sign-in method is not enabled.";
    case 'auth/invalid-credential':
      return "Invalid credentials. Please check your email and password.";
    case 'auth/unauthorized-domain':
      return "This domain is not authorized for sign-in. Please add it to your Firebase console.";
    case 'auth/popup-closed-by-user':
      return "Sign-in popup closed before finishing. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
};
