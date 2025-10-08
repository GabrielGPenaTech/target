import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { List } from "@/components/List";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { TransactionTypes } from "@/utils/TransactionTypes";

const details = {
  current: "580,00",
  target: "R$ 1.790,00",
  percentage: 50
}

const transactions: TransactionProps[] = [
  {
    id: "1",
    value: "R$ 300,00",
    date: "12/04/25",
    description: "CDB de 110% no banco XPTO",
    type: TransactionTypes.Output
  },
  {
    id: "2",
    value: "R$ 20,00",
    date: "12/04/25",
    type: TransactionTypes.Input
  },
]
export default function InProgress() {
  const param = useLocalSearchParams<{ id: string }>()

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rightButton={{
          icon: "edit",
          onPress: () => { }
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Transaction data={item} onRemove={() => { }} />}
      />
    </View>
  )
}