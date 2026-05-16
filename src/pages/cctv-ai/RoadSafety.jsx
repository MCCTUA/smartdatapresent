// APP-05 · Road Safety Evidence
import AppDetailLayout from '../../components/AppDetailLayout';
import { findApp } from '../../data/cctvAiApps';

export default function RoadSafety() {
  return <AppDetailLayout app={findApp('road-safety')} />;
}
