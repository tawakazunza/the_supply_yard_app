// app/index.tsx
import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import cn from 'clsx';
import * as Location from 'expo-location';
import React, { Fragment, useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomePage() {
  const [location, setLocation] = useState<string>("Getting location...");
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation("Location access denied");
        setIsLoadingLocation(false);
        return;
      }

      // Get current position
      let currentLocation = await Location.getCurrentPositionAsync({});
      
      // Reverse geocode to get address
      let address = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (address.length > 0) {
        const { city, region, country } = address[0];
        const locationString = `${city || region || 'Unknown'}, ${country || 'Unknown'}`;
        setLocation(locationString);
      } else {
        setLocation("Location unavailable");
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setLocation("Harare, Zimbabwe"); // Fallback to default
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleLocationPress = () => {
    setIsLoadingLocation(true);
    getCurrentLocation();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-4">
      <FlatList
          data={offers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item , index }) => {
            const isEven = index % 2 === 0;
              return (
                <View>
                  <Pressable className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
                  style={{ backgroundColor: item.color }}
                  android_ripple={{ color: "#ffffff22"}}>
                    {({ pressed })=> (
                      <Fragment>
                        <View className={"h-full w-1/2"}>
                        <Image source={item.image} className={"size-full"} resizeMode={"contain"} />
                        </View>
                        <View className={cn("offer-card__info", isEven ? 'pl-10': 'pr-10')} >
                          <Text className="h1-bold text-white leading-tight">
                            {item.title}
                          </Text>
                          <Image
                          source={images.arrowRight}
                          className="size-10"
                          resizeMode="contain"
                          tintColor="#ffffff"
                          />
                        </View>

                      </Fragment>
                    )}
                    
                  </Pressable>
                </View>
              )
          }}
          contentContainerClassName="pb-28 px-5"
          ListHeaderComponent={() =>
            <View className="flex-between flex-row w-full my-5">
              <View className="flex-start">
                <Text className="small-bold text-primary">DELIVER TO</Text>
                <TouchableOpacity
                  className="flex-center flex-row gap-x-1 mt-0.5"
                  onPress={handleLocationPress}
                  disabled={isLoadingLocation}
                >
                  <Text className="paragraph-bold text-dark-100">
                    {isLoadingLocation ? "Getting location..." : location}
                  </Text>
                  <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
                </TouchableOpacity>
                </View>
                <CartButton/>
              </View>
          }
      />
      
    </SafeAreaView>
  );
}