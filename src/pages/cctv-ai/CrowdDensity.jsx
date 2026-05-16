// APP-12 · Crowd Density Counter
import AppDetailLayout from '../../components/AppDetailLayout';
import { findApp } from '../../data/cctvAiApps';

export default function CrowdDensity() {
  return <AppDetailLayout app={findApp('crowd-density')} />;
}
