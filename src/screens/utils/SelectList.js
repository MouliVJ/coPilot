// SelectList.js

import React from 'react';
import { Picker } from '@react-native-picker/picker';

const SelectList = ({ setSelected, data, save, disabled }) => {
  return (
    <Picker
      selectedValue={save === 'value' ? setSelected : setSelected[save]}
      onValueChange={(itemValue, itemIndex) =>
        setSelected(save === 'value' ? itemValue : { [save]: itemValue })
      }
      enabled={!disabled} // Enable/disable the Picker based on the disabled prop
    >
      {data.map((item) => (
        <Picker.Item key={item.key} label={item.value} value={item.value} />
      ))}
    </Picker>
  );
};

export default SelectList;