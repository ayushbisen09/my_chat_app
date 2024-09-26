import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  inbox: icon('ic-inbox'),
  contacts: icon('ic-contacts'),
  agentqueues: icon('ic-agentqueues'),
  templates: icon('ic-template'),
  broadcast: icon('ic-broadcast'),
  flows: icon('ic-flows'),
  settings: icon('ic-settings'),
  gethelp: icon('ic-gethelp'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    // subheader: 'Overview 6.0.0',
    items: [
      { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: 'Inbox', path: paths.dashboard.inbox, icon: ICONS.inbox },
      {
        title: 'Contacts',
        path: paths.dashboard.contact.root,
        icon: ICONS.contacts,
        children: [
          { title: 'Contact List', path: paths.dashboard.contact.root },
          { title: 'Add Contact', path: paths.dashboard.contact.addcontact },
        ],
      },
      { title: 'Agent Queues', path: paths.dashboard.agentQueue, icon: ICONS.agentqueues },
      {
        title: 'Templates',
        path: paths.dashboard.template.root,
        icon: ICONS.templates,
        children: [
          { title: 'Templates List', path: paths.dashboard.template.root },
          { title: 'Add Template', path: paths.dashboard.template.addtemplate },
        ],
      },
      {
        title: 'Broadcast',
        path: paths.dashboard.broadcast.root,
        icon: ICONS.broadcast,
        children: [
          { title: 'Broadcast List', path: paths.dashboard.broadcast.root },
          { title: 'Add Broadcast', path: paths.dashboard.broadcast.addbroadcast },
        ],
      },
      {
        title: 'Flows',
        path: paths.dashboard.flows.root,
        icon: ICONS.flows,
        children: [
          { title: 'Flow List', path: paths.dashboard.flows.root },
          { title: 'Create Flow', path: paths.dashboard.flows.createflow },
        ],
      },
      {
        title: 'Settings',
        path: paths.dashboard.settings.root,
        icon: ICONS.settings,
        children: [
          { title: 'Opt-In Management', path: paths.dashboard.settings.root },
          { title: 'Inbox Settings', path: paths.dashboard.settings.inboxsettings },
          { title: 'User Attributes', path: paths.dashboard.settings.userattributes },
          { title: 'Tags', path: paths.dashboard.settings.tags },
          { title: 'Quick Replies', path: paths.dashboard.settings.quickreplies },
          { title: 'Team Members', path: paths.dashboard.settings.teammembers },
          { title: 'Chat Assignment Rules', path: paths.dashboard.settings.chatassignmentrules },
          { title: 'Configure SLAs', path: paths.dashboard.settings.configureslas },
          // { title: 'WhatsApp Widget', path: paths.dashboard.group.whatsAppwidget },
          { title: 'API & Webhooks', path: paths.dashboard.settings.apiwebhooks },
          { title: 'Activity Log', path: paths.dashboard.settings.activitylogs },
          {
            title: 'Notification Preferences',
            path: paths.dashboard.settings.notificationpreferences,
          },
          { title: 'Time Zone', path: paths.dashboard.settings.timezone },
        ],
      },
      {
        title: 'Get Help',
        path: paths.dashboard.gethelp,
        icon: ICONS.gethelp,
      },
    ],
  },
];
