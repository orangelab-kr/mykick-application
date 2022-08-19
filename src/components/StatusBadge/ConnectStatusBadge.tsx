import React from 'react';
import {KickboardStatus} from '../../tools/kickboard';
import {StatusBadge} from './StatusBadge';

export interface ConnectStatusBadgeProps {
  status: KickboardStatus;
}

export const ConnectStatusBadge: React.FC<ConnectStatusBadgeProps> = ({
  status,
}) => {
  switch (status) {
    case 'scanning':
      return <StatusBadge label="검색 중" icon="circle" color="#3578F6" />;
    case 'connecting':
      return <StatusBadge label="연결 중" icon="circle" color="#3578F6" />;
    case 'connected':
      return <StatusBadge label="연결됨 " icon="circle" color="#58C948" />;
    case 'disconnected':
      return <StatusBadge label="연결 안됨" icon="circle" color="#ff1248" />;
  }
};
