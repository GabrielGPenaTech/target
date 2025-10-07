import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient"

import { style } from "./styles";
import { colors } from "@/theme";

import { Separator } from "../Separator";
import { Summary } from "../Summary";

export type HomeHeaderProps = {
  total: string
}

type Props = {
  data: HomeHeaderProps
}

export function HomeHeader({ data }: Props) {
  return (
    <LinearGradient colors={[colors.blue[500], colors.blue[800]]} style={style.container}>
      <View>
        <Text style={style.label}>Total que você possui</Text>
        <Text style={style.total}>{data.total}</Text>
      </View>

      <Separator color={colors.blue[400]} />

      <View style={style.summaryContainer}>
        <Summary
          data={{ label: "Entradas", value: "R$ 6.184,90" }}
          icon={{ name: "arrow-upward", color: colors.green[500] }}
        />

        <Summary
          data={{ label: "Saídas", value: "-R$ 883,65" }}
          icon={{ name: "arrow-downward", color: colors.red[400] }}
          isLabelPositionLeft
        />
      </View>
    </LinearGradient>
  )
}