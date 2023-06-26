import { Image, LoadingOverlay} from "@mantine/core"
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import styles from '../../styles/Tattoos.module.css'

export default function Tattoos() {
    const [tattoos, setTattoos] = useState([]);
    const [tattoosIsLoading, setTattoosIsLoading] = useState(true);
    
    useEffect(() => {
        const getTattoos = async () => {
            try {
            const response = await fetch('https://backend-api.tattoodo.com/api/v2/feeds/explore?&limit=24&page=2')
            const data = await response.json()
            setTattoos(data.data)
            } catch (error) {
                console.log(`getTattoos failed: ${error}`)
        }}
        if (tattoosIsLoading) getTattoos()
        setTattoosIsLoading(false)
    }, []);
   
    const fetchedTattoos = tattoos.map((tattoo: any) => {
        return (
            <Image key={tattoo.data.id} src={tattoo.data.image.url} alt={tattoo.data.description} className={styles.my_masonry_grid_items} />
        )})

        const breakpointColumnsObj = {
            default: 4,
            1100: 3,
            700: 2,
            500: 1
          };

        if (tattoosIsLoading) return <LoadingOverlay visible={tattoosIsLoading}/>
        
    return (<>
    <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.my_masonry_grid}
        columnClassName={styles.my_masonry_grid_column}
    >
    {fetchedTattoos}
</Masonry>
    </>)}