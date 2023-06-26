import { Image, LoadingOverlay, Text, createStyles} from "@mantine/core"
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

const useStyles = createStyles((theme) => ({
    myMasonryGrid: {
      display: 'flex',
      marginLeft: '-10x',
      width: 'auto',
    },
    myMasonryGridColumn: {
      paddingLeft: '10px',
      backgroundClip: 'padding-box',
    },
    myMasonryGridItems: {
      borderRadius: '20px',
      display: 'block',
      marginBottom: '5px',
    },
  }));

export default function Tattoos() {

    const { classes } = useStyles();
    const [tattoos, setTattoos] = useState([]);
    const [tattoosIsLoading, setTattoosIsLoading] = useState(true);
    
    useEffect(() => {
        const getTattoos = async () => {
            try {
            const response = await fetch('https://backend-api.tattoodo.com/api/v2/feeds/explore?&limit=50&page=1')
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
            <Image key={tattoo.data.id} src={tattoo.data.image.url} alt={tattoo.data.description} className={classes.myMasonryGridItems}/>)
        })

        const breakpointColumnsObj = {
            default: 4,
            1100: 3,
            700: 2,
            500: 1
          };

        if (tattoosIsLoading) return <LoadingOverlay visible={tattoosIsLoading}/>
        
    return (
    <>
    <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.myMasonryGrid}
        columnClassName={classes.myMasonryGridColumn}
    >
    {fetchedTattoos}
</Masonry>
    </>)}