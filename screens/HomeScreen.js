
import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {
    UserIcon,
    ChevronDownIcon,
    SearchIcon,
    AdjustmentsIcon,
    AdjustmentsVerticalIcon,
    MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from "../sanity";






const HomeScreen = () => {
//this const navigation hook gives us access to the navigation object
    const navigation = useNavigation();

//a state to help us pull data from the backend
     const [featuredCategories, setFeaturedCategories] = useState([]);

//use layout effect means as soon as the screen/app mounts(or when the screen loads) do something we provide some dependencies meaning that initially when the  app mounts and when the array of dependencies are met
   //the line of code  below allows us to modify things within our app
useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,

        });

    },[]);

//this use Effect gets fired up when the functional component loads
    useEffect(() => {
      sanityClient.fetch(
        `
        *[_type == "featured"] {
          ...,
         restaurants[] ->{
            ...,
        dishes[] ->
    
      }
    } `
      )
      .then((data)=> {
        setFeaturedCategories(data);
      })
      .catch(console.error);

    },[]);

  

  return (
    <SafeAreaView className='bg-white pt-5 '>
      
      {/**Header */}
      <View className='flex-row pb-3 items-center mx-4 space-x-2'>
        <Image
         source={{
            uri: "https://links.papareact.com/wru",
         }}
         className='h-7 w-7 p-4 rounded-full bg-gray-300'
        />

        <View className='flex-1 '>
            <Text className='font-bold text-xs text-gray-400'>
              Deliver Now!
              </Text>
            <Text className='font-bold text-black text-xl'>
              Current Location
            <ChevronDownIcon size={20} color='#00CCBB' />
            </Text>
        </View>

        <UserIcon size={35} color='#00CCBB' />

      </View>

      {/*search */}
         <View className='flex-row items-center space-x-2 pb-2 mt-4'>
          <View className='flex-row space-x-2 flex-1  bg-gray-200 p-3'>
            <MagnifyingGlassIcon  color='gray' size={20}/>
            <TextInput placeholder='Resturants and Cuisines' 
            keyboardType='default' 
            />
          </View>

          <AdjustmentsVerticalIcon  color='#00CCBB' />
         </View>

         {/*body */}
         <ScrollView className='bg-gray-100'
             contentContainerStyle ={{
              paddingBottom:100,
             }}
             >

             {/*Categories */}
             <Categories />

           {/*Featured*/}
           {featuredCategories?.map((category) => (
            <FeaturedRow
               key={category._id}
               id={category._id}
               title={category.name}
               description={category.short_description}
            
            />
           ))}


         </ScrollView>  
    </SafeAreaView>
  )
}

export default HomeScreen