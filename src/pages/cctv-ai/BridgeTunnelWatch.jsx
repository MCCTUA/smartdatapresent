// APP-15 · Bridge & Tunnel Watch (gated)
import AppDetailLayout from '../../components/AppDetailLayout';
import PasswordGate from '../../components/PasswordGate';
import { findApp } from '../../data/cctvAiApps';

// SHA-256 of the access password — see src/utils/auth.js for the hash function.
// Client-side soft lock only; the hash is in the bundle and CAN be extracted.
const APP15_PASSWORD_HASH =
  'bac77a96987c5b41b6ed02b41499f539265db840ca3ac0130c2267ca0808e62e';

export default function BridgeTunnelWatch() {
  return (
    <PasswordGate
      pageId="app-15"
      title="ระบบเฝ้าระวังสะพานและอุโมงค์ · APP-15"
      passwordHash={APP15_PASSWORD_HASH}
    >
      <AppDetailLayout app={findApp('bridge-tunnel-watch')} />
    </PasswordGate>
  );
}
