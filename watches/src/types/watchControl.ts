type TCity = {
    city: string,
    offset: number
}

type TWatchControl = {
    onAddWatch: (data: TCity) => void,
}

export type {TCity, TWatchControl};