import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { ChatView } from 'src/sections/chat/view';

const metadata = { title: `Inbox | Dashboard - ${CONFIG.site.name}` };

// ----------------------------------------------------------------------

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const dialog = useBoolean();
  return (
    <DashboardContent maxWidth="xl">
      <ChatView />
    </DashboardContent>
  );
}
