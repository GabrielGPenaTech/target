import { View } from "react-native"

import { styles } from "./styles"
import { colors } from "@/theme"

import { Option } from "./option"

import { TransactionTypes } from "@/utils/TransactionTypes"

type Props = {
  selected: TransactionTypes
  onChange: (type: TransactionTypes) => void
}

export function TransactionType({ onChange, selected }: Props) {
  return (
    <View style={styles.container}>
      <Option
        icon="arrow-upward"
        title="Guardar"
        isSelected={selected === TransactionTypes.Input}
        onPress={() => onChange(TransactionTypes.Input)}
        selectedColor={colors.blue[400]}
      />

      <Option
        icon="arrow-downward"
        title="Resgatar"
        isSelected={selected === TransactionTypes.Output}
        onPress={() => onChange(TransactionTypes.Output)}
        selectedColor={colors.red[400]}
      />
    </View>
  )
}