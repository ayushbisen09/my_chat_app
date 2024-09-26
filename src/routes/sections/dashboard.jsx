import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/app/dashboard'));
const Inbox = lazy(() => import('src/pages/app/inbox'));
const Contact = lazy(() => import('src/pages/app/contacts'));
const Addcontact = lazy(() => import('../../sections/contacts/add-contact'));

const AgentQueue = lazy(() => import('src/pages/app/agent-queue'));
const Templates = lazy(() => import('src/pages/app/templates'));
const AddTemplate = lazy(() => import('../../sections/templates/add-template'));
const Broadcast = lazy(() => import('src/pages/app/broadcast'));
const AddBroadcast = lazy(() => import('../../sections/broadcast/add-broadcast'));
const Flows = lazy(() => import('src/pages/app/flows'));
const CreateFlow = lazy(() => import('../../sections/flow-builder/create-flow'));
const OptInManagement = lazy(() => import('src/pages/app/optin-management'));
const InboxSettings = lazy(() => import('src/pages/app/inbox-setting'));
const Userattributes = lazy(() => import('src/pages/app/user-attributes'));
const Tags = lazy(() => import('src/pages/app/tags'));
const Quickreplies = lazy(() => import('src/pages/app/quick-replies'));
const Teammembers = lazy(() => import('src/pages/app/team-members'));
const Chatassignmentrules = lazy(() => import('src/pages/app/chat-assignment-rules'));
const ConfigureSLAs = lazy(() => import('src/pages/app/configure-slas'));
// const WhatsAppwidgets = lazy(() => import('src/pages/app/whatsapp-widget'));
const APIWebhooks = lazy(() => import('src/pages/app/api-&-webhooks'));
const ActivityLogs = lazy(() => import('src/pages/app/activity-logs'));
const Notificationpreferences = lazy(() => import('src/pages/app/notification-preferences'));
const TimeZone = lazy(() => import('src/pages/app/time-zone'));
const GetHelp = lazy(() => import('src/pages/app/get-help'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'app',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'inbox', element: <Inbox /> },
      { path: 'contact', element: <Contact /> },
      { path: 'contact/addcontact', element: <Addcontact /> },
      { path: 'agentQueue', element: <AgentQueue /> },
      { path: 'template', element: <Templates /> },
      { path: 'template/addtemplate', element: <AddTemplate /> },
      { path: 'broadcast', element: <Broadcast /> },
      { path: 'broadcast/addbroadcast', element: <AddBroadcast /> },
      { path: 'flows', element: <Flows /> },
      { path: 'flows/createflow', element: <CreateFlow /> },
      {
        path: 'settings',
        children: [
          { element: <OptInManagement />, index: true },
          { path: 'inboxsetting', element: <InboxSettings /> },
          { path: 'userattributes', element: <Userattributes /> },
          { path: 'tags', element: <Tags /> },
          { path: 'quickreplies', element: <Quickreplies /> },
          { path: 'teammembers', element: <Teammembers /> },
          { path: 'chatassignmentrules', element: <Chatassignmentrules /> },
          { path: 'configureslas', element: <ConfigureSLAs /> },
          // { path: 'whatsAppwidget', element: <WhatsAppwidgets /> },
          { path: 'apiwebhooks', element: <APIWebhooks /> },
          { path: 'activitylogs', element: <ActivityLogs /> },
          { path: 'notificationpreferences', element: <Notificationpreferences /> },
          { path: 'timezone', element: <TimeZone /> },
        ],
      },
      { path: 'gethelp', element: <GetHelp /> },
    ],
  },
];
