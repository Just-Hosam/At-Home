import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

export default function SmallChip(props) {
  const [cookies] = useCookies(['userID']);
  const dashboardId = cookies.dashboardId;

  const updateChip = (dashboardId, chip) => {
    axios
      .patch(`/dashboards/${dashboardId}/chores/${chip.id}`, chip)
      .then((res) => {
        props.clearChip(res.data);
      })
      .catch((err) => console.log('ERROR UPDATING CHIP', err));
  };

  const handleDelete = () => {
    const newChip = { ...props.chipValue, name: 'none' };
    updateChip(dashboardId, newChip);
  };

  return (
    <div className="chore-chip">
      <Chip
        // size="small"
        avatar={<Avatar alt={props.name}>{props.name[0]}</Avatar>}
        label={props.name}
        onDelete={handleDelete}
      />
    </div>
  );
}
