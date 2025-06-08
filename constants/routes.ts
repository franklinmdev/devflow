const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  COLLECTION: "/collection",
  COMMUNITY: "/community",
  TAGS: "/tags",
  JOBS: "/jobs",
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/questions/${id}`,
  TAG: (id: string) => `/tags/${id}`,
  ASK_QUESTION: "/ask-question",
  EDIT_QUESTION: (id: string) => `/questions/${id}/edit`,
  SIGN_IN_WITH_OAUTH: "/signin-with-oauth",
  EDIT_PROFILE: "/profile/edit",
};

export default ROUTES;
