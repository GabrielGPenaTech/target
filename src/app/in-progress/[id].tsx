import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Alert, View } from "react-native";

import { Transaction, TransactionProps } from "@/components/Transaction";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { useCallback, useState } from "react";
import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";

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
  const [isFetching, setIsFetching] = useState(true)
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0
  })

  const param = useLocalSearchParams<{ id: string }>()

  const targetDatabase = useTargetDatabase()

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(param.id))

      setDetails({
        name: response.name,
        percentage: response.percentage,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
      })
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta")
      console.log(error)
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails()

    await Promise.all([fetchDetailsPromise])

    setIsFetching(false)
  }


  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          icon: "edit",
          onPress: () => router.navigate(`/target?id=${param.id}`)
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Transaction data={item} onRemove={() => { }} />}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
      />

      <Button title="Nova transação" onPress={() => router.navigate(`/transaction/${param.id}`)} />
    </View>
  )
}