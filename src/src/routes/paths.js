// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/app',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    inbox: `${ROOTS.DASHBOARD}/inbox`,
    contact: {
      root: `${ROOTS.DASHBOARD}/contact`,
      addcontact: `${ROOTS.DASHBOARD}/contact/addcontact`,
    },
    agentQueue: `${ROOTS.DASHBOARD}/agentQueue`,
    template: {
      root: `${ROOTS.DASHBOARD}/template`,
      addtemplate: `${ROOTS.DASHBOARD}/template/addtemplate`,
    },
    broadcast: {
      root: `${ROOTS.DASHBOARD}/broadcast`,
      addbroadcast: `${ROOTS.DASHBOARD}/broadcast/addbroadcast`,
    },
    flows: {
      root: `${ROOTS.DASHBOARD}/flows`,
      createflow: `${ROOTS.DASHBOARD}/flows/createflow`,
    },
    settings: {
      root: `${ROOTS.DASHBOARD}/settings`,
      inboxsettings: `${ROOTS.DASHBOARD}/settings/inboxsetting`,
      userattributes: `${ROOTS.DASHBOARD}/settings/userattributes`,
      tags: `${ROOTS.DASHBOARD}/settings/tags`,
      quickreplies: `${ROOTS.DASHBOARD}/settings/quickreplies`,
      teammembers: `${ROOTS.DASHBOARD}/settings/teammembers`,
      chatassignmentrules: `${ROOTS.DASHBOARD}/settings/chatassignmentrules`,
      configureslas: `${ROOTS.DASHBOARD}/settings/configureslas`,
      // whatsAppwidget: `${ROOTS.DASHBOARD}/group/whatsAppwidget`,
      apiwebhooks: `${ROOTS.DASHBOARD}/settings/apiwebhooks`,
      activitylogs: `${ROOTS.DASHBOARD}/settings/activitylogs`,
      notificationpreferences: `${ROOTS.DASHBOARD}/settings/notificationpreferences`,
      timezone: `${ROOTS.DASHBOARD}/settings/timezone`,
    },
    gethelp: `${ROOTS.DASHBOARD}/gethelp`,
  },
};
