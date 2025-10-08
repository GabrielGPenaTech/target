import { View, TextInput, TextInputProps, Text } from "react-native"

import { styles } from "./styles"
import { colors } from "@/theme"

type Props = TextInputProps & {
  label: string
}


export function Input({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.gray[400]}
        style={styles.input}
        {...rest}
      />
    </View>
  )
}