// APP-10 · Vehicle Check
import AppDetailLayout from '../../components/AppDetailLayout';
import { findApp } from '../../data/cctvAiApps';

export default function VehicleCheck() {
  return <AppDetailLayout app={findApp('vehicle-check')} />;
}
