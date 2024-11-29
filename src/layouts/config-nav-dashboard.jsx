import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  inbox: icon('ic-inbox'),
};

export const useNavData = () => {
  const navData = [
    {
      items: [
        { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
        { title: 'Inbox', path: paths.dashboard.inbox, icon: ICONS.inbox },
      ],
    },
  ];

  return navData;
};
