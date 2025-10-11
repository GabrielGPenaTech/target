import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Alert, View } from "react-native";

import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Loading } from "@/components/Loading";
import { useCallback, useState } from "react";
import { Button } from "@/components/Button";
import { List } from "@/components/List";


export default function InProgress() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0
  })

  const param = useLocalSearchParams<{ id: string }>()

  const targetDatabase = useTargetDatabase()
  const transactionsDatabase = useTransactionsDatabase()

  async function fetchTargetDetails() {
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

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.listByTargetId(Number(param.id))

      const transactions: TransactionProps[] = response.map(item => ({
        id: String(item.id),
        value: numberToCurrency(item.amount),
        date: String(item.created_at),
        description: item.observation,
        type: item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input
      }))

      setTransactions(transactions)

    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as transações")
      console.log(error)
    }
  }

  async function fetchData() {
    const fetchTargetDetailsPromise = fetchTargetDetails()
    const fetchTransactionsPromise = fetchTransactions()

    await Promise.all([fetchTargetDetailsPromise, fetchTransactionsPromise])

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