// APP-06 · Public Area Watch
import AppDetailLayout from '../../components/AppDetailLayout';
import { findApp } from '../../data/cctvAiApps';

export default function PublicAreaWatch() {
  return <AppDetailLayout app={findApp('public-area-watch')} />;
}
