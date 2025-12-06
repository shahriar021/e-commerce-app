import { Platform } from "react-native";
import { Toast } from "toastify-react-native";

export const handleSave = async ({selectedImage,slectedProductName,shortDescription,selectedColors,category,selectChestSize,selectChestSize2,selectChestSize3,
    selectWSize,selectHpSize,selectHGSize,selectWSize2,selectHpSize2,selectHGSize2,selectWSize3,selectHpSize3,selectHGSize3,totalQuantity,price,dusPrice,isAvailble,
    shippingPrice,postProduct,token
}:any) => {
        if (!selectedImage || !slectedProductName || !shortDescription) {
            Toast.warn("Fill up all the data.");
            return;
        }
        const formData = new FormData();
        const info = {
            productName: slectedProductName,
            shortDescription: shortDescription,
            colors: selectedColors.map((item: any) => item.code),
            category: category.toLowerCase(),
            measurement: [
                ...(selectChestSize && [
                    {
                        size: "s",
                        chest: selectChestSize?.bust_range_cm,
                        waist: selectWSize?.waist_range_cm,
                        hips: selectHpSize?.hips_range_cm,
                        heightRange: selectHGSize?.height_range_cm,
                    },
                ]),
                ...(selectChestSize2 && [
                    {
                        size: "m",
                        chest: selectChestSize2?.bust_range_cm,
                        waist: selectWSize2?.waist_range_cm,
                        hips: selectHpSize2.hips_range_cm,
                        heightRange: selectHGSize2?.height_range_cm,
                    },
                ]),
                ...(selectChestSize3 && [
                    {
                        size: "l",
                        chest: selectChestSize3?.bust_range_cm,
                        waist: selectWSize3?.waist_range_cm,
                        hips: selectHpSize3.hips_range_cm,
                        heightRange: selectHGSize3?.height_range_cm,
                    },
                ]),
            ],
            totalQuantity: Number(totalQuantity),
            price: Number(price),
            discountPrice: Number(dusPrice),
            saleTag: isAvailble,
            shippingNote: shippingPrice,
        };

        formData.append("data", JSON.stringify(info));

        if (Array.isArray(selectedImage) && selectedImage.length > 0) {

            selectedImage.forEach((img, index) => {

                let fileUri = img.uri;

                // FIX: Add the Android-specific URI prefixing check
                if (Platform.OS === 'android' && fileUri && !fileUri.startsWith('file://')) {
                    fileUri = `file://${fileUri}`;
                }

                const imageFile = {
                    // Use the potentially adjusted fileUri
                    uri: fileUri,
                    name: img.fileName || `product_image_${index}.jpg`,
                    type: img.mimeType || 'image/jpeg'
                };

                formData.append("productImages", imageFile as any);
            });

        }

        // console.log(info, "in info");
        try {
            const res = await postProduct({ token, formData }).unwrap();
            console.log(res, "response");
            if (res.success) {
                Toast.success(res.message)
            }
        } catch (err) {
            console.log(err,"add propduxts.");
            if (err) {
                Toast.error("Something went wrong!")
            }
        }
    };