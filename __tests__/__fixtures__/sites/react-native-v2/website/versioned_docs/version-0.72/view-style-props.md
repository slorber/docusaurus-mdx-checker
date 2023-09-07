---
id: view-style-props
title: View Style Props
---

### Example

```SnackPlayer name=ViewStyleProps
import React from 'react';
import {View, StyleSheet} from 'react-native';

const ViewStyleProps = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top} />
      <View style={styles.middle} />
      <View style={styles.bottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: 'grey',
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: 'beige',
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: 'pink',
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default ViewStyleProps;
```

# Reference

## Props

### `backfaceVisibility`

| Type                          |
| ----------------------------- |
| enum(`'visible'`, `'hidden'`) |

---

### `backgroundColor`

| Type                                           |
| ---------------------------------------------- |
| [color](versioned_docs/version-0.72/colors.md) |

---

### `borderBottomColor`

| Type                                           |
| ---------------------------------------------- |
| [color](versioned_docs/version-0.72/colors.md) |

---

### `borderBottomEndRadius`

| Type   |
| ------ |
| number |

---

### `borderBottomLeftRadius`

| Type   |
| ------ |
| number |

---

### `borderBottomRightRadius`

| Type   |
| ------ |
| number |

---

### `borderBottomStartRadius`

| Type   |
| ------ |
| number |

---

### `borderBottomWidth`

| Type   |
| ------ |
| number |

---

### `borderColor`

| Type                                           |
| ---------------------------------------------- |
| [color](versioned_docs/version-0.72/colors.md) |

---

### `borderCurve` <div class="label ios">iOS</div>

On iOS 13+, it is possible to change the corner curve of borders.

| Type                               |
| ---------------------------------- |
| enum(`'circular'`, `'continuous'`) |

---

### `borderEndColor`

| Type                                           |
| ---------------------------------------------- |
| [color](versioned_docs/version-0.72/colors.md) |

---

### `borderLeftColor`

| Type                                           |
| ---------------------------------------------- |
| [color](versioned_docs/version-0.72/colors.md) |

---

### `borderLeftWidth`

| Type   |
| ------ |
| number |

---

### `borderRadius`

If the rounded border is not visible, try applying `overflow: 'hidden'` as well.

| Type   |
| ------ |
| number |

---

### `borderRightColor`

| Type                                           |
| ---------------------------------------------- |
| [color](versioned_docs/version-0.72/colors.md) |

---

### `borderRightWidth`

| Type   |
| ------ |
| number |

---

### `borderStartColor`

| Type                                           |
| ---------------------------------------------- |
| [color](versioned_docs/version-0.72/colors.md) |

---

### `borderStyle`

| Type                                    |
| --------------------------------------- |
| enum(`'solid'`, `'dotted'`, `'dashed'`) |

---

### `borderTopColor`

| Type                                           |
| ---------------------------------------------- |
| [color](versioned_docs/version-0.72/colors.md) |

---

### `borderTopEndRadius`

| Type   |
| ------ |
| number |

---

### `borderTopLeftRadius`

| Type   |
| ------ |
| number |

---

### `borderTopRightRadius`

| Type   |
| ------ |
| number |

---

### `borderTopStartRadius`

| Type   |
| ------ |
| number |

---

### `borderTopWidth`

| Type   |
| ------ |
| number |

---

### `borderWidth`

| Type   |
| ------ |
| number |

---

### `elevation` <div class="label android">Android</div>

Sets the elevation of a view, using Android's underlying [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation). This adds a drop shadow to the item and affects z-order for overlapping views. Only supported on Android 5.0+, has no effect on earlier versions.

| Type   |
| ------ |
| number |

---

### `opacity`

| Type   |
| ------ |
| number |

### `pointerEvents`

Controls whether the `View` can be the target of touch events.

- `'auto'`: The View can be the target of touch events.
- `'none'`: The View is never the target of touch events.
- `'box-none'`: The View is never the target of touch events but its subviews can be.
- `'box-only'`: The view can be the target of touch events but its subviews cannot be.

| Type                                          |
| --------------------------------------------- |
| enum('auto', 'box-none', 'box-only', 'none' ) |
