import { Text, Image, LoadingOverlay} from "@mantine/core"
import { useEffect, useState } from "react";

export default function Tattoos() {
    const [tattoos, setTattoos] = useState([]);
    const [tattoosIsLoading, setTattoosIsLoading] = useState(true);
    
    useEffect(() => {
        const getTattoos = async () => {
            try {
            const response = await fetch('https://backend-api.tattoodo.com/api/v2/feeds/explore?&limit=24&page=1')
            const data = await response.json()
            setTattoos(data.data)
            } catch (error) {
                console.log(`getTattoos failed: ${error}`)
        }}
        if (tattoosIsLoading) getTattoos()
        setTattoosIsLoading(false)
    }, []);
   
    const fetchedTattoos = tattoos.map((tattoo) => {
        return (
            <Image key={tattoo.data.id} src={tattoo.data.image.url} alt={tattoo.data.description} width={300} height={300} />
        )})

        if (tattoosIsLoading) return <LoadingOverlay visible={tattoosIsLoading}/>
    return (<>
    {fetchedTattoos}
    </>)}