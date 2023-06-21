/**
 * Model user for waitlist
 */

export type WaitUser = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
};

export default WaitUser;