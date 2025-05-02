import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Image source={images.bg} className="absolute w-full z-0 top-0 left-0"/>
      <ScrollView 
        className="flex-1 px-5" 
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
        <View className="flex-1 mt-5">
          <SearchBar 
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
        </View>
      </ScrollView>
    </View>
  );
}
