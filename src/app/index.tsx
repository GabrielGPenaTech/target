import { useCallback, useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import { router, useFocusEffect } from "expo-router"

import { Target, type TargetProps } from "@/components/Target";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { HomeHeader, type HomeHeaderProps } from "@/components/HomeHeader";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";

export default function Index() {
  const [summary, setSummary] = useState<HomeHeaderProps>()
  const [isFetching, setIsFetching] = useState(true)
  const [targets, setTargets] = useState<TargetProps[]>([])

  const targetDatabase = useTargetDatabase()
  const transactionsDatabase = useTransactionsDatabase()

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listByClosestTarget()

      return response.map(item => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: numberToCurrency(item.amount)
      }))
    } catch (error) {
      Alert.alert("Erro", "Não possível carregar as metas.")
      console.log(error)
    }
  }

  async function fetchSummary(): Promise<HomeHeaderProps> {
    try {
      const response = await transactionsDatabase.summary()
      console.log(response)

      const total = response.input + response.output

      return {
        input: numberToCurrency(response.input),
        output: numberToCurrency(response.output),
        total: numberToCurrency(total)
      }

    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o resumo.")
      console.log(error)
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets()
    const summaryDatPromise = fetchSummary()

    const [
      targetData,
      summaryData
    ] = await Promise.all([targetDataPromise, summaryDatPromise])

    setTargets(targetData)
    setSummary(summaryData)

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
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />

      <List
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta registrada ainda."
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 62 }}>
        <Button title="Adicionar nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  )
}