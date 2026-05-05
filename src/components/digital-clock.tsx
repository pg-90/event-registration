import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from './themed-text';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const theme = useTheme();

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hours = pad(time.getHours());
  const minutes = pad(time.getMinutes());
  const seconds = pad(time.getSeconds());

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundElement }]}>
      <ThemedText style={styles.time}>
        {hours}
        <ThemedText style={[styles.time, styles.colon]}>:</ThemedText>
        {minutes}
        <ThemedText style={[styles.time, styles.colon]}>:</ThemedText>
        {seconds}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 40,
    borderRadius: 24,
    gap: 8,
  },
  time: {
    fontSize: 64,
    fontWeight: '700',
    letterSpacing: 4,
    fontVariant: ['tabular-nums'],
  },
  colon: {
    opacity: 0.4,
  },
});
