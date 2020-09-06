import React, { useState } from 'react';
import axios from 'axios';

import Switch from '@material-ui/core/Switch';

export default function EnabledStatus(props) {
  const [enabled, setEnabled] = useState(props.category.active);

  const handleStatus = async () => {
    if (window.confirm('Are you sure?')) {
      const fd = new FormData();
      fd.append('active', !enabled);
      fd.append('category_id', props.category.id);

      try {
        const response = await axios.post(
          'https://xdate.ml/api/v1/post/category/ops/',
          fd,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (response.status === 200) {
          setEnabled(!enabled);
          !enabled
            ? alert(`${props.category.name} ENABLED...`)
            : alert(`${props.category.name} DISABLED...`);
          window.location.reload();
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleStatus}
      name={props.category.name}
      color="secondary"
    />
  );
}
