import { SettingItem } from "src/types/profile";

export const settingItems:SettingItem[] = [
    {
        icon:require('../../assets/e-icon/settingEdit.png'),
        label:"Edit Profile Details",
        route:"Edit Profile",
    },
    {
        icon:require('../../assets/e-icon/Key_light.png'),
        label:"Change Password",
        route:"Change Password",
    },
    
]