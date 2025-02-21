'use client';

import { motion } from 'motion/react';

import { useMapPanelContext } from '../contexts/map-panel-context';
import MapDetailPanel from './map-detail-panel';
import MapPanel from './map-panel';

export default function MapPanelSwitch() {
  const { isPanelOpen } = useMapPanelContext();

  return (
    <motion.div
      data-cid="element-s8073a"
      animate={{ width: isPanelOpen ? 540 : 314 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {isPanelOpen ? (
        <MapDetailPanel data-cid="MapDetailPanel-dMZEen" />
      ) : (
        <MapPanel data-cid="MapPanel-BdIICc" />
      )}
    </motion.div>
  );
}
