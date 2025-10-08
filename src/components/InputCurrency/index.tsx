import { View, Text } from "react-native"
import Input, { CurrencyInputProps } from "react-native-currency-input"

import { styles } from "./styles"
import { colors } from "@/theme"

type Props = CurrencyInputProps & {
  label: string
}


export function InputCurrency({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        placeholderTextColor={colors.gray[400]}
        style={styles.input}
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        {...rest}
      />
    </View>
  )
}