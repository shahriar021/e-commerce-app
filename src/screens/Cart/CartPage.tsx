import {
View,
    Text,
    Image,
    useWindowDimensions,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
    useDeleteCartItemMutation,
    useGetAddToCartQuery,
    useUpdateCartMutation,
} from "src/redux/features/cart/cartApi";
import { useAppSelector } from "src/redux/hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/types/screens";

type Props={
  navigation:StackNavigationProp<RootStackParamList,"Product Details">
}

type BrandDetailsProps = RouteProp<RootStackParamList, "Cart Page">

const CartPage = ({navigation}:Props) => {
    const route = useRoute<BrandDetailsProps>();
    // const { id } = route.params || {};
    const { width, height } = useWindowDimensions();
    const token = useAppSelector((state) => state.auth.token);
    const [loading,setLoading]=useState(false)
    const { data } = useGetAddToCartQuery(token);
    const [prQuantity, setPrQuantity] = useState<{ [key: string]: number }>({});
    const [deleteItem]=useDeleteCartItemMutation()
    console.log(data?.data,"get cart")
    const id=data?.data?._id
    

    useEffect(() => {
        if (data?.data?.products) {
            const obj: { [key: string]: number } = {};
            data.data.products.forEach((p: any) => {
                obj[p.productId] = p.quantity;
            });
            setPrQuantity(obj);
        }
    }, [data]);

    const [updateCart] = useUpdateCartMutation();

    navigation.setOptions({
        headerStyle: {
            backgroundColor: "#121212",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTitle: () => null,
        headerLeft: () => (
            <TouchableOpacity
                className="flex-row gap-2 items-center mx-2"
                onPress={() => navigation.goBack()}
            >
                <Feather name="arrow-left-circle" size={24} color="white" />
                <View className="">
                    <Text className="font-instrumentSansBold text-white text-2xl">
                        Cart
                    </Text>
                </View>
            </TouchableOpacity>
        ),
    });

    // After useEffect populates prQuantity
    const handleQuantity = (type: string, productId: string) => {
        setPrQuantity((prev) => {
            const current = prev[productId] ?? 1; // start from backend value
            console.log(current)
            if (type === "add") return { ...prev, [productId]: current + 1 };
            if (type === "subtract" && current > 0)
                return { ...prev, [productId]: current - 1 };
            return prev;
        });
    };

    
    const calculateSubtotal = () => {
        const products = data?.data?.products;

        if (!products || products.length === 0) {
            return 0;
        }

        const total = products.reduce((acc:any, x:any) => {
            const currentChange = prQuantity[x._id] || 0;

            const finalQuantity = x.quantity + currentChange;

            const linePrice = x.productPrice * finalQuantity;

            return acc + linePrice;
        }, 0);

        return total;
    };
    
    const updatedSubtotal = calculateSubtotal();
    const dis = data?.data?.discount;
    const total = data?.data?.total;

    const handleDelete = async(id:any) => { 
        setLoading(true)
        try{
            const res = await deleteItem({token,id});
            setLoading(false)
        }catch(err){
            setLoading(false)
        }
    };

    const handlePaymentOption = async () => {
        const body = {
            data: data.data.products.map((item: any) => ({
                productId: item.productId,
                color: item.color,
                size: item.size,
                // quantity: prQuantity[item._id] ?? item.quantity,
                quantity: prQuantity[item.productId] ?? item.quantity,

            })),
        };
        console.log(body,"---")

        try {
            const res = await updateCart({ token, body, id }).unwrap();
            if (res.success) {
                console.log(res?.data?.cart?.total,"res..")
                navigation.navigate("Payment screen",{ total:res?.data?.cart?.total });
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ScrollView
            className="flex-1 bg-[#121212] p-2 "
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            {data?.data?.products?.map((x: any) => {
                const finalQuantity = prQuantity[x.productId] ?? x.quantity;


                return (
                    <View
                        key={x._id}
                        className="mt-2 mb-2 relative flex-row p-2 bg-[#2C2C2C] shadow-slate-400 rounded-2xl mx-3"
                    >
                        <View
                            style={{ width: width * 0.22, height: height * 0.11 }}
                            className=" rounded-2xl overflow-hidden "
                        >
                            <Image
                                source={{ uri: x.productImage }}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </View>
                        <View className="p-2 flex-1">
                            <View>
                                <Text className="text-xl text-white font-instrumentSansSemiBold">
                                    {x.productInfo}
                                </Text>
                                <Text className=" text-md text-white mt-1 font-instrumentRegular">
                                    {(x.productPrice * finalQuantity)?.toFixed(2)} $
                                </Text>
                            </View>
                            <View className="flex-row flex-1 items-center justify-between">
                                <View className="flex-row items-center mx-2 gap-2">
                                    <TouchableOpacity
                                        onPress={() => handleQuantity("subtract", x.productId)}
                                    >
                                        <AntDesign name="minuscircleo" size={24} color="white" />
                                    </TouchableOpacity>
                                    <Text className="text-white">{finalQuantity}</Text>
                                    <TouchableOpacity
                                        onPress={() => handleQuantity("add", x.productId)}
                                    >
                                        <AntDesign name="pluscircleo" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity  onPress={()=>handleDelete(x._id)}>
                                    {loading?<ActivityIndicator size={"small"} color={"red"}/>:<AntDesign name="delete" size={24} color="red" />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                );
            })}

            <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2">
                <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">
                    Subtotal
                </Text>
                <Text className=" mx-2 text-sm text-white">$ {updatedSubtotal?.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2">
                <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">
                 Discount
                </Text>
                <Text className=" mx-2 text-sm text-white">
                    $ {dis?.toFixed(2)}
                </Text>
            </View>

            <View
                className="border border-dashed border-[#E2E2E2] mx-2"
                style={{ borderWidth: 1 }}
            />

            <View className="flex-row justify-between p-2 mx-2 mt-2 mb-2">
                <Text className=" text-sm text-[#ADAEBC] font-instrumentSansSemiBold">
                    Total
                </Text>
                <Text className=" mx-2 text-sm text-white">
                    $ {(parseFloat(total) ).toFixed(2)}
                </Text>
            </View>

            <View className="items-center mt-3">
                <TouchableOpacity
                    className=" items-center mt-3 rounded-lg overflow-hidden bg-[#1D3725] border border-[#DCF3FF]"
                    style={{ width: width * 0.9 }}
                    onPress={handlePaymentOption}
                >
                    <Text className="text-[#DCF3FF] p-3 font-instrumentSansBold">
                        Checkout
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CartPage;
