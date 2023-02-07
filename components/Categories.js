import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(()=> {
    sanityClient
    .fetch(
        `
        *[_type == "category"] 

      `
    )
    .then((data) => {
      setCategories(data);
  });
    

}, []);



  return (
  <ScrollView
    contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
    }} 
    horizontal
    showsHorizontalScrollIndicator={false}
    >
        {/*CategoryCard : then we pass in props to kind of help with modifying the cards*/}
     
     {categories.map((category) =>(
      <CategoryCard
       key={category._id}
       imgUrl={urlFor(category.image).width(200).url()}
       title={category.name}
     
     />
     ))}

    </ScrollView>
  );
};

export default Categories