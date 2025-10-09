import { useCallback } from "react";
import { Alert, StatusBar, View } from "react-native";
import { router, useFocusEffect } from "expo-router"

import { List } from "@/components/List";
import { Target } from "@/components/Target";
import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { useTargetDatabase } from "@/database/useTargetDatabase";

const summary = {
  total: "R$ 2.680,00",
  input: "R$ 1.500,00",
  output: "R$ 150,00"
}

const targets = [
  {
    id: "1",
    name: "Comprar cadeira gamer",
    current: "R$ 500,00",
    percentage: "75%",
    target: "R$ 1.000,00"
  },
  {
    id: "2",
    name: "Apple Watch",
    current: "R$ 900,00",
    percentage: "50%",
    target: "R$ 1.200,00"
  },
  {
    id: "3",
    name: "Fazer compras da viagem",
    current: "R$ 500,00",
    percentage: "90%",
    target: "R$ 650,00"
  }
]

export default function Index() {
  const targetDatabase = useTargetDatabase()

  async function fetchTargets() {
    try {
      const response = await targetDatabase.listBySavedValue()

      console.log(response)

    } catch (error) {
      Alert.alert("Erro", "Não possível carregar as metas.")
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTargets()
    }, [])
  )

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