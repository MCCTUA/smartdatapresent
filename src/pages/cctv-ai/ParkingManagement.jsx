// APP-13 · Parking Management
import AppDetailLayout from '../../components/AppDetailLayout';
import { findApp } from '../../data/cctvAiApps';

export default function ParkingManagement() {
  return <AppDetailLayout app={findApp('parking-management')} />;
}
