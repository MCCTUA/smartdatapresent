// APP-14 · Restricted Zone (time-based)
import AppDetailLayout from '../../components/AppDetailLayout';
import { findApp } from '../../data/cctvAiApps';

export default function RestrictedZone() {
  return <AppDetailLayout app={findApp('restricted-zone')} />;
}
