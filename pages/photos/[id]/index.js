import Image from "next/image";
import Link from "next/link";
import photos from "../../photos";
// import { useRouter } from "next/router";
const index = ({ photo }) => {
  // const router = useRouter();
  // console.log(router);

  const { title, url } = photo;
  return (
    <div>
      {/* <h2>image {router.query.id}</h2> */}
       <h2>image {title}</h2>
       <Image src={url} width={500} height={500} />
      <Link href="/photos">go back</Link>
    </div>
  );
};
 

export async function getStaticProps(context) {
  const {id} = context.params
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
  const photo = await res.json();

  return {
    props: {photo}, // will be passed to the page component as props
  }
}

export const getStaticPaths = async()=>{
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`
  );
  const photos = await res.json();
  const ids = photos.map(photo=>photo.id)
  const paths = ids.map(id=>{
    return {
      params:{id: id.toString()}
    }
  })
  return {
    paths:paths,
    fallback: false
  }
} 

export default index