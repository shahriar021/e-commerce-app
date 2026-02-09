import Share from 'react-native-share';

export const handleShare = async (image: string, caption: string) => {
        const shareOptions = {
            title: 'Check out this post!',
            message: caption,
            url: image,
            social: Share.Social.FACEBOOK,
        };

        try {
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Error sharing', error);
        }
    };