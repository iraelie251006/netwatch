import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies, 
    loading: moviesLoading, 
    error: moviesError,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({query: searchQuery}), false);

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500)

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0 top-0 left-0"/>
      <FlatList 
        data={movies}
        renderItem={({item}) => (<MovieCard {...item}/>)}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        className="px-5"
        contentContainerStyle={{paddingBottom: 100}}
        ListHeaderComponent={
          <>
            <View className='justify-center items-center mt-20 w-full flex-row'>
              <Image source={icons.logo} className='w-12 h-10'/>
            </View>
            <View className='my-5'>
              <SearchBar 
                placeholder='Search movies...'
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" className='my-3'/>
            )}
            {moviesError && (
              <Text className='text-red-500 text-center px-5 my-3'>{moviesError?.message}</Text>
            )}
            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search results for {' '}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className='mt-10 px-5'>
              <Text className='text-gray-500 text-center'>
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default Search