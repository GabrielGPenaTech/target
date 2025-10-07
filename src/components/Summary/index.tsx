import { Text, View, type ColorValue } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { styles } from "./styles"

export type SummaryProps = {
  label: string
  value: string
}

type Props = {
  data: SummaryProps
  icon: {
    name: keyof typeof MaterialIcons.glyphMap
    color: ColorValue
  },
  isLabelPositionLeft?: boolean
}

export function Summary({ data, icon, isLabelPositionLeft = false }: Props) {

  return (
    <View style={styles.container}>
      <View style={[styles.header, isLabelPositionLeft && { justifyContent: "flex-end" }]}>
        <MaterialIcons name={icon.name} size={20} color={icon.color} />
        <Text style={styles.label}>{data.label}</Text>
      </View>

      <Text style={styles.value}>{data.value}</Text>
    </View>
  )
}