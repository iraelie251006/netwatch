import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const MovieCard = ({id, title, poster_path, vote_average, vote_count, release_date, overview}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className='w-[95px]'>
            <Image 
              source={{
                uri: poster_path ? `https://images.tmdb.org/t/p/w500${poster_path}`
                : `https://placehold.co/600x400/1a1a1a/ffffff.png`
              }}
              className='w-full h-52 rounded-lg'
              resizeMode='cover'
            />
            <Text className='text-sm text-white font-bold mt-2' numberOfLines={1}>{title}</Text>
            <View className='flex-row'>
              <Text className='text-xs text-light-300 line-clamp-2 my-2'>{overview}</Text>
            </View>
            <View className='flex-row justify-between'>
                <View className='flex-row items-center justify-start gap-x-1'>
                    <Image source={icons.star} className='size-4'/>
                    <Text className='text-white text-xs font-bold'>{Math.round(vote_average / 2)}</Text>
                </View>
                <View>
                    <Text className='text-white text-xs'>
                        <Text className='font-bold'>{vote_count}</Text> Likes</Text>
                </View>
            </View>
            <View className='flex-row items-center justify-between'>
                <Text className='text-xs text-light-300 font-medium mt-1'>
                    {release_date?.split('-')[0]}
                </Text>
                <Text className='text-white text-xs font-medium'>
                    Movie
                </Text>
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard