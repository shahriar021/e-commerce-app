export const greetingTime = (value: number) => {

        if (value >= 6 && value > 12) {
            return "Morning"
        } else if (value >= 12 && value < 18) {
            return "Afternoon"
        } else {
            return "Night"
        }

    }