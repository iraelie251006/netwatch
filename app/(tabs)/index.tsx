import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

  const {
    data: movies, 
    loading: moviesLoading, 
    error: moviesError
  } = useFetch(() => fetchMovies({query: ""}));

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
        {moviesLoading ? (
          <ActivityIndicator 
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ): (
          <View className="flex-1 mt-5">
          <SearchBar 
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />

          <>
            <Text className="text-white mt-5 text-lg font-bold mb-3">Latest Movies</Text>

            <FlatList 
              data={movies}
              renderItem={({item}) => (
                <MovieCard {...item}/>
              )}
              keyExtractor={(item) => item.id}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'center',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </>
        </View>
        )}
      </ScrollView>
    </View>
  );
}
